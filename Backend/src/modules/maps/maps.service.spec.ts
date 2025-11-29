import { Test, TestingModule } from '@nestjs/testing';
import { MapsService } from './maps.service';

describe('MapsService', () => {
  let service: MapsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MapsService],
    }).compile();

    service = module.get<MapsService>(MapsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new map', () => {
      const createMapDto = { url: 'http://example.com', description: 'Test map' };
      const result = service.create(createMapDto);

      expect(result.success).toBe(true);
      expect(result.data.url).toBe(createMapDto.url);
      expect(result.data.description).toBe(createMapDto.description);
      expect(result.data.id).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should return all maps', () => {
      const result = service.findAll();

      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
    });
  });

  describe('findOne', () => {
    it('should return map if found', () => {
      const createMapDto = { url: 'http://example.com', description: 'Test map' };
      const created = service.create(createMapDto);
      const result = service.findOne(created.data.id);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(created.data);
    });

    it('should return not found if map does not exist', () => {
      const result = service.findOne('nonexistent');

      expect(result.success).toBe(false);
      expect(result.message).toBe('Map not found');
    });
  });

  describe('update', () => {
    it('should update map if found', () => {
      const createMapDto = { url: 'http://example.com', description: 'Test map' };
      const created = service.create(createMapDto);
      const updateMapDto = { description: 'Updated' };
      const result = service.update(created.data.id, updateMapDto);

      expect(result.success).toBe(true);
      expect(result.data.description).toBe('Updated');
    });

    it('should return not found if map does not exist', () => {
      const updateMapDto = { description: 'Updated' };
      const result = service.update('nonexistent', updateMapDto);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Map not found');
    });
  });

  describe('remove', () => {
    it('should remove map if found', () => {
      const createMapDto = { url: 'http://example.com', description: 'Test map' };
      const created = service.create(createMapDto);
      const result = service.remove(created.data.id);

      expect(result.success).toBe(true);
      expect(result.message).toBe('Map deleted successfully');
      const find = service.findOne(created.data.id);
      expect(find.success).toBe(false);
    });

    it('should return not found if map does not exist', () => {
      const result = service.remove('nonexistent');

      expect(result.success).toBe(false);
      expect(result.message).toBe('Map not found');
    });
  });
});
