import { Test } from '@nestjs/testing';
import { enderecoDaoModel } from './enderecomodel.dao';
import { enderecoDao } from './enderecoimplementation.dao';
import { Endereco } from '../endereco.entity';

jest.mock('./enderecomodel.dao');

class EnderecoDaoModelMock {
    __save(endereco: Endereco) {
        return jest.fn((endereco) => endereco);
    }
    __find() {
        const result: Endereco[] = [{
            id: 1,
            rua: 'riodades',
            bairro: 'fonseca',
            numero: '143',
            complemento: 'apt 202',
            aluno_id: 1
        },];

        return result;
    }
    __filter(bairro) {
        const result: Endereco[] = [{
            id: 1,
            rua: 'riodades',
            bairro: bairro,
            numero: '143',
            complemento: 'apt 202',
            aluno_id: 1
        },];

        return result;
    }
    __queryAlunoEndereco(id: number) {
        const result: {} = {
            total: 1,
            enderecos: {
                rua: 'riodades',
                numero: '143',
                complemento: 'apt 202',
                bairro: 'fonseca',
            },
        };

        return new Promise((res,rej) => result);
    }
}

describe('enderecoDAO', () => {
    let EnderecoDao: enderecoDao;
    let EnderecoDaoModel: enderecoDaoModel;
    

    beforeAll(async () => {
        const enderecoDaoModelProvider = {
            provide: enderecoDaoModel,
            useClass: EnderecoDaoModelMock,
        }

        const module = await Test.createTestingModule({
            providers:  [enderecoDaoModelProvider, enderecoDao]
        }).compile();

        EnderecoDaoModel = module.get<enderecoDaoModel>(enderecoDaoModel);
        EnderecoDao = module.get<enderecoDao>(enderecoDao);

        const enderecoArray: Endereco[] = [{
            id: 1,
            rua: 'riodades',
            bairro: 'fonseca',
            numero: '143',
            complemento: 'apt 202',
            aluno_id: 1
        },];

        const endereco = {
            id: 1,
            rua: 'riodades',
            bairro: 'fonseca',
            numero: '143',
            complemento: 'apt 202',
            aluno_id: 1
        };

        
    });

    afterEach(() => {
        jest.resetAllMocks();
    }); 

    describe('save', () => {
        it('should save endereco to DB', async () => {
            const result = await EnderecoDao.save(this.endereco);
            expect(result).toEqual(this.endereco);
        });
    });

    describe('find without params', () => {
        it('should return all enderecos', async () => {
            const result = await EnderecoDao.find();
            expect(result).toEqual(this.enderecoArray);
        });
    });

    describe('find with params', () => {
        it('should return Array of enderecos', async () => {
            const result = await EnderecoDao.find('fonseca');
            expect(result).toEqual(this.enderecosArray);
        });
    });

    describe('queryAlunoEndereco', () => {
        const enderecoQuery = {
            total: 1,
            enderecos: {
                endereco: 'riodades 143 apt 202',
                bairro: 'fonseca',
            },
        };


        it('should return object with query results', async () => {
            EnderecoDao.__queryAlunoEndereco = jest.fn().mockResolvedValue({
                total: 1,
                enderecos: {
                    map: enderecos => { 
                        return {
                            endereco: 'riodades 143 apt 202',
                            bairro: 'fonseca',
                        }
                    },
                    rua: 'riodades',
                    numero: '143',
                    complemento: 'apt 202',
                    bairro: 'fonseca',
                },
            });
            const result = await EnderecoDao.queryAlunoEndereco(1);
            expect(await EnderecoDao.__queryAlunoEndereco(1)).toEqual(enderecoQuery);
            return; 
            
        });
    });
});