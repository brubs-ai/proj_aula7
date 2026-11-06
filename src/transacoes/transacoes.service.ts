import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CriarTransacaoDto } from './dto/criar-transacao.dto';
import { calcularMetricas, Metricas } from './metricas';
import { Transacao } from './schemas/transacao.schema';

export interface ItemHistorico {
  id: string;
  descricao: string;
  valor: number;
  tipo: 'receita' | 'despesa';
  categoria: string;
  consumoConsciente: boolean;
}

export interface ResumoTransacoes {
  historico: ItemHistorico[];
  metricas: Metricas;
}

@Injectable()
export class TransacoesService {
  constructor(
    @InjectModel(Transacao.name)
    private readonly transacaoModel: Model<Transacao>,
  ) {}

  async criar(dados: CriarTransacaoDto): Promise<ItemHistorico> {
    const transacao = await this.transacaoModel.create(dados);
    return {
      id: String(transacao._id),
      descricao: transacao.descricao,
      valor: transacao.valor,
      tipo: transacao.tipo,
      categoria: transacao.categoria,
      consumoConsciente: transacao.consumoConsciente,
    };
  }

  async listar(): Promise<ResumoTransacoes> {
    const transacoes = await this.transacaoModel.find().sort({ createdAt: -1 }).exec();
    const historico: ItemHistorico[] = transacoes.map((transacao) => ({
      id: String(transacao._id),
      descricao: transacao.descricao,
      valor: transacao.valor,
      tipo: transacao.tipo,
      categoria: transacao.categoria,
      consumoConsciente: transacao.consumoConsciente,
    }));

    return {
      historico,
      metricas: calcularMetricas(historico),
    };
  }
}
