import { Test, TestingModule } from '@nestjs/testing';
import { MercanciaService } from './mercancia.service';

describe('MercanciaService', () => {
  let service: MercanciaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MercanciaService],
    }).compile();

    service = module.get<MercanciaService>(MercanciaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
