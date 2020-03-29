import { Test } from '@nestjs/testing';
import { alunoService } from './aluno.service';
import { alunoController } from './aluno.controller';
import { alunoDao } from './dao/alunoimplementation.dao';
import { Aluno } from './aluno.entity';

jest.mock('./dao/alunoimplementation.dao');

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
            const result: Aluno[] = [{
                id: 1,
                nome: 'william',
                data_nascimento: new Date('10-06-26 02:31:29,573'),
                cpf: '89508434040',
                nota: 10,
            },];
            
            jest.spyOn(AlunoService, 'create').mockImplementation(() => { 
                return new Promise((resolve, reject) => {result});
            });

            return AlunoController.findAllAlunos().then(data => expect(data).toBe(result));
            
        })
    })
});