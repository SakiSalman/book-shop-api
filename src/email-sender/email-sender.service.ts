import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminEmailSenderDto, SendVerificationEmail } from './dto/create-email-sender.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { title } from 'process';

@Injectable()
export class EmailSenderService {
  constructor(private readonly mailService: MailerService) {}

  async sendAdminMail(dto: CreateAdminEmailSenderDto) {

    console.log(dto)
    const from = dto.from;
    const to = dto.to;
    const subject = dto.subject;
    
    if (process.env.ENVIRONMENT != 'local') {
      const result = await this.mailService
      .sendMail({
        from,
        to,
        subject,
        // text: template,
        template:'./templates/admin_registration',
        context : {
          title : dto.title,
          description : dto.description,
          buttonLink : dto.buttonLink
        }
      })
      .catch((err) => {
        console.log(err)
        throw new BadRequestException('Mail Sending fails!');
      });
            
    return {
      message: `Mail Sent to  : ${to}`,
    };
    }else{
      console.log('Edit email service to send from local environment')
      return {
        message: `edit email service to send from local environment`,
      };
    }

  }
}
