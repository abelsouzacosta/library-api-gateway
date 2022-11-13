import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ServiceNames } from 'src/constants/enums/service-names.enum';
import { RABBITMQ_URL } from 'src/config';
import { Queues } from 'src/constants/enums/queues.enum';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ServiceNames.CATEGORY_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [RABBITMQ_URL],
          queue: Queues.LIBRARY,
        },
      },
    ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
