import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import 'dotenv/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (await this.usersRepository.findOneBy({ email: createUserDto.email })) {
      throw new BadRequestException('Could not create account');
    }

    return await this.usersRepository.save(createUserDto);
  }

  findAll() {
    return this.usersRepository.find({
      // relations: { bookings: true, bookerOf: true },
      relations: { bookings: true },
    });
  }

  findOneById(id: number) {
    return this.usersRepository.findOneBy({ id: id });
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOneBy({ email: email });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.usersRepository.update(id, updateUserDto);
    } catch {
      throw new BadRequestException('Could not update account');
    }
  }

  remove(id: number) {
    return this.usersRepository.delete({ id: id });
  }
}
