import { Test, TestingModule } from '@nestjs/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StorageService],
    }).compile();

    service = module.get<StorageService>(StorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new storage', () => {
      const createStorageDto = { type: 'Type1', lowlimit: 10, highlimit: 100 };
      const result = service.create(createStorageDto);

      expect(result.success).toBe(true);
      expect(result.data.type).toBe(createStorageDto.type);
      expect(result.data.lowlimit).toBe(createStorageDto.lowlimit);
      expect(result.data.highlimit).toBe(createStorageDto.highlimit);
      expect(result.data.id).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should return all storages', () => {
      const result = service.findAll();

      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
    });
  });

  describe('findOne', () => {
    it('should return storage if found', () => {
      const createStorageDto = { type: 'Type1', lowlimit: 10, highlimit: 100 };
      const created = service.create(createStorageDto);
      const result = service.findOne(created.data.id);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(created.data);
    });

    it('should return not found if storage does not exist', () => {
      const result = service.findOne('nonexistent');

      expect(result.success).toBe(false);
      expect(result.message).toBe('Storage not found');
    });
  });

  describe('update', () => {
    it('should update storage if found', () => {
      const createStorageDto = { type: 'Type1', lowlimit: 10, highlimit: 100 };
      const created = service.create(createStorageDto);
      const updateStorageDto = { lowlimit: 20 };
      const result = service.update(created.data.id, updateStorageDto);

      expect(result.success).toBe(true);
      expect(result.data.lowlimit).toBe(20);
    });

    it('should return not found if storage does not exist', () => {
      const updateStorageDto = { lowlimit: 20 };
      const result = service.update('nonexistent', updateStorageDto);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Storage not found');
    });
  });

  describe('remove', () => {
    it('should remove storage if found', () => {
      const createStorageDto = { type: 'Type1', lowlimit: 10, highlimit: 100 };
      const created = service.create(createStorageDto);
      const result = service.remove(created.data.id);

      expect(result.success).toBe(true);
      expect(result.message).toBe('Storage deleted successfully');
      const find = service.findOne(created.data.id);
      expect(find.success).toBe(false);
    });

    it('should return not found if storage does not exist', () => {
      const result = service.remove('nonexistent');

      expect(result.success).toBe(false);
      expect(result.message).toBe('Storage not found');
    });
  });
});
