import { Controller, Get } from '@nestjs/common';
import { alunoService } from './aluno.service';

@Controller('aluno')
export class alunoController {
    constructor(private readonly alunoService: alunoService) {}

    @Get('see')
    getAluno() {
        return this.alunoService.findAll();
    }

}