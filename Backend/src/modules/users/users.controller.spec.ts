import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            findByEmail: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create user if email not exists', async () => {
      const createUserDto = { email: 'test@example.com', password: 'pass' };
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);
      const mockResult = { success: true, data: { id: '1', email: 'test@example.com' } };
      jest.spyOn(usersService, 'create').mockResolvedValue(mockResult);

      const result = await controller.create(createUserDto);

      expect(usersService.findByEmail).toHaveBeenCalledWith('test@example.com');
      expect(usersService.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(mockResult);
    });

    it('should throw error if email exists', async () => {
      const createUserDto = { email: 'test@example.com', password: 'pass' };
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue({ id: '1', email: 'test@example.com' });

      await expect(controller.create(createUserDto)).rejects.toThrow('User with this email already exists');
    });
  });

  describe('findAll', () => {
    it('should call usersService.findAll', async () => {
      const mockResult = { success: true, data: [] };
      jest.spyOn(usersService, 'findAll').mockResolvedValue(mockResult);

      const result = await controller.findAll();

      expect(usersService.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockResult);
    });
  });

  describe('findOne', () => {
    it('should call usersService.findOne with id', async () => {
      const id = '1';
      const mockResult = { success: true, data: { id, email: 'test@example.com' } };
      jest.spyOn(usersService, 'findOne').mockResolvedValue(mockResult);

      const result = await controller.findOne(id);

      expect(usersService.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockResult);
    });
  });

  describe('update', () => {
    it('should call usersService.update with id and updateUserDto', async () => {
      const id = '1';
      const updateUserDto = { email: 'updated@example.com' };
      const mockResult = { success: true, data: { id, email: 'updated@example.com' } };
      jest.spyOn(usersService, 'update').mockResolvedValue(mockResult);

      const result = await controller.update(id, updateUserDto);

      expect(usersService.update).toHaveBeenCalledWith(id, updateUserDto);
      expect(result).toEqual(mockResult);
    });
  });

  describe('remove', () => {
    it('should call usersService.remove with id', async () => {
      const id = '1';
      const mockResult = { success: true, message: 'User deleted successfully' };
      jest.spyOn(usersService, 'remove').mockResolvedValue(mockResult);

      const result = await controller.remove(id);

      expect(usersService.remove).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockResult);
    });
  });
});
