import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            register: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(LocalAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should call authService.login with user from request', async () => {
      const mockUser = { id: '1', email: 'test@example.com' };
      const mockResult = { success: true, message: 'Login successful', access_token: 'token' };
      jest.spyOn(authService, 'login').mockReturnValue(mockResult);

      const req = { user: mockUser };
      const result = await controller.login(req);

      expect(authService.login).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockResult);
    });
  });

  describe('register', () => {
    it('should call authService.register with registerDto', async () => {
      const registerDto = { email: 'test@example.com', password: 'password123' };
      const mockResult = { success: true, message: 'User registered successfully', user: { id: '1', email: 'test@example.com' } };
      jest.spyOn(authService, 'register').mockResolvedValue(mockResult);

      const result = await controller.register(registerDto);

      expect(authService.register).toHaveBeenCalledWith(registerDto);
      expect(result).toEqual(mockResult);
    });

    it('should throw error if registration fails', async () => {
      const registerDto = { email: 'test@example.com', password: 'password123' };
      jest.spyOn(authService, 'register').mockRejectedValue(new Error('Registration failed'));

      await expect(controller.register(registerDto)).rejects.toThrow('Registration failed');
    });
  });
});