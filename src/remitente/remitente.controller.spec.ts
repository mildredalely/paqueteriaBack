import { Test, TestingModule } from '@nestjs/testing';
import { RemitenteController } from './remitente.controller';
import { RemitenteService } from './remitente.service';

describe('RemitenteController', () => {
  let controller: RemitenteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RemitenteController],
      providers: [RemitenteService],
    }).compile();

    controller = module.get<RemitenteController>(RemitenteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
