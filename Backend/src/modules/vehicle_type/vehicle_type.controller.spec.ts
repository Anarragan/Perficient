import { Test, TestingModule } from '@nestjs/testing';
import { VehicleTypeController } from './vehicle_type.controller';
import { VehicleTypeService } from './vehicle_type.service';

describe('VehicleTypeController', () => {
  let controller: VehicleTypeController;
  let vehicleTypeService: VehicleTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleTypeController],
      providers: [
        {
          provide: VehicleTypeService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<VehicleTypeController>(VehicleTypeController);
    vehicleTypeService = module.get<VehicleTypeService>(VehicleTypeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call vehicleTypeService.create with createVehicleTypeDto', () => {
      const createVehicleTypeDto = { name: 'Type1' };
      const mockResult = 'This action adds a new vehicleType';
      jest.spyOn(vehicleTypeService, 'create').mockReturnValue(mockResult);

      const result = controller.create(createVehicleTypeDto);

      expect(vehicleTypeService.create).toHaveBeenCalledWith(createVehicleTypeDto);
      expect(result).toEqual(mockResult);
    });
  });

  describe('findAll', () => {
    it('should call vehicleTypeService.findAll', () => {
      const mockResult = `This action returns all vehicleType`;
      jest.spyOn(vehicleTypeService, 'findAll').mockReturnValue(mockResult);

      const result = controller.findAll();

      expect(vehicleTypeService.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockResult);
    });
  });

  describe('findOne', () => {
    it('should call vehicleTypeService.findOne with parsed id', () => {
      const id = '1';
      const mockResult = `This action returns a #1 vehicleType`;
      jest.spyOn(vehicleTypeService, 'findOne').mockReturnValue(mockResult);

      const result = controller.findOne(id);

      expect(vehicleTypeService.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockResult);
    });
  });

  describe('update', () => {
    it('should call vehicleTypeService.update with parsed id and updateVehicleTypeDto', () => {
      const id = '1';
      const updateVehicleTypeDto = { name: 'Updated' };
      const mockResult = `This action updates a #1 vehicleType`;
      jest.spyOn(vehicleTypeService, 'update').mockReturnValue(mockResult);

      const result = controller.update(id, updateVehicleTypeDto);

      expect(vehicleTypeService.update).toHaveBeenCalledWith(1, updateVehicleTypeDto);
      expect(result).toEqual(mockResult);
    });
  });

  describe('remove', () => {
    it('should call vehicleTypeService.remove with parsed id', () => {
      const id = '1';
      const mockResult = `This action removes a #1 vehicleType`;
      jest.spyOn(vehicleTypeService, 'remove').mockReturnValue(mockResult);

      const result = controller.remove(id);

      expect(vehicleTypeService.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockResult);
    });
  });
});
