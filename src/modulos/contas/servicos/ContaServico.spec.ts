import 'reflect-metadata';
import ContaServico from '@modulos/contas/servicos/ContaServico';
import FalsaContaRepositorio from '@modulos/contas/repositorios/falso/FalsaContaRepositorio';

let falsaContaRepositorio: FalsaContaRepositorio;

let contaServico: ContaServico;

describe('ContaServico', () => {
  beforeEach(() => {
    falsaContaRepositorio = new FalsaContaRepositorio();
    contaServico = new ContaServico(falsaContaRepositorio);
  });

  it('Deve ser capaz de criar uma conta', async () => {
    const conta = await contaServico.criar({
      conta: 54321,
      saldo: 600.0,
    });

    expect(conta).toHaveProperty('id');
    expect(conta.conta).toBe(54321);
  });

  it('Deve ser capaz de não deixar criar uma conta que já existe', async () => {
    await contaServico.criar({
      conta: 54321,
      saldo: 600.0,
    });

    await expect(
      contaServico.criar({
        conta: 54321,
        saldo: 800.0,
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('Deve ser capaz de sacar dinheiro', async () => {
    await contaServico.criar({
      conta: 54321,
      saldo: 600.0,
    });

    const conta = await contaServico.sacar({
      conta: 54321,
      saldo: 600.0,
    });

    expect(conta.saldo).toBe(0.0);
  });

  it('Deve ser capaz de não deixar sacar dinheiro caso a conta não exista', async () => {
    await contaServico.criar({
      conta: 54321,
      saldo: 600.0,
    });

    await expect(
      contaServico.sacar({
        conta: 12345,
        saldo: 600.0,
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('Deve ser capaz de não deixar sacar dinheiro, caso o valor informado seja maior que o saldo que tem na conta', async () => {
    await contaServico.criar({
      conta: 54321,
      saldo: 600.0,
    });

    await expect(
      contaServico.sacar({
        conta: 54321,
        saldo: 700.0,
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('Deve ser capaz de deixar depositar dinheiro', async () => {
    await contaServico.criar({
      conta: 54321,
      saldo: 600.0,
    });

    const conta = await contaServico.depositar({
      conta: 54321,
      saldo: 600.0,
    });

    expect(conta.saldo).toBe(1200.0);
  });

  it('Deve ser capaz de não deixar depositar dinheiro, caso o número da conta seja inválido', async () => {
    await contaServico.criar({
      conta: 54321,
      saldo: 600.0,
    });

    await expect(
      contaServico.depositar({
        conta: 54329,
        saldo: 600.0,
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('Deve ser capaz de deixar pesquisar uma conta', async () => {
    await contaServico.criar({
      conta: 54321,
      saldo: 600.0,
    });

    const conta = await contaServico.pesquisaConta(54321);

    expect(conta).toHaveProperty('id');
    expect(conta.conta).toBe(54321);
  });

  it('Deve ser capaz de avisar caso a pesquisa esteja sendo feita em uma conta que não exista', async () => {
    await contaServico.criar({
      conta: 54321,
      saldo: 600.0,
    });

    await contaServico.pesquisaConta(54321);

    await expect(contaServico.pesquisaConta(54329)).rejects.toBeInstanceOf(
      Error,
    );
  });
});
