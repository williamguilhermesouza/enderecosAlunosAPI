import { Test } from '@nestjs/testing';
import { enderecoDaoModel } from './enderecomodel.dao';
import { enderecoDao } from './enderecoimplementation.dao';

describe('enderecoDAO', () => {
    let EnderecoDao: enderecoDao;
    let EnderecoDaoModel: enderecoDaoModel;
    
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers:  [enderecoDaoModel, enderecoDao]
        }).compile();

        EnderecoDaoModel = module.get<enderecoDaoModel>(enderecoDaoModel);
        EnderecoDao = module.get<enderecoDao>(enderecoDao);

    });

    describe('find', async () => {
        it('should return all enderecos', () => {
            let resp = EnderecoDao.find();
            expect(resp).toBeCalled(); 
        });
    });
});