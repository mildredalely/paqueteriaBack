import { Test, TestingModule } from '@nestjs/testing';
import { MercanciaController } from './mercancia.controller';
import { MercanciaService } from './mercancia.service';

describe('MercanciaController', () => {
  let controller: MercanciaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MercanciaController],
      providers: [MercanciaService],
    }).compile();

    controller = module.get<MercanciaController>(MercanciaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
