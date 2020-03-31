import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { alunoController } from '../alunos/aluno.controller';
import { alunoService } from '../alunos/aluno.service';
import { alunoDao } from '../alunos/dao/alunoimplementation.dao';
import { Aluno } from '../alunos/aluno.entity';

jest.mock('../alunos/dao/alunoimplementation.dao');

// should be improved using bad ending test cases
describe('--Aluno--', () => {
    let app: INestApplication;

    let AlunoService = {
        create: jest.fn((aluno: Aluno) => 'ok'),
        update: jest.fn((id: number, aluno: Aluno) => 'ok'),
        findOne: jest.fn((id: number) => 'ok'),
        delete: jest.fn((id: number) => 'ok'),
        findAll: jest.fn(() => 'ok'),
        getAlunoCriterio: jest.fn((nota: number, criterio: string) => 'ok'),
        approved: jest.fn(() => 'ok'),
    };

    const alunoArgument = {
        "id": 7,
        "nome": "josicleida",
        "data_nascimento": new Date("2019-02-16T02:00:00.000Z"),
        "nota": 10,
        "cpf": "620.886.050-45"
    };

    const idArgument = 1;

    beforeAll(async () => {
        const AlunoServiceProvider = {
            provide: alunoService,
            useValue: AlunoService
        };

        const module = await Test.createTestingModule({
            providers: [AlunoServiceProvider, alunoDao],
            controllers: [alunoController],
        
        }).compile();

        app = module.createNestApplication();
        await app.init();

        
    });

    it('should create an aluno', () => {
        return request(app.getHttpServer())
            .post('/aluno')
            .send(alunoArgument)
            .expect(201)
            .expect(AlunoService.create(alunoArgument));
    });

    it('should update an aluno', () => {
        return request(app.getHttpServer())
            .put(`/aluno/${idArgument}`)
            .send(alunoArgument)
            .expect(200)
            .expect(AlunoService.update(idArgument, alunoArgument));
    });



    it('should find an aluno with the id', () => {
        return request(app.getHttpServer())
            .get(`/aluno/${idArgument}`)
            .expect(200)
            .expect(AlunoService.findOne(idArgument));
    });

    it('should delete an aluno with the id', () => {
        return request(app.getHttpServer())
            .delete(`/aluno/${idArgument}`)
            .expect(200)
            .expect(AlunoService.delete(idArgument));
    });

    
    it('should return all aluno', () => {
        return request(app.getHttpServer())
            .get('/aluno')
            .expect(200)
            .expect(AlunoService.findAll());
    });

    it('should return aluno matching criterio', () => {
        return request(app.getHttpServer())
            .get('/aluno/7/criterio/>')
            .expect(200)
            .expect(AlunoService.getAlunoCriterio(7, '>'));
    });

    it('should return aluno with average nota bigger than nota argument', () => {
        return request(app.getHttpServer())
            .get('/aluno/media')
            .expect(200)
            .expect(AlunoService.approved());
    });

    
    afterAll(async () => {
        await app.close();
    });
    
});