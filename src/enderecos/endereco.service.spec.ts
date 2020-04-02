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
            expect(await EnderecoService.create(enderecoArgument)).toEqual(enderecoArgument);
        });
    });

    describe('-findAll-', () => {
        it('should return all endereco without filter', async () => {
            expect(EnderecoService.findAll()).resolves.toEqual([enderecoArgument]);
        });

        it('should return endereco matching bairro filter', async () => {
            expect(EnderecoService.findAll('fonseca')).resolves.toEqual([enderecoArgument]);
        });
    });

    describe('-queryAlunoEndereco-', () => {
        it('should return all enderecos from aluno with matching id', async () => {
            expect(EnderecoService.queryAlunoEndereco(idArgument)).resolves.toEqual({});
        });
    });
    


});