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
    const salt = bcrypt.genSaltSync();

    const passwordHash = bcrypt.hashSync(
      createUserDto.password,
      bcrypt.hashSync(process.env.BCRYPT_SECRET, salt),
    );

    try {
      return await this.usersRepository.save({
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        passwordHash,
        salt,
      });
    } catch {
      throw new BadRequestException('Could not create');
    }
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOneById(id: number) {
    return this.usersRepository.findOneBy({ id: id });
  }

  findOneByEmail(email: string) {
    console.log(email);
    return this.usersRepository.findOneBy({ email: email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
