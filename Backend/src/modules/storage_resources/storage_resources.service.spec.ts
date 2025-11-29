import { Test, TestingModule } from '@nestjs/testing';
import { StorageResourcesService } from './storage_resources.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StorageResource } from './entities/storage_resource.entity';

describe('StorageResourcesService', () => {
  let service: StorageResourcesService;
  let testingModule: TestingModule;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        StorageResourcesService,
        {
          provide: getRepositoryToken(StorageResource),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = testingModule.get<StorageResourcesService>(StorageResourcesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a storage resource successfully', async () => {
      const createStorageResourceDto = { idStorage: 'storage1', idResource: 'resource1' };
      const mockRepository = testingModule.get(getRepositoryToken(StorageResource));
      jest.spyOn(mockRepository, 'create').mockReturnValue({} as any);
      jest.spyOn(mockRepository, 'save').mockResolvedValue({} as any);

      const result = await service.create(createStorageResourceDto);

      expect(mockRepository.create).toHaveBeenCalledWith({ idStorage: 'storage1', idResource: 'resource1' });
      expect(result.success).toBe(true);
      expect(result.message).toBe('Storage resource created successfully');
    });

    it('should handle creation failure', async () => {
      const createStorageResourceDto = { idStorage: 'storage1', idResource: 'resource1' };
      const mockRepository = testingModule.get(getRepositoryToken(StorageResource));
      jest.spyOn(mockRepository, 'create').mockReturnValue({} as any);
      jest.spyOn(mockRepository, 'save').mockRejectedValue(new Error('DB error'));

      const result = await service.create(createStorageResourceDto);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Failed to create storage resource');
    });
  });

  describe('findAll', () => {
    it('should return all storage resources', async () => {
      const mockData = [{ idStorage: '1', idResource: '1' }];
      const mockRepository = testingModule.get(getRepositoryToken(StorageResource));
      jest.spyOn(mockRepository, 'find').mockResolvedValue(mockData as any);

      const result = await service.findAll();

      expect(mockRepository.find).toHaveBeenCalledWith({ relations: ['storage', 'resource'] });
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockData);
    });
  });

  describe('findOne', () => {
    it('should return storage resource if found', async () => {
      const mockData = { idStorage: '1', idResource: '1' };
      const mockRepository = testingModule.get(getRepositoryToken(StorageResource));
      jest.spyOn(mockRepository, 'findOne').mockResolvedValue(mockData as any);

      const result = await service.findOne('1', '1');

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { idStorage: '1', idResource: '1' },
        relations: ['storage', 'resource'],
      });
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockData);
    });

    it('should return not found if not exists', async () => {
      const mockRepository = testingModule.get(getRepositoryToken(StorageResource));
      jest.spyOn(mockRepository, 'findOne').mockResolvedValue(null);

      const result = await service.findOne('1', '1');

      expect(result.success).toBe(false);
      expect(result.message).toBe('Storage resource not found');
    });
  });

  describe('update', () => {
    it('should return not supported', async () => {
      const result = await service.update('1', '1', {});

      expect(result.success).toBe(false);
      expect(result.message).toBe('Update not supported for composite key');
    });
  });

  describe('remove', () => {
    it('should remove storage resource if found', async () => {
      const mockRepository = testingModule.get(getRepositoryToken(StorageResource));
      jest.spyOn(mockRepository, 'delete').mockResolvedValue({ affected: 1 } as any);

      const result = await service.remove('1', '1');

      expect(mockRepository.delete).toHaveBeenCalledWith({ idStorage: '1', idResource: '1' });
      expect(result.success).toBe(true);
    });

    it('should return not found if not exists', async () => {
      const mockRepository = testingModule.get(getRepositoryToken(StorageResource));
      jest.spyOn(mockRepository, 'delete').mockResolvedValue({ affected: 0 } as any);

      const result = await service.remove('1', '1');

      expect(result.success).toBe(false);
      expect(result.message).toBe('Storage resource not found');
    });
  });
});
