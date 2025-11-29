import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesService } from './vehicles.service';

describe('VehiclesService', () => {
  let service: VehiclesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehiclesService],
    }).compile();

    service = module.get<VehiclesService>(VehiclesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new vehicle', () => {
      const createVehicleDto = { capacidad: 100, id_type: 'type1', id_user: 'user1' };
      const result = service.create(createVehicleDto);

      expect(result.success).toBe(true);
      expect(result.data.capacidad).toBe(100);
      expect(result.data.id_type).toEqual({ id: 'type1' });
      expect(result.data.id_user).toEqual({ id: 'user1' });
      expect(result.data.id).toBeDefined();
    });

    it('should create vehicle without id_user if not provided', () => {
      const createVehicleDto = { capacidad: 100, id_type: 'type1' };
      const result = service.create(createVehicleDto);

      expect(result.data.id_user).toBeUndefined();
    });
  });

  describe('findAll', () => {
    it('should return all vehicles', () => {
      const result = service.findAll();

      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
    });
  });

  describe('findOne', () => {
    it('should return vehicle if found', () => {
      const createVehicleDto = { capacidad: 100, id_type: 'type1' };
      const created = service.create(createVehicleDto);
      const result = service.findOne(created.data.id);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(created.data);
    });

    it('should return not found if vehicle does not exist', () => {
      const result = service.findOne('nonexistent');

      expect(result.success).toBe(false);
      expect(result.message).toBe('Vehicle not found');
    });
  });

  describe('findByUserId', () => {
    it('should return vehicles for user', () => {
      const createVehicleDto = { capacidad: 100, id_type: 'type1', id_user: 'user1' };
      service.create(createVehicleDto);
      const result = service.findByUserId('user1');

      expect(result).toHaveLength(1);
      expect(result[0].id_user.id).toBe('user1');
    });
  });

  describe('update', () => {
    it('should update vehicle if found', () => {
      const createVehicleDto = { capacidad: 100, id_type: 'type1' };
      const created = service.create(createVehicleDto);
      const updateVehicleDto = { capacidad: 200 };
      const result = service.update(created.data.id, updateVehicleDto);

      expect(result.success).toBe(true);
      expect(result.data.capacidad).toBe(200);
    });

    it('should return not found if vehicle does not exist', () => {
      const updateVehicleDto = { capacidad: 200 };
      const result = service.update('nonexistent', updateVehicleDto);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Vehicle not found');
    });
  });

  describe('remove', () => {
    it('should remove vehicle if found', () => {
      const createVehicleDto = { capacidad: 100, id_type: 'type1' };
      const created = service.create(createVehicleDto);
      const result = service.remove(created.data.id);

      expect(result.success).toBe(true);
      expect(result.message).toBe('Vehicle deleted successfully');
      const find = service.findOne(created.data.id);
      expect(find.success).toBe(false);
    });

    it('should return not found if vehicle does not exist', () => {
      const result = service.remove('nonexistent');

      expect(result.success).toBe(false);
      expect(result.message).toBe('Vehicle not found');
    });
  });
});
