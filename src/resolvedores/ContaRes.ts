import { Conta } from '@modulos/contas/infra/typeorm/schemas/Conta';
import { Resolver, Mutation, Arg, Query, Float, Int } from 'type-graphql';

import { container } from 'tsyringe';
import ContaServico from '@modulos/contas/servicos/ContaServico';

@Resolver()
export class ContaRes {
  @Mutation(() => Conta)
  async criarConta(
    @Arg('conta') conta: number,
    @Arg('valor', () => Float) valor: number,
  ) {
    const contaServico = container.resolve(ContaServico);
    const contaCriada = await contaServico.criar({ conta, saldo: valor });
    return contaCriada;
  }

  @Mutation(() => Conta)
  async sacar(
    @Arg('conta') conta: number,
    @Arg('valor', () => Float) valor: number,
  ) {
    const contaServico = container.resolve(ContaServico);
    const contaAtualizada = await contaServico.sacar({ conta, saldo: valor });
    return contaAtualizada;
  }

  @Mutation(() => Conta)
  async depositar(
    @Arg('conta') conta: number,
    @Arg('valor', () => Float) valor: number,
  ) {
    const contaServico = container.resolve(ContaServico);
    const contaAtualizada = await contaServico.depositar({
      conta,
      saldo: valor,
    });
    return contaAtualizada;
  }

  @Query(() => Float!)
  async saldo(@Arg('conta', () => Int) conta: number): Promise<number> {
    const contaServico = container.resolve(ContaServico);
    const { saldo } = await contaServico.pesquisaConta(conta);
    return saldo;
  }
}
