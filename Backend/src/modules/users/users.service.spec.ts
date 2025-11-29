import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let mockRepository: any;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save user with hashed password', async () => {
      const createUserDto = { email: 'test@example.com', password: 'password123' };
      const hashedPassword = 'hashed';
      const user = { ...createUserDto, password: hashedPassword };
      const savedUser = { id: '1', ...user };

      const bcrypt = require('bcrypt');
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);
      mockRepository.create.mockReturnValue(user);
      mockRepository.save.mockResolvedValue(savedUser);

      const result = await service.create(createUserDto);

      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(mockRepository.create).toHaveBeenCalledWith({ ...createUserDto, password: hashedPassword });
      expect(mockRepository.save).toHaveBeenCalledWith(user);
      expect(result).toEqual({ success: true, message: 'User created successfully', data: { id: '1', email: 'test@example.com' } });
    });
  });

  describe('findAll', () => {
    it('should return all users without passwords', async () => {
      const users = [{ id: '1', email: 'test@example.com', password: 'hash' }];
      mockRepository.find.mockResolvedValue(users);

      const result = await service.findAll();

      expect(mockRepository.find).toHaveBeenCalled();
      expect(result).toEqual({ success: true, data: [{ id: '1', email: 'test@example.com' }] });
    });
  });

  describe('findOne', () => {
    it('should return user without password if found', async () => {
      const user = { id: '1', email: 'test@example.com', password: 'hash' };
      mockRepository.findOne.mockResolvedValue(user);

      const result = await service.findOne('1');

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(result).toEqual({ success: true, data: { id: '1', email: 'test@example.com' } });
    });

    it('should return not found if user does not exist', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      const result = await service.findOne('1');

      expect(result).toEqual({ success: false, message: 'User not found' });
    });
  });

  describe('update', () => {
    it('should update user and hash password if provided', async () => {
      const updateUserDto = { password: 'newpass' };
      const hashedPassword = 'newhash';
      const bcrypt = require('bcrypt');
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);
      mockRepository.update.mockResolvedValue({ affected: 1 });
      const updatedUser = { id: '1', email: 'test@example.com' };
      jest.spyOn(service, 'findOne').mockResolvedValue({ success: true, data: updatedUser });

      const result = await service.update('1', updateUserDto);

      expect(bcrypt.hash).toHaveBeenCalledWith('newpass', 10);
      expect(mockRepository.update).toHaveBeenCalledWith('1', { password: hashedPassword });
      expect(result).toEqual({ success: true, message: 'User updated successfully', data: updatedUser });
    });

    it('should return not found if update affects 0', async () => {
      mockRepository.update.mockResolvedValue({ affected: 0 });

      const result = await service.update('1', {});

      expect(result).toEqual({ success: false, message: 'User not found' });
    });
  });

  describe('remove', () => {
    it('should delete user if found', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.remove('1');

      expect(mockRepository.delete).toHaveBeenCalledWith('1');
      expect(result).toEqual({ success: true, message: 'User deleted successfully' });
    });

    it('should return not found if delete affects 0', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 0 });

      const result = await service.remove('1');

      expect(result).toEqual({ success: false, message: 'User not found' });
    });
  });

  describe('findByEmail', () => {
    it('should return user by email', async () => {
      const user = { id: '1', email: 'test@example.com' };
      mockRepository.findOne.mockResolvedValue(user);

      const result = await service.findByEmail('test@example.com');

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
      expect(result).toEqual(user);
    });
  });
});
