import { Test, TestingModule } from '@nestjs/testing';
import { ResourcesService } from './resources.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Resource } from './entities/resource.entity';

describe('ResourcesService', () => {
  let service: ResourcesService;
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
        ResourcesService,
        {
          provide: getRepositoryToken(Resource),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ResourcesService>(ResourcesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save resource', async () => {
      const createResourceDto = { name: 'Resource1', idUser: 'user1' };
      const resource = { id: '1', ...createResourceDto };
      mockRepository.create.mockReturnValue(resource);
      mockRepository.save.mockResolvedValue(resource);

      const result = await service.create(createResourceDto);

      expect(mockRepository.create).toHaveBeenCalledWith(createResourceDto);
      expect(mockRepository.save).toHaveBeenCalledWith(resource);
      expect(result).toEqual({ success: true, message: 'Resource created successfully', data: resource });
    });
  });

  describe('findAll', () => {
    it('should return all resources', async () => {
      const resources = [{ id: '1', name: 'Resource1' }];
      mockRepository.find.mockResolvedValue(resources);

      const result = await service.findAll();

      expect(mockRepository.find).toHaveBeenCalled();
      expect(result).toEqual({ success: true, data: resources });
    });
  });

  describe('findOne', () => {
    it('should return resource if found', async () => {
      const resource = { id: '1', name: 'Resource1' };
      mockRepository.findOne.mockResolvedValue(resource);

      const result = await service.findOne('1');

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(result).toEqual({ success: true, data: resource });
    });

    it('should return not found if resource does not exist', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      const result = await service.findOne('1');

      expect(result).toEqual({ success: false, message: 'Resource not found' });
    });
  });

  describe('findByUserId', () => {
    it('should return resources for user', async () => {
      const resources = [{ id: '1', idUser: 'user1' }];
      mockRepository.find.mockResolvedValue(resources);

      const result = await service.findByUserId('user1');

      expect(mockRepository.find).toHaveBeenCalledWith({ where: { idUser: 'user1' } });
      expect(result).toEqual(resources);
    });
  });

  describe('update', () => {
    it('should update resource if found', async () => {
      const updateResourceDto = { name: 'Updated' };
      mockRepository.update.mockResolvedValue({ affected: 1 });
      const updatedResource = { id: '1', name: 'Updated' };
      jest.spyOn(service, 'findOne').mockResolvedValue({ success: true, data: updatedResource });

      const result = await service.update('1', updateResourceDto);

      expect(mockRepository.update).toHaveBeenCalledWith('1', updateResourceDto);
      expect(result).toEqual({ success: true, message: 'Resource updated successfully', data: updatedResource });
    });

    it('should return not found if update affects 0', async () => {
      mockRepository.update.mockResolvedValue({ affected: 0 });

      const result = await service.update('1', {});

      expect(result).toEqual({ success: false, message: 'Resource not found' });
    });
  });

  describe('remove', () => {
    it('should delete resource if found', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.remove('1');

      expect(mockRepository.delete).toHaveBeenCalledWith('1');
      expect(result).toEqual({ success: true, message: 'Resource deleted successfully' });
    });

    it('should return not found if delete affects 0', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 0 });

      const result = await service.remove('1');

      expect(result).toEqual({ success: false, message: 'Resource not found' });
    });
  });
});
