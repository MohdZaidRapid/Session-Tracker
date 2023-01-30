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

  async confirmMail(email, token) {
    const message = {
      from: 'sender@example.com',
      to: email,
      subject: 'ConfirmMail',
      template: 'confirmMail',
      context: { token },
    };
    await this.mailService.sendMail(message);
  }
}
