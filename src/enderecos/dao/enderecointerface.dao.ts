// interface to the dao of enderecos
import { Endereco } from '../endereco.entity';

export interface enderecoDaoInterface {
    save(endereco: Endereco): Promise<Endereco>;
    find(bairro?): Promise<Endereco[]>;
    queryAlunoEndereco(id: number): Promise<{}>;
}