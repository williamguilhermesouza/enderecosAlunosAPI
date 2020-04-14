import { Endereco } from './endereco.entity';


export default interface enderecoServiceInterface {
    create(endereco: Endereco): Promise<Endereco>;
    findAll(bairro?): Promise<Endereco[]>;
    queryAlunoEndereco(id: number): Promise<{}>;
};