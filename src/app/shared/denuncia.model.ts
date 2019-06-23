import { Localization } from './localization.model';
import { UserModel } from './user.model';
import { AvaliableModel } from './avaliable.model';
import { ComentarioModel } from './comentario.model';

export class DenunciaModel {
  categoria: string;
  descricao: string;
  autor: UserModel;
  dataDenuncia: Date;
  status: boolean;
  local: Localization;
  imgDenuncia: Object;
  avaliables: Array<AvaliableModel>;
  comentarios: Array<ComentarioModel>;
}
