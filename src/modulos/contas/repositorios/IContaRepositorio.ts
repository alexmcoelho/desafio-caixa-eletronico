import ICriarContaDTO from '../dtos/ICriarContaDTO';
import IPesquisaContaDTO from '../dtos/IPesquisaContaDTO';
import { Conta } from '../infra/typeorm/schemas/Conta';

export default interface IContaRepositorio {
  criar(data: ICriarContaDTO): Promise<Conta>;
  alterar(data: Conta): Promise<Conta>;
  encontrarConta({ conta }: IPesquisaContaDTO): Promise<Conta | undefined>;
}
