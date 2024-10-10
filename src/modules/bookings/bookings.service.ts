import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from '../../dto/create-booking.dto';
import { UpdateBookingDto } from '../../dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/entities/booking.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingsRepository: Repository<Booking>,
  ) {}

  async create(createBookingDto: CreateBookingDto) {
    const booking = this.bookingsRepository.create(createBookingDto);

    booking.users = createBookingDto.userIds.map((id) => ({
      ...new User(),
      id,
    }));

    return await this.bookingsRepository.save(booking);
  }

  findAll() {
    return this.bookingsRepository.find({
      relations: { users: true, project: true, booker: true },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    console.log(updateBookingDto);
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
