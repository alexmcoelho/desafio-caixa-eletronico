import { uuid } from 'uuidv4';

import IContaRepositorio from '@modulos/contas/repositorios/IContaRepositorio';
import { Conta } from '@modulos/contas/infra/typeorm/schemas/Conta';
import ICriarContaDTO from '@modulos/contas/dtos/ICriarContaDTO';
import IPesquisaContaDTO from '@modulos/contas/dtos/IPesquisaContaDTO';

class FalsaContaRepositorio implements IContaRepositorio {
  private contas: Conta[] = [];

  public async criar({ conta, saldo }: ICriarContaDTO): Promise<Conta> {
    const contaCriada = new Conta();
    Object.assign(contaCriada, { id: uuid(), conta, saldo });
    this.contas.push(contaCriada);
    return contaCriada;
  }

  public async alterar(data: Conta): Promise<Conta> {
    const indice = this.contas.findIndex(c => c.conta === data.conta);
    if (indice >= 0) {
      this.contas[indice].saldo = data.saldo;
      return this.contas[indice];
    }
    return this.contas[0];
  }

  public async encontrarConta({
    conta,
  }: IPesquisaContaDTO): Promise<Conta | undefined> {
    const contaEncontrada = this.contas.find(c => c.conta === conta);
    if (contaEncontrada) {
      return contaEncontrada;
    }
    return undefined;
  }
}

export default FalsaContaRepositorio;
