import { Test } from '@nestjs/testing';
import { enderecoService } from './endereco.service';
import { enderecoController } from './endereco.controller';

describe('alunoController', () => {
    let EnderecoController: enderecoController;
    let EnderecoService: enderecoService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [alunoController],
            providers: [enderecoService],
          }).compile();

    EnderecoService = module.get<enderecoService>(enderecoService);
    EnderecoController = module.get<enderecoController>(enderecoController);

    });

    describe('findAllAlunos', () => {
        it('should return all alunos', async () => {
            
        })
    })
});