import { inject, injectable } from 'tsyringe';

import IContaRepositorio from '../repositorios/IContaRepositorio';
import { Conta } from '../infra/typeorm/schemas/Conta';

interface IRequest {
  conta: number;
  saldo: number;
}

@injectable()
class ContaServico {
  private contaRepositorio: IContaRepositorio;

  constructor(
    @inject('ContaRepositorio')
    contaRepositorio: IContaRepositorio,
  ) {
    this.contaRepositorio = contaRepositorio;
  }

  public async criar({ conta, saldo }: IRequest): Promise<Conta> {
    const contaConsultada = await this.contaRepositorio.encontrarConta({
      conta,
    });

    if (contaConsultada) {
      throw new Error('Essa conta já existe!');
    }

    const contaCriada = await this.contaRepositorio.criar({
      conta,
      saldo,
    });

    return contaCriada;
  }

  public async sacar({ conta, saldo }: IRequest): Promise<Conta> {
    const contaConsultada = await this.contaRepositorio.encontrarConta({
      conta,
    });

    if (!contaConsultada) {
      throw new Error('Essa conta não existe!');
    }

    if (saldo > contaConsultada.saldo) {
      throw new Error('Saldo insuficiente!');
    }

    const valorContaAlterado = {
      ...contaConsultada,
      saldo: contaConsultada.saldo - saldo,
    } as Conta;

    const contaSalva = await this.contaRepositorio.alterar(valorContaAlterado);

    return contaSalva;
  }

  public async depositar({ conta, saldo }: IRequest): Promise<Conta> {
    const contaConsultada = await this.contaRepositorio.encontrarConta({
      conta,
    });

    if (!contaConsultada) {
      throw new Error('Essa conta não existe!');
    }

    const valorContaAlterado = {
      ...contaConsultada,
      saldo: contaConsultada.saldo + saldo,
    } as Conta;

    const contaSalva = await this.contaRepositorio.alterar(valorContaAlterado);

    return contaSalva;
  }

  public async pesquisaConta(conta: number): Promise<Conta> {
    const contaConsultada = await this.contaRepositorio.encontrarConta({
      conta,
    });
    if (!contaConsultada) {
      throw new Error('Essa conta não existe!');
    }
    return contaConsultada;
  }
}

export default ContaServico;
