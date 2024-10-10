import { Injectable } from '@nestjs/common';
import { CreateClientDto } from '../../dto/create-client.dto';
import { UpdateClientDto } from '../../dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  create(createClientDto: CreateClientDto) {
    return this.clientRepository.save(createClientDto);
  }

  findAll() {
    return this.clientRepository.find({ relations: { projects: true } });
  }

  findOne(id: number) {
    return this.clientRepository.findOneBy({ id: id });
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return this.clientRepository.update(id, updateClientDto);
  }

  remove(id: number) {
    return this.clientRepository.delete({ id: id });
  }
}
