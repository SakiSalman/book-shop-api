import { Controller} from '@nestjs/common';
import { EmailSenderService } from './email-sender.service';
@Controller('email-sender')
export class EmailSenderController {
  constructor(private readonly emailSenderService: EmailSenderService) {}
}
