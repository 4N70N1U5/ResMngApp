import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const passwordHash = bcrypt.hashSync(createUserDto.password, 10);

    try {
      return await this.usersRepository.save({
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        passwordHash,
      });
    } catch {
      throw new BadRequestException('Could not create account');
    }
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOneById(id: number) {
    return this.usersRepository.findOneBy({ id: id });
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOneBy({ email: email });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let passwordHash: string;

    if (updateUserDto.password) {
      passwordHash = bcrypt.hashSync(updateUserDto.password, 10);
    }

    try {
      return await this.usersRepository.update(
        { id: id },
        {
          firstName: updateUserDto.firstName,
          lastName: updateUserDto.lastName,
          email: updateUserDto.email,
          passwordHash,
        },
      );
    } catch {
      throw new BadRequestException('Could not update account');
    }
  }

  remove(id: number) {
    return this.usersRepository.delete({ id: id });
  }
}
