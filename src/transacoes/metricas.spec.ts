import { calcularMetricas } from './metricas';

describe('calcularMetricas', () => {
  it('retorna zero quando ainda não existem transações', () => {
    expect(calcularMetricas([])).toEqual({
      saldoTotal: 0,
      totalDespesas: 0,
      totalGastoImpulso: 0,
    });
  });

  it('calcula receitas, despesas e gastos por impulso', () => {
    expect(calcularMetricas([
      { valor: 3000, tipo: 'receita', consumoConsciente: true },
      { valor: 800, tipo: 'despesa', consumoConsciente: true },
      { valor: 150, tipo: 'despesa', consumoConsciente: false },
    ])).toEqual({
      saldoTotal: 2050,
      totalDespesas: 950,
      totalGastoImpulso: 150,
    });
  });

  it('não classifica receitas como gasto por impulso', () => {
    expect(calcularMetricas([
      { valor: 100, tipo: 'receita', consumoConsciente: false },
    ])).toEqual({
      saldoTotal: 100,
      totalDespesas: 0,
      totalGastoImpulso: 0,
    });
  });
});
