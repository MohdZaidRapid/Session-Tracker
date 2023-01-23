import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {}

  async sendWelcomeEmail(to: string, token: string) {
    const message = {
      from: 'sender@example.com',
      to,
      subject: 'ResetPassword',
      template: 'welcome',
      context: { token },
    };

    await this.mailService.sendMail(message);
  }
}
