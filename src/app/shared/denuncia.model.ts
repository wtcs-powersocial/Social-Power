import { Localization } from './localization.model';
import { UserModel } from './user.model';

export class DenunciaModel {
  categoria: string;
  descricao: string;
  imagem: Object;
  id: number;
  autor: UserModel;
  localizacao: Localization;
  status: boolean;
}
