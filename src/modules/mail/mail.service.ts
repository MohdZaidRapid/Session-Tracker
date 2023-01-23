import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {}

  async sendWelcomeEmail(to: string, name: string) {
    const message = {
      from: 'sender@example.com',
      to,
      subject: 'Welcome',
      template: 'welcome',
      context: { name },
    };

    await this.mailService.sendMail(message);
  }
}
