import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { LeadsModule } from './leads/leads.module';
import { PaymentModule } from './payment/payment.module';
import { AiAssistantModule } from './ai-assistant/ai-assistant.module';

@Module({
  imports: [AuthModule, UserModule, LeadsModule, PaymentModule, AiAssistantModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
