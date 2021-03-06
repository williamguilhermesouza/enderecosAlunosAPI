import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { enderecoService } from './endereco.service';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { Endereco } from './endereco.entity';
import { ApiTags } from '@nestjs/swagger';


// enderecos decorator for routing in enderecos 
@ApiTags('enderecos')
@Controller()
export class enderecoController {
    // using constructor to use the service with the functions
    // into the controller
    constructor(private readonly enderecoService: enderecoService) {}


    // post method to create endereco
    @Post('enderecos')
    createEndereco(@Body() createEnderecoDto: CreateEnderecoDto): Promise<Endereco> {
        return this.enderecoService.create(createEnderecoDto);
    }

    // get method that returns a json with all enderecos
    @Get('enderecos')
    findAllEndereco(@Query('bairro') bairro?: string) {
        return this.enderecoService.findAll(bairro);
    }

    // returns a json with the quantity of enderecos of a given aluno
    // and the enderecos themselves
    @Get('aluno/:id/endereco')
    queryAlunoEndereco(@Param('id') id): Promise<{}> {
        return this.enderecoService.queryAlunoEndereco(id);
    }
}
