import { alunoDao } from './alunoimplementation.dao';

// test block for alunoDao Methods
describe('alunoDao', () => {
    // creating objects for the tests
    let AlunoDao: alunoDao;
    let AlunoRepositoryMock;

    // mock object to DB repository
    AlunoRepositoryMock = {
        delete: jest.fn(),
    };

    // instantiating a new test object
    beforeAll(async () => {
        AlunoDao = new alunoDao(AlunoRepositoryMock);
    }) 



    describe('delete', () => {
        it('should delete aluno with given ID', async () => {
            // 'happy' outcome
            const resp = await AlunoDao.delete(1);
            expect(AlunoRepositoryMock.delete).toHaveBeenCalled();
            console.log(resp);
        })
    })
});