import { Localization } from './localization.model';
export class DenunciaModel {
  categoria: string;
  descricao: string;
  imagem: Object;
  id: number;
  autor: string;
  localizacao: Localization;
  status: boolean;
}
