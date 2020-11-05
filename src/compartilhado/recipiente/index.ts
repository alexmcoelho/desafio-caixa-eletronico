import { container } from 'tsyringe';

import IContaRepositorio from '@modulos/contas/repositorios/IContaRepositorio';
import ContaRepositorio from '@modulos/contas/infra/typeorm/repositorios/ContaRepositorio';

container.registerSingleton<IContaRepositorio>(
  'ContaRepositorio',
  ContaRepositorio,
);
