import { Test, TestingModule } from '@nestjs/testing';
import { MapsController } from './maps.controller';
import { MapsService } from './maps.service';

describe('MapsController', () => {
  let controller: MapsController;
  let mapsService: MapsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MapsController],
      providers: [
        {
          provide: MapsService,
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

    controller = module.get<MapsController>(MapsController);
    mapsService = module.get<MapsService>(MapsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call mapsService.create with createMapDto', () => {
      const createMapDto = { url: 'http://example.com', description: 'Test map' };
      const mockResult = { success: true, data: { id: '1', ...createMapDto } };
      jest.spyOn(mapsService, 'create').mockReturnValue(mockResult);

      const result = controller.create(createMapDto);

      expect(mapsService.create).toHaveBeenCalledWith(createMapDto);
      expect(result).toEqual(mockResult);
    });
  });

  describe('findAll', () => {
    it('should call mapsService.findAll', () => {
      const mockResult = { success: true, data: [] };
      jest.spyOn(mapsService, 'findAll').mockReturnValue(mockResult);

      const result = controller.findAll();

      expect(mapsService.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockResult);
    });
  });

  describe('findOne', () => {
    it('should call mapsService.findOne with id', () => {
      const id = '1';
      const mockResult = { success: true, data: { id, url: 'http://example.com' } };
      jest.spyOn(mapsService, 'findOne').mockReturnValue(mockResult);

      const result = controller.findOne(id);

      expect(mapsService.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockResult);
    });
  });

  describe('update', () => {
    it('should call mapsService.update with id and updateMapDto', () => {
      const id = '1';
      const updateMapDto = { description: 'Updated description' };
      const mockResult = { success: true, data: { id, description: 'Updated description' } };
      jest.spyOn(mapsService, 'update').mockReturnValue(mockResult);

      const result = controller.update(id, updateMapDto);

      expect(mapsService.update).toHaveBeenCalledWith(id, updateMapDto);
      expect(result).toEqual(mockResult);
    });
  });

  describe('remove', () => {
    it('should call mapsService.remove with id', () => {
      const id = '1';
      const mockResult = { success: true, message: 'Map deleted successfully' };
      jest.spyOn(mapsService, 'remove').mockReturnValue(mockResult);

      const result = controller.remove(id);

      expect(mapsService.remove).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockResult);
    });
  });
});
