import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { JwtModule } from '@nestjs/jwt';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';

@Module({
  imports: [ 
    JwtModule.register({ global: true }),
    RabbitmqModule,
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ],
          queue: 'device_queue',
          queueOptions: { durable: true }
        }
      }
    ])
  ],
  controllers: [DeviceController],
  providers: [DeviceService],
})
export class DeviceModule {}
