import { Test, TestingModule } from '@nestjs/testing';
import { StorageResourcesController } from './storage_resources.controller';
import { StorageResourcesService } from './storage_resources.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

describe('StorageResourcesController', () => {
  let controller: StorageResourcesController;
  let storageResourcesService: StorageResourcesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StorageResourcesController],
      providers: [
        {
          provide: StorageResourcesService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<StorageResourcesController>(StorageResourcesController);
    storageResourcesService = module.get<StorageResourcesService>(StorageResourcesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call storageResourcesService.create with createStorageResourceDto', () => {
      const createStorageResourceDto = { name: 'Resource1' };
      const mockResult = { success: true, message: 'Storage resource created successfully' };
      jest.spyOn(storageResourcesService, 'create').mockReturnValue(mockResult);

      const result = controller.create(createStorageResourceDto);

      expect(storageResourcesService.create).toHaveBeenCalledWith(createStorageResourceDto);
      expect(result).toEqual(mockResult);
    });
  });

  describe('findAll', () => {
    it('should call storageResourcesService.findAll', () => {
      const mockResult = { success: true, data: [] };
      jest.spyOn(storageResourcesService, 'findAll').mockReturnValue(mockResult);

      const result = controller.findAll();

      expect(storageResourcesService.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockResult);
    });
  });

  describe('findOne', () => {
    it('should call storageResourcesService.findOne with parsed id', () => {
      const id = '1';
      const mockResult = { success: true, data: { id: 1, name: 'Resource1' } };
      jest.spyOn(storageResourcesService, 'findOne').mockReturnValue(mockResult);

      const result = controller.findOne(id);

      expect(storageResourcesService.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockResult);
    });
  });

  describe('update', () => {
    it('should call storageResourcesService.update with parsed id and updateStorageResourceDto', () => {
      const id = '1';
      const updateStorageResourceDto = { name: 'Updated' };
      const mockResult = { success: true, message: 'Storage resource updated successfully' };
      jest.spyOn(storageResourcesService, 'update').mockReturnValue(mockResult);

      const result = controller.update(id, updateStorageResourceDto);

      expect(storageResourcesService.update).toHaveBeenCalledWith(1, updateStorageResourceDto);
      expect(result).toEqual(mockResult);
    });
  });

  describe('remove', () => {
    it('should call storageResourcesService.remove with parsed id', () => {
      const id = '1';
      const mockResult = { success: true, message: 'Storage resource deleted successfully' };
      jest.spyOn(storageResourcesService, 'remove').mockReturnValue(mockResult);

      const result = controller.remove(id);

      expect(storageResourcesService.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockResult);
    });
  });
});
