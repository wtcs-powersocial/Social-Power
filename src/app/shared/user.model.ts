export class UserModel {
  id: number;
  nameComplete: string;
  email: string;
  cpf: string;
  dataNasc: string;
  password: string;
  icon: any;

  constructor(
    nameCompleto: string,
    emailUser: string,
    pswUser: string,
    cpf: string,
    dataNasc: any,
    icon: any
  ) {
    this.nameComplete = nameCompleto;
    this.email = emailUser;
    this.password = pswUser;
    this.cpf = cpf;
    this.dataNasc = dataNasc;
    this.icon = icon;
  }
}
