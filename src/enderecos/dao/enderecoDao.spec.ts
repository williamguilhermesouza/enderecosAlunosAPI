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
        return {'total': 1,
        'enderecos': {
            rua: 'riodades',
            numero: '143',
            complemento: 'apt 202',
            bairro: 'fonseca',
        },
    };
;
    }
}

describe('enderecoDAO', () => {
    let EnderecoDao: enderecoDao;
    let EnderecoDaoModel: enderecoDaoModel;

    
    beforeEach(async () => {
        const enderecoDaoModelProvider = {
            provide: enderecoDaoModel,
            useClass: EnderecoDaoModelMock,
        }

        const module = await Test.createTestingModule({
            providers:  [enderecoDaoModelProvider, enderecoDao]
        }).compile();

        EnderecoDaoModel = module.get<enderecoDaoModel>(enderecoDaoModel);
        EnderecoDao = module.get<enderecoDao>(enderecoDao);

    });

    beforeAll(() => {
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

        const enderecoQuery = {
            'total': 1,
            'enderecos': {
                rua: 'riodades',
                numero: '143',
                complemento: 'apt 202',
                bairro: 'fonseca',
            },
        };
    });

    describe('find without params', () => {
        it('should return all enderecos', async () => {
            const result = await EnderecoDao.find();
            expect(this.enderecoArray).toEqual(result);
        });
    });
});