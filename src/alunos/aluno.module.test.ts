import { Test } from '@nestjs/testing';
import { alunoService } from './aluno.service';
import { alunoController } from './aluno.controller';

describe('alunoController', () => {
    let AlunoController: alunoController;
    let AlunoService: alunoService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [alunoController],
            providers: [alunoService],
          }).compile();

    AlunoService = module.get<alunoService>(alunoService);
    AlunoController = module.get<alunoController>(alunoController);

    });

    describe('findAllAlunos', () => {
        it('should return all alunos', async () => {
            
        })
    })
});