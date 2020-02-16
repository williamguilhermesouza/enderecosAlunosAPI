import { Controller, Body, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { alunoService } from './aluno.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { Aluno } from './aluno.entity';

// using controller decorator to control the routes
@Controller('aluno')
export class alunoController {
    // using constructor to use the service with the functions
    // into the controller
    constructor(private readonly alunoService: alunoService) {}

    // route to create a new aluno
    @Post()
    createAluno(@Body() createAlunoDto: CreateAlunoDto): Promise<Aluno> {
        return this.alunoService.create(createAlunoDto);
    }

    // route to modify an existing aluno, or create a new if it
    // don't exist
    @Put(':id')
    updateAluno(@Body() updateAlunoDto: CreateAlunoDto, @Param('id') id): Promise<Aluno> {
        return this.alunoService.update(id, updateAlunoDto);
    }

    // route to return only the aluno with matching id
    @Get(':id')
    findOneAluno(@Param('id') id): Promise<Aluno> {
        return this.alunoService.findOne(id);
    }


    // route to delete an aluno from the database
    @Delete(':id')
    deleteAluno(@Param('id') id): Promise<Aluno> {
        return this.alunoService.delete(id);
    }

    // route to return a json of all alunos
    @Get()
    findAllAlunos() {
        return this.alunoService.findAll();
    }

    // returns all enderecos (addresses) of the aluno with given id
    @Get(':id/endereco')
    findEndereco(@Param('id') id): string {
        return `id: ${id}`;  
    }

    // returns all alunos with nota depending on the criterio,
    // the criterio may be bigger than (>) or less than (<)
    @Get('aluno/:nota/criterio/:criterio')
    getAlunoCriterio(@Param('nota') nota, @Param('criterio') criterio) {

    }

    // return the data of all alunos that have nota bigger than the 
    // average of all aluno notas
    @Get('aluno/media')
    getApproved() {

    }


}