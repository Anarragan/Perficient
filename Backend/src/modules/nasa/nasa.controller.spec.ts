import { Test, TestingModule } from '@nestjs/testing';
import { NasaController } from './nasa.controller';
import { NasaService } from './nasa.service';

describe('NasaController', () => {
  let controller: NasaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NasaController],
      providers: [NasaService],
    }).compile();

    controller = module.get<NasaController>(NasaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});