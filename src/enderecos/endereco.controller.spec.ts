import { Test, TestingModule } from '@nestjs/testing';
import { enderecoController } from './endereco.controller';

describe('Enderecos Controller', () => {
  let controller: enderecoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [enderecoController],
    }).compile();

    controller = module.get<enderecoController>(enderecoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
