import { IsBoolean, IsIn, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { TipoTransacao } from '../schemas/transacao.schema';

export class CriarTransacaoDto {
  @IsString()
  @IsNotEmpty()
  descricao!: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  valor!: number;

  @IsIn(['receita', 'despesa'])
  tipo!: TipoTransacao;

  @IsString()
  @IsNotEmpty()
  categoria!: string;

  @IsBoolean()
  consumoConsciente!: boolean;
}
