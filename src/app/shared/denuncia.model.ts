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
  imgDenuncia: any;
  avaliables: Array<AvaliableModel>;
  comentarios: Array<ComentarioModel>;

  constructor(newCat, newDesc, lat, log){
    this.categoria = newCat;
    this.descricao = newDesc;
    this.autor = new UserModel('Rauena Coelho', 'Rau@email.com', 'Rau', '123456', '010101100101', '17/09/2000');
    this.local = new Localization(lat, log);
  }
}
