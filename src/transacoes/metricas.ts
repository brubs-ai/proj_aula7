export interface TransacaoCalculavel {
  valor: number;
  tipo: 'receita' | 'despesa';
  consumoConsciente: boolean;
}

export interface Metricas {
  saldoTotal: number;
  totalDespesas: number;
  totalGastoImpulso: number;
}

const arredondarCentavos = (valor: number): number =>
  Math.round((valor + Number.EPSILON) * 100) / 100;

export function calcularMetricas(transacoes: readonly TransacaoCalculavel[]): Metricas {
  let receitas = 0;
  let despesas = 0;
  let gastosPorImpulso = 0;

  for (const transacao of transacoes) {
    if (transacao.tipo === 'receita') {
      receitas += transacao.valor;
    } else {
      despesas += transacao.valor;
      if (transacao.consumoConsciente === false) {
        gastosPorImpulso += transacao.valor;
      }
    }
  }

  return {
    saldoTotal: arredondarCentavos(receitas - despesas),
    totalDespesas: arredondarCentavos(despesas),
    totalGastoImpulso: arredondarCentavos(gastosPorImpulso),
  };
}
