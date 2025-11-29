import { Test, TestingModule } from '@nestjs/testing';
import { VehicleTypeService } from './vehicle_type.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { VehicleType } from './entities/vehicle_type.entity';

describe('VehicleTypeService', () => {
  let service: VehicleTypeService;
  let testingModule: TestingModule;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        VehicleTypeService,
        {
          provide: getRepositoryToken(VehicleType),
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

    service = testingModule.get<VehicleTypeService>(VehicleTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new vehicle type', async () => {
      const createVehicleTypeDto = { name: 'Type1', description: 'Description' };
      const mockVehicleType = { id: '1', ...createVehicleTypeDto };
      const mockRepository = testingModule.get(getRepositoryToken(VehicleType));
      jest.spyOn(mockRepository, 'create').mockReturnValue(mockVehicleType as any);
      jest.spyOn(mockRepository, 'save').mockResolvedValue(mockVehicleType as any);

      const result = await service.create(createVehicleTypeDto);

      expect(mockRepository.create).toHaveBeenCalledWith(createVehicleTypeDto);
      expect(mockRepository.save).toHaveBeenCalledWith(mockVehicleType);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockVehicleType);
    });
  });

  describe('findAll', () => {
    it('should return all vehicle types', async () => {
      const mockVehicleTypes = [{ id: '1', name: 'Type1' }];
      const mockRepository = testingModule.get(getRepositoryToken(VehicleType));
      jest.spyOn(mockRepository, 'find').mockResolvedValue(mockVehicleTypes as any);

      const result = await service.findAll();

      expect(mockRepository.find).toHaveBeenCalled();
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockVehicleTypes);
    });
  });

  describe('findOne', () => {
    it('should return vehicle type if found', async () => {
      const mockVehicleType = { id: '1', name: 'Type1' };
      const mockRepository = testingModule.get(getRepositoryToken(VehicleType));
      jest.spyOn(mockRepository, 'findOne').mockResolvedValue(mockVehicleType as any);

      const result = await service.findOne('1');

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockVehicleType);
    });

    it('should return error if not found', async () => {
      const mockRepository = testingModule.get(getRepositoryToken(VehicleType));
      jest.spyOn(mockRepository, 'findOne').mockResolvedValue(null);

      const result = await service.findOne('1');

      expect(result.success).toBe(false);
      expect(result.message).toBe('Vehicle type not found');
    });
  });

  describe('update', () => {
    it('should update vehicle type if found', async () => {
      const updateVehicleTypeDto = { name: 'Updated' };
      const mockVehicleType = { id: '1', name: 'Updated' };
      const mockRepository = testingModule.get(getRepositoryToken(VehicleType));
      jest.spyOn(mockRepository, 'update').mockResolvedValue({ affected: 1 } as any);
      jest.spyOn(mockRepository, 'findOne').mockResolvedValue(mockVehicleType as any);

      const result = await service.update('1', updateVehicleTypeDto);

      expect(mockRepository.update).toHaveBeenCalledWith('1', updateVehicleTypeDto);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockVehicleType);
    });

    it('should return error if not found', async () => {
      const mockRepository = testingModule.get(getRepositoryToken(VehicleType));
      jest.spyOn(mockRepository, 'update').mockResolvedValue({ affected: 0 } as any);

      const result = await service.update('1', {});

      expect(result.success).toBe(false);
      expect(result.message).toBe('Vehicle type not found');
    });
  });

  describe('remove', () => {
    it('should remove vehicle type if found', async () => {
      const mockRepository = testingModule.get(getRepositoryToken(VehicleType));
      jest.spyOn(mockRepository, 'delete').mockResolvedValue({ affected: 1 } as any);

      const result = await service.remove('1');

      expect(mockRepository.delete).toHaveBeenCalledWith('1');
      expect(result.success).toBe(true);
    });

    it('should return error if not found', async () => {
      const mockRepository = testingModule.get(getRepositoryToken(VehicleType));
      jest.spyOn(mockRepository, 'delete').mockResolvedValue({ affected: 0 } as any);

      const result = await service.remove('1');

      expect(result.success).toBe(false);
      expect(result.message).toBe('Vehicle type not found');
    });
  });
});
