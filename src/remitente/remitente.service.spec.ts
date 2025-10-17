import { Test, TestingModule } from '@nestjs/testing';
import { RemitenteService } from './remitente.service';

describe('RemitenteService', () => {
  let service: RemitenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RemitenteService],
    }).compile();

    service = module.get<RemitenteService>(RemitenteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
