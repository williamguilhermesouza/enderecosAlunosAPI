import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { enderecoController } from '../enderecos/endereco.controller';
import { enderecoService } from '../enderecos/endereco.service';
import { enderecoDao } from '../enderecos/dao/enderecoimplementation.dao';
import { Endereco } from '../enderecos/endereco.entity';

jest.mock('../enderecos/dao/enderecoimplementation.dao');


describe('--Endereco--', () => {
    let app: INestApplication;

    let EnderecoService = {
        create: jest.fn((endereco: Endereco) => 'ok'),
        findAll: jest.fn((bairro?) => 'ok'),
        queryAlunoEndereco: jest.fn(id => 'ok'),
    };

    const enderecoArgument = {
        "id": 2,
        "rua": "sao januario",
        "numero": "14",
        "complemento": "apto 103",
        "bairro": "fonseca",
        "aluno_id": 1
    };

    beforeAll(async () => {
        const EnderecoServiceProvider = {
            provide: enderecoService,
            useValue: EnderecoService,
        };

        const module = await Test.createTestingModule({
            providers: [EnderecoServiceProvider, enderecoDao],
            controllers: [enderecoController],
        }).compile();

        app = module.createNestApplication();
        await app.init();

    });
    
    it('should create an endereco', () => {
        return request(app.getHttpServer())
            .post('/enderecos')
            .send(enderecoArgument)
            .expect(201)
            .expect(EnderecoService.create(enderecoArgument));
    });

    it('should return all enderecos', () => {
        return request(app.getHttpServer())
            .get('/enderecos')
            .expect(200)
            .expect(EnderecoService.findAll());
    });

    it('should return all enderecos with given bairro', () => {
        return request(app.getHttpServer())
            .get('/enderecos?bairro=fonseca')
            .expect(200)
            .expect(EnderecoService.findAll('fonseca'));
    });


    it('should create an endereco', () => {
        return request(app.getHttpServer())
            .get('/aluno/1/endereco')
            .expect(200)
            .expect(EnderecoService.queryAlunoEndereco(1));
    });


    afterAll(async () => {
        await app.close();
    });


});