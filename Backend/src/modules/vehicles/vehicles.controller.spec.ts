import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

describe('VehiclesController', () => {
  let controller: VehiclesController;
  let vehiclesService: VehiclesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehiclesController],
      providers: [
        {
          provide: VehiclesService,
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

    controller = module.get<VehiclesController>(VehiclesController);
    vehiclesService = module.get<VehiclesService>(VehiclesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call vehiclesService.create with createVehicleDto', () => {
      const createVehicleDto = { capacidad: 100, id_type: 'type1', id_user: 'user1' };
      const mockResult = { success: true, data: { id: '1', ...createVehicleDto } };
      jest.spyOn(vehiclesService, 'create').mockReturnValue(mockResult);

      const result = controller.create(createVehicleDto);

      expect(vehiclesService.create).toHaveBeenCalledWith(createVehicleDto);
      expect(result).toEqual(mockResult);
    });
  });

  describe('findAll', () => {
    it('should call vehiclesService.findAll', () => {
      const mockResult = { success: true, data: [] };
      jest.spyOn(vehiclesService, 'findAll').mockReturnValue(mockResult);

      const result = controller.findAll();

      expect(vehiclesService.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockResult);
    });
  });

  describe('findOne', () => {
    it('should call vehiclesService.findOne with id', () => {
      const id = '1';
      const mockResult = { success: true, data: { id, capacidad: 100 } };
      jest.spyOn(vehiclesService, 'findOne').mockReturnValue(mockResult);

      const result = controller.findOne(id);

      expect(vehiclesService.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockResult);
    });
  });

  describe('update', () => {
    it('should call vehiclesService.update with id and updateVehicleDto', () => {
      const id = '1';
      const updateVehicleDto = { capacidad: 200 };
      const mockResult = { success: true, data: { id, capacidad: 200 } };
      jest.spyOn(vehiclesService, 'update').mockReturnValue(mockResult);

      const result = controller.update(id, updateVehicleDto);

      expect(vehiclesService.update).toHaveBeenCalledWith(id, updateVehicleDto);
      expect(result).toEqual(mockResult);
    });
  });

  describe('remove', () => {
    it('should call vehiclesService.remove with id', () => {
      const id = '1';
      const mockResult = { success: true, message: 'Vehicle deleted successfully' };
      jest.spyOn(vehiclesService, 'remove').mockReturnValue(mockResult);

      const result = controller.remove(id);

      expect(vehiclesService.remove).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockResult);
    });
  });

  describe('streamUserVehicles', () => {
    it('should return observable from service.subject.pipe', () => {
      const userId = 'user1';
      const mockObservable = { subscribe: jest.fn() };
      jest.spyOn(vehiclesService.subject, 'pipe').mockReturnValue(mockObservable);

      const result = controller.streamUserVehicles(userId);

      expect(vehiclesService.subject.pipe).toHaveBeenCalled();
      expect(result).toEqual(mockObservable);
    });
  });
});
