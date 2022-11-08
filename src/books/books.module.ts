import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RABBITMQ_URL } from 'src/config';
import { Queues } from 'src/constants/enums/queues.enum';
import { BooksController } from './books.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BOOK_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [RABBITMQ_URL],
          queue: Queues.BOOKS,
        },
      },
    ]),
  ],
  controllers: [BooksController],
})
export class BooksModule {}
