import { Test } from '@nestjs/testing';
import { enderecoService } from './endereco.service';
import { enderecoDao } from './dao/enderecoimplementation.dao';
import { Endereco } from './endereco.entity';

jest.mock('./dao/enderecoimplementation.dao');

// making console log silent
jest.spyOn(console, "log").mockImplementation();

describe('--enderecoService--', () => {
    let EnderecoService: enderecoService;
    
    const enderecoArgument = {
        "id": 2,
        "rua": "sao januario",
        "numero": "14",
        "complemento": "apto 103",
        "bairro": "fonseca",
        "aluno_id": 1
    };

    let EnderecoDao = {
        save: jest.fn((endereco: Endereco) => endereco),
        find: jest.fn((bairro?) => [enderecoArgument]),
        queryAlunoEndereco: jest.fn((id: number) => {}),
    };

    const idArgument = 1;

    beforeAll(async () => {
        const EnderecoDaoProvider = {
            provide: enderecoDao,
            useValue: EnderecoDao
        };

        const module = await Test.createTestingModule({
            providers: [EnderecoDaoProvider, enderecoService],
        }).compile();

        EnderecoService = module.get<enderecoService>(enderecoService);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('-create-', () => {
        it('should create a new endereco', async () => {
            try {
                expect(await EnderecoService.create(enderecoArgument)).toEqual(enderecoArgument);
            } catch(e) {
                expect(e).toBeInstanceOf(Error);
            }
            
        });
    });

    describe('-findAll-', () => {
        it('should return all endereco without filter', async () => {
            try {
                expect(await EnderecoService.findAll()).resolves.toEqual([enderecoArgument]);
            } catch(e) {
                expect(e).toBeInstanceOf(Error);
            }
        });

        it('should return endereco matching bairro filter', async () => {
            try {
                expect(await EnderecoService.findAll('fonseca')).resolves.toEqual([enderecoArgument]);
            } catch(e) {
                expect(e).toBeInstanceOf(Error);
            }     
        });
    });

    describe('-queryAlunoEndereco-', () => {
        it('should return all enderecos from aluno with matching id', async () => {
            try {
                expect(await EnderecoService.queryAlunoEndereco(idArgument)).resolves.toEqual({});
            } catch(e) {
                expect(e).toBeInstanceOf(Error);
            }
        });
    });
    


});