import { alunoDao } from './alunoimplementation.dao';


// test block for alunoDao Methods
describe('alunoDao', () => {
    // creating objects for the tests
    let AlunoDao: alunoDao;
    let AlunoRepositoryMock;
    let newAluno;
    let existingAluno;

    // mock object to DB repository
    AlunoRepositoryMock = {
        save: jest.fn((aluno) => {return aluno}),
        update: jest.fn(),
        delete: jest.fn(),
        find: jest.fn((aluno) => {return aluno}),
    };

    // instantiating a new test object
    beforeAll(() => {
        newAluno = {
                "id": 7,
                "nome": "josicleida",
                "data_nascimento": "2019-02-16T02:00:00.000Z",
                "nota": 10,
                "cpf": "620.886.050-45"
            }

        existingAluno = {
            "id": 2,
            "nome": "joao",
            "data_nascimento": "2019-02-16T02:00:00.000Z",
            "nota": 1,
            "cpf": "123.215.213-43"
          };
    }) 

    beforeEach(async () => {
        AlunoDao = new alunoDao(AlunoRepositoryMock);
    })

    describe('create', () => {
        it('verify if repository save was not called yet', () => {
            expect(AlunoRepositoryMock.save).not.toHaveBeenCalled();
        })

        it('should save aluno to DB', async () => {
            await expect(AlunoDao.create(newAluno)).resolves.toBe(newAluno);
        })

        it('should have called aluno repository save', () => {
            expect(AlunoRepositoryMock.save).toHaveBeenCalled();
        })

        
    })

    describe('update', () => {
        it('verify if repository update was not called yet', () => {
            expect(AlunoRepositoryMock.update).not.toHaveBeenCalled();
        })

        it('should update aluno to DB', async () => {
            await expect(AlunoDao.update(1, existingAluno)).resolves.toStrictEqual({'msg': `Successfully updated aluno with id 1`});
        })

        it('should have called aluno repository update', () => {
            expect(AlunoRepositoryMock.save).toHaveBeenCalled();
        })        
    })

    describe('findOne', () => {
        it('verify if repository find was not called yet', () => {
            expect(AlunoRepositoryMock.find).not.toHaveBeenCalled();
        })
        it('should find aluno with given ID', async () => {
            AlunoDao.__findOne = jest.fn().mockImplementation(() => {return AlunoRepositoryMock.find(existingAluno)});
            await expect(AlunoDao.findOne(2)).resolves.toBe(existingAluno);
        })
        it('should have called aluno repository find', () => {
            expect(AlunoRepositoryMock.find).toHaveBeenCalled();
        })   
    })


    describe('delete', () => {
        it('verify if repository delete was not called yet', () => {
            expect(AlunoRepositoryMock.delete).not.toHaveBeenCalled();
        })

        it('should delete aluno with given ID', async () => {
            await expect(AlunoDao.delete(1)).resolves.toStrictEqual({'msg': `Successfully deleted aluno with id 1`});
        })

        it('should have called aluno repository delete', () => {
            expect(AlunoRepositoryMock.delete).toHaveBeenCalled();
        })        
    })

    describe('findAll', () => {
        it('should return all alunos', async () => {
            AlunoDao.__find = jest.fn().mockImplementation(() => {return AlunoRepositoryMock.find(existingAluno)});
            await expect(AlunoDao.findAll()).resolves.toBe(existingAluno);
        }) 
    })

    describe('getAlunoCriterio', () => {
        it('should find aluno matching criterio', async () => {
            AlunoDao.__getAlunoCriterio = jest.fn().mockImplementation(() => {return AlunoRepositoryMock.find(existingAluno)});
            await expect(AlunoDao.getAlunoCriterio(2, '<')).resolves.toBe(existingAluno);
        })  
    })

    describe('approved', () => {
        it('should find aluno with nota bigger than average', async () => {
            AlunoDao.__approved = jest.fn().mockImplementation(() => {return AlunoRepositoryMock.find(existingAluno)});
            await expect(AlunoDao.approved()).resolves.toBe(existingAluno);
        })  
    })
});