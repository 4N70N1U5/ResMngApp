import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue({}),
            findAll: jest.fn().mockResolvedValue([]),
            findOneById: jest.fn().mockResolvedValue({}),
            findOneByEmail: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            remove: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      passwordHash: 'hashedpassword',
    };
    await expect(controller.create(createUserDto)).resolves.toEqual({});
  });

  it('should return an array of users', async () => {
    await expect(controller.findAll()).resolves.toEqual([]);
  });

  it('should return a user by id', async () => {
    await expect(controller.findOneById('1')).resolves.toEqual({});
  });

  it('should return a user by email', async () => {
    await expect(
      controller.findOneByEmail('john.doe@example.com'),
    ).resolves.toEqual({});
  });

  it('should update a user', async () => {
    const updateUserDto: UpdateUserDto = {
      firstName: 'Jane',
    };
    await expect(controller.update('1', updateUserDto)).resolves.toEqual({});
  });

  it('should remove a user', async () => {
    await expect(controller.remove('1')).resolves.toEqual({});
  });
});
