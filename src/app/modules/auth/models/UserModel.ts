// import {AuthModel} from './AuthModel'
// import {UserAddressModel} from './UserAddressModel'
// import {UserCommunicationModel} from './UserCommunicationModel'
// import {UserEmailSettingsModel} from './UserEmailSettingsModel'
// import {UserSocialNetworksModel} from './UserSocialNetworksModel'

// export interface UserModel {
//   id: number
//   username: string
//   password: string | undefined
//   email: string
//   firstname: string
//   lastname: string
//   fullname?: string
//   occupation?: string
//   companyName?: string
//   phone?: string
//   roles?: Array<number>
//   pic?: string
//   language?: 'en' | 'de' | 'es' | 'fr' | 'ja' | 'zh' | 'ru'
//   timeZone?: string
//   website?: 'https://keenthemes.com'
//   emailSettings?: UserEmailSettingsModel
//   auth?: AuthModel
//   communication?: UserCommunicationModel
//   address?: UserAddressModel
//   socialNetworks?: UserSocialNetworksModel
// }

export interface UserModel {
  user:  User;
  token: string;
}

export interface User {
  EmpleadosID?:     number;
  Apellidos?:       string;
  Nombres?:         string;
  TitleOfCourtesy?: null;
  FechaNacimiento?: null;
  HireDate?:        null;
  Direccion?:       null;
  Ciudad?:          null;
  Region?:          null;
  Provincia?:       null;
  PostalCode?:      null;
  Pais?:            null;
  HomePhone?:       null;
  Username?:        string;
}
