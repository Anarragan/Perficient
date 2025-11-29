import { Test, TestingModule } from '@nestjs/testing';
import { StorageResourcesService } from './storage_resources.service';

describe('StorageResourcesService', () => {
  let service: StorageResourcesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StorageResourcesService],
    }).compile();

    service = module.get<StorageResourcesService>(StorageResourcesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
