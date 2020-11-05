import { getMongoRepository, MongoRepository } from 'typeorm';

import IContaRepositorio from '@modulos/contas/repositorios/IContaRepositorio';
import ICreateContaDTO from '@modulos/contas/dtos/ICriarContaDTO';
import ISearchContaDTO from '@modulos/contas/dtos/IPesquisaContaDTO';
import { Conta } from '../schemas/Conta';

class ContaRepositorio implements IContaRepositorio {
  private ormRepositorio: MongoRepository<Conta>;

  constructor() {
    this.ormRepositorio = getMongoRepository(Conta, 'mongo');
  }

  public async criar({ conta, saldo }: ICreateContaDTO): Promise<Conta> {
    const obj = this.ormRepositorio.create({
      conta,
      saldo,
    });
    await this.ormRepositorio.save(obj);
    return obj;
  }

  public async alterar(conta: Conta): Promise<Conta> {
    return this.ormRepositorio.save(conta);
  }

  public async encontrarConta({
    conta,
  }: ISearchContaDTO): Promise<Conta | undefined> {
    return this.ormRepositorio.findOne({ conta });
  }
}

export default ContaRepositorio;
