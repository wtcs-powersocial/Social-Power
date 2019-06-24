import { Localization } from './localization.model';
import { UserModel } from './user.model';
import { AvaliableModel } from './avaliable.model';
import { ComentarioModel } from './comentario.model';

export class DenunciaModel {
  categoria: string;
  descricao: string;
  latitude: number;
  longitude: number;
  imgDenuncia: any;
  dataDenuncia: Date;
  status: boolean;
  autor: string;
  avaliables: Array<AvaliableModel>;
  comentarios: Array<ComentarioModel>;

  constructor(newCat, newDesc, lat, log, img, autor) {
    this.categoria = newCat;
    this.descricao = newDesc;
    this.latitude = lat;
    this.longitude = log;
    this.imgDenuncia = img;
    this.status = false;
    this.autor = autor;
  }
}
