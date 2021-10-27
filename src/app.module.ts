import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VoucherTypeModule } from './voucher-type/voucher-type.module';
import { VoucherModule } from './voucher/voucher.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest_voucher',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    VoucherTypeModule,
    VoucherModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
