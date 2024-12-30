export class CreateEmailSenderDto {
  from: string;
  to: string;
  subject: string;
  template: string;
  date?:string
}
export class CreateAdminEmailSenderDto {
  from: string;
  to: string;
  subject: string;
  title: string;
  description:string;
  buttonLink : string;
}
export class SendVerificationEmail {
  from: string;
  to: string;
  subject: string;
  code : number
}
