import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EventPatterns } from 'src/constants/enums/event-patterns.enum';
import { MessagePatterns } from 'src/constants/enums/message-patterns.enum';
import { ServiceNames } from 'src/constants/enums/service-names.enum';
import { CreateCategoryDto } from './domain/dto/create-category.dto';
import { UpdateCategoryDto } from './domain/dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject(ServiceNames.CATEGORY_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  create(data: CreateCategoryDto) {
    return this.client.emit(EventPatterns.CREATE_CATEGORY, data);
  }

  findAll() {
    return this.client.send(MessagePatterns.LIST_CATEGORIES, {});
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
