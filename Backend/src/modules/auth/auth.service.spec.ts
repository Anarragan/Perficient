import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user without password if credentials are valid', async () => {
      const user = { id: '1', email: 'test@example.com', password: '$2b$10$hash' };
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(user);
      const bcrypt = require('bcrypt');
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      const result = await service.validateUser('test@example.com', 'password');

      expect(usersService.findByEmail).toHaveBeenCalledWith('test@example.com');
      expect(result).toEqual({ id: '1', email: 'test@example.com' });
    });

    it('should return null if user not found', async () => {
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);

      const result = await service.validateUser('test@example.com', 'password');

      expect(result).toBeNull();
    });

    it('should return null if password does not match', async () => {
      const user = { id: '1', email: 'test@example.com', password: '$2b$10$hash' };
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(user);
      const bcrypt = require('bcrypt');
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      const result = await service.validateUser('test@example.com', 'wrongpassword');

      expect(result).toBeNull();
    });
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const userData = { email: 'test@example.com', password: 'password123' };
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);
      const createdUser = { id: '1', email: 'test@example.com', password: 'hashed' };
      jest.spyOn(usersService, 'create').mockResolvedValue({ success: true, data: createdUser });

      const result = await service.register(userData);

      expect(usersService.findByEmail).toHaveBeenCalledWith('test@example.com');
      expect(usersService.create).toHaveBeenCalledWith(userData);
      expect(result).toEqual({ success: true, message: 'User registered successfully', user: { id: '1', email: 'test@example.com' } });
    });

    it('should throw error if user already exists', async () => {
      const userData = { email: 'test@example.com', password: 'password123' };
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue({ id: '1', email: 'test@example.com' });

      await expect(service.register(userData)).rejects.toThrow('User with this email already exists');
    });
  });

  describe('login', () => {
    it('should return login response with token', async () => {
      const user = { id: '1', email: 'test@example.com' };
      jest.spyOn(jwtService, 'sign').mockReturnValue('token');

      const result = await service.login(user);

      expect(jwtService.sign).toHaveBeenCalledWith({ email: 'test@example.com', sub: '1' });
      expect(result).toEqual({ success: true, message: 'Login successful', access_token: 'token' });
    });
  });
});