import { Test } from '@nestjs/testing';
import { alunoService } from '../alunos/aluno.service';
import { alunoController } from '../alunos/aluno.controller';
import { alunoDao } from '../alunos/dao/alunoimplementation.dao';
import { Aluno } from '../alunos/aluno.entity';

jest.mock('../alunos/dao/alunoimplementation.dao');

let alunoDaoMock = () => {
    create: jest.fn((aluno: Aluno) => aluno);
};

describe('--Aluno--', () => {
    let AlunoController: alunoController;
    let AlunoService: alunoService;
    let AlunoDao: alunoDao;

    beforeAll(async () => {
        const alunoDaoProvider = {
            provide: alunoDao,
            useFactory: alunoDaoMock,
        }

        const module = await Test.createTestingModule({
            providers: [alunoController, alunoService, alunoDaoProvider],
        }).compile();

        AlunoService = module.get<alunoService>(alunoService);
        AlunoController = module.get<alunoController>(alunoController);
        AlunoDao = module.get<alunoDao>(alunoDao);
    });

    it('Service create', async () => {
        const alunoArgument = {
            "id": 7,
            "nome": "josicleida",
            "data_nascimento": new Date("2019-02-16T02:00:00.000Z"),
            "nota": 10,
            "cpf": "620.886.050-45"
        };

        AlunoDao.create = jest.fn().mockResolvedValue(alunoArgument);
        
        const response = await AlunoService.create(alunoArgument);

        expect(response).toEqual(alunoArgument);
    });
    
});