import { Test, TestingModule } from '@nestjs/testing';
import { StorageResourcesController } from './storage_resources.controller';
import { StorageResourcesService } from './storage_resources.service';

describe('StorageResourcesController', () => {
  let controller: StorageResourcesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StorageResourcesController],
      providers: [StorageResourcesService],
    }).compile();

    controller = module.get<StorageResourcesController>(StorageResourcesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
