import { Test, TestingModule } from '@nestjs/testing';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

describe('StorageController', () => {
  let controller: StorageController;
  let storageService: StorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StorageController],
      providers: [
        {
          provide: StorageService,
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

    controller = module.get<StorageController>(StorageController);
    storageService = module.get<StorageService>(StorageService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call storageService.create with createStorageDto', () => {
      const createStorageDto = { type: 'Type1', lowlimit: 10, highlimit: 100 };
      const mockResult = { success: true, data: { id: '1', ...createStorageDto } };
      jest.spyOn(storageService, 'create').mockReturnValue(mockResult);

      const result = controller.create(createStorageDto);

      expect(storageService.create).toHaveBeenCalledWith(createStorageDto);
      expect(result).toEqual(mockResult);
    });
  });

  describe('findAll', () => {
    it('should call storageService.findAll', () => {
      const mockResult = { success: true, data: [] };
      jest.spyOn(storageService, 'findAll').mockReturnValue(mockResult);

      const result = controller.findAll();

      expect(storageService.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockResult);
    });
  });

  describe('findOne', () => {
    it('should call storageService.findOne with id', () => {
      const id = '1';
      const mockResult = { success: true, data: { id, type: 'Type1' } };
      jest.spyOn(storageService, 'findOne').mockReturnValue(mockResult);

      const result = controller.findOne(id);

      expect(storageService.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockResult);
    });
  });

  describe('update', () => {
    it('should call storageService.update with id and updateStorageDto', () => {
      const id = '1';
      const updateStorageDto = { lowlimit: 20 };
      const mockResult = { success: true, data: { id, lowlimit: 20 } };
      jest.spyOn(storageService, 'update').mockReturnValue(mockResult);

      const result = controller.update(id, updateStorageDto);

      expect(storageService.update).toHaveBeenCalledWith(id, updateStorageDto);
      expect(result).toEqual(mockResult);
    });
  });

  describe('remove', () => {
    it('should call storageService.remove with id', () => {
      const id = '1';
      const mockResult = { success: true, message: 'Storage deleted successfully' };
      jest.spyOn(storageService, 'remove').mockReturnValue(mockResult);

      const result = controller.remove(id);

      expect(storageService.remove).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockResult);
    });
  });
});
