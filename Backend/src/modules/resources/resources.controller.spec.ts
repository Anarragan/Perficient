import { Test, TestingModule } from '@nestjs/testing';
import { ResourcesController } from './resources.controller';
import { ResourcesService } from './resources.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

describe('ResourcesController', () => {
  let controller: ResourcesController;
  let resourcesService: ResourcesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResourcesController],
      providers: [
        {
          provide: ResourcesService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            findByUserId: jest.fn(),
            subject: { pipe: jest.fn() },
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<ResourcesController>(ResourcesController);
    resourcesService = module.get<ResourcesService>(ResourcesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call resourcesService.create with createResourceDto', async () => {
      const createResourceDto = { name: 'Resource1', idUser: 'user1' };
      const mockResult = { success: true, data: { id: '1', ...createResourceDto } };
      jest.spyOn(resourcesService, 'create').mockResolvedValue(mockResult);

      const result = await controller.create(createResourceDto);

      expect(resourcesService.create).toHaveBeenCalledWith(createResourceDto);
      expect(result).toEqual(mockResult);
    });
  });

  describe('findAll', () => {
    it('should call resourcesService.findAll', async () => {
      const mockResult = { success: true, data: [] };
      jest.spyOn(resourcesService, 'findAll').mockResolvedValue(mockResult);

      const result = await controller.findAll();

      expect(resourcesService.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockResult);
    });
  });

  describe('findOne', () => {
    it('should call resourcesService.findOne with id', async () => {
      const id = '1';
      const mockResult = { success: true, data: { id, name: 'Resource1' } };
      jest.spyOn(resourcesService, 'findOne').mockResolvedValue(mockResult);

      const result = await controller.findOne(id);

      expect(resourcesService.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockResult);
    });
  });

  describe('update', () => {
    it('should call resourcesService.update with id and updateResourceDto', async () => {
      const id = '1';
      const updateResourceDto = { name: 'Updated Resource' };
      const mockResult = { success: true, data: { id, name: 'Updated Resource' } };
      jest.spyOn(resourcesService, 'update').mockResolvedValue(mockResult);

      const result = await controller.update(id, updateResourceDto);

      expect(resourcesService.update).toHaveBeenCalledWith(id, updateResourceDto);
      expect(result).toEqual(mockResult);
    });
  });

  describe('remove', () => {
    it('should call resourcesService.remove with id', async () => {
      const id = '1';
      const mockResult = { success: true, message: 'Resource deleted successfully' };
      jest.spyOn(resourcesService, 'remove').mockResolvedValue(mockResult);

      const result = await controller.remove(id);

      expect(resourcesService.remove).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockResult);
    });
  });

  describe('streamUserResources', () => {
    it('should return observable from service.subject.pipe', () => {
      const userId = 'user1';
      const mockObservable = { subscribe: jest.fn() };
      jest.spyOn(resourcesService.subject, 'pipe').mockReturnValue(mockObservable);

      const result = controller.streamUserResources(userId);

      expect(resourcesService.subject.pipe).toHaveBeenCalled();
      expect(result).toEqual(mockObservable);
    });
  });
});
