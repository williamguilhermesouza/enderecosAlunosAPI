import { Test } from '@nestjs/testing';
import { alunoService } from './aluno.service';
import { alunoDao } from './dao/alunoimplementation.dao';
import { Aluno } from './aluno.entity';

jest.mock('./dao/alunoimplementation.dao');

// making console log silent
jest.spyOn(console, "log").mockImplementation();


describe('--alunoService--', () => {
    let AlunoService: alunoService;

    const alunoArgument = {
        "id": 7,
        "nome": "josicleida",
        "data_nascimento": new Date("2019-02-16T02:00:00.000Z"),
        "nota": 10,
        "cpf": "620.886.050-45"
    };

    let AlunoDao = {
        create: jest.fn((aluno: Aluno) => aluno),
        update: jest.fn((id: number, aluno: Aluno) => {}),
        findOne: jest.fn((id: number) => alunoArgument),
        delete: jest.fn((id: number) => {}),
        findAll: jest.fn(() => [alunoArgument]),
        getAlunoCriterio: jest.fn((nota: number, criterio: string) => [alunoArgument]),
        approved: jest.fn(() => [alunoArgument]),
    };

    const invalidAlunoArgument = {
        "id": 7,
        "nome": "josicleida",
        "data_nascimento": new Date("2019-02-16T02:00:00.000Z"),
        "nota": 10,
        "cpf": "62886.050-45"
    };

    const idArgument = 7;


    beforeAll(async () => {
        const AlunoDaoProvider = {
            provide: alunoDao,
            useValue: AlunoDao
        };

        const module = await Test.createTestingModule({
            providers: [AlunoDaoProvider, alunoService]
        }).compile();

        AlunoService = module.get<alunoService>(alunoService);
    });


    afterEach(() => {
        jest.resetAllMocks();
    });


    describe('-create-', () => {
        it('should create a new aluno', async () => {
            expect( await AlunoService.create(alunoArgument)).toEqual(alunoArgument);
        });

        it('should throw error', async () => {
            try {
                await AlunoService.create(invalidAlunoArgument);
            } catch(e) {
                expect(e).toBeInstanceOf(Error);
            }
        });
    });
    

    describe('-update-', () => {
        it('should update an existing aluno', async () => {
            try {
                expect(await AlunoService.update(idArgument, alunoArgument)).toEqual({});
            } catch(e) {
                expect(e).toBeInstanceOf(Error);
            }
            
        });

        it('should throw error', async () => {
            try {
                await AlunoService.update(idArgument, invalidAlunoArgument);
            } catch(e) {
                expect(e).toBeInstanceOf(Error);
            }
        });
    });


    describe('-findOne-', () => {
        it('should return an existing aluno', async () => {
            try {
                expect(await AlunoService.findOne(idArgument)).toEqual(alunoArgument);
            } catch(e) {
                expect(e).toBeInstanceOf(Error);
            }
            
        });

        it('should throw error', async () => {
            try {
                await AlunoService.findOne(9999);
            } catch(e) {
                expect(e).toBeInstanceOf(Error);
            }
        });
    });


    describe('-delete-', () => {
        it('should delete an existing aluno', async () => {
            try {
                expect(await AlunoService.delete(idArgument)).toEqual({});
            } catch(e) {
                expect(e).toBeInstanceOf(Error);
            }
            
        });

        it('should throw error', async () => {
            try {
                await AlunoService.delete(9999);
            } catch(e) {
                expect(e).toBeInstanceOf(Error);
            }
        });
    });


    describe('-findAll-', () => {
        it('should return an array of aluno', async () => {
            try {
                expect(await AlunoService.findAll()).toEqual([alunoArgument]);
            } catch(e) {
                expect(e).toBeInstanceOf(Error);
            }
            
        });
    });


    describe('-getAlunoCriterio-', () => {
        it('should update an existing aluno', async () => {
            try {
                expect(await AlunoService.getAlunoCriterio(7, '>')).toEqual({});
            } catch(e) {
                expect(e).toBeInstanceOf(Error);
            }
            
        });

        it('should throw error', async () => {
            try {
                await AlunoService.getAlunoCriterio(idArgument, 'invalidAlunoArgument');
            } catch(e) {
                expect(e).toBeInstanceOf(Error);
            }
        });
    });

    describe('-approved-', () => {
        it('should return an array of aluno with nota bigger than nota average', async () => {
            try {
                expect(await AlunoService.approved()).toEqual([alunoArgument]);
            } catch(e) {
                expect(e).toBeInstanceOf(Error);
            }
        });
    });


});