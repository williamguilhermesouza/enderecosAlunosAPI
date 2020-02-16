import { Controller, Get, Post, Body } from '@nestjs/common';
import { enderecoService } from './endereco.service';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { Endereco } from './endereco.entity';

// enderecos decorator for routing in enderecos 
@Controller('enderecos')
export class enderecoController {
    // using constructor to use the service with the functions
    // into the controller
    constructor(private readonly enderecoService: enderecoService) {}


    // post method to create endereco
    @Post()
    createEndereco(@Body() createEnderecoDto: CreateEnderecoDto): Promise<Endereco> {
        return this.enderecoService.create(createEnderecoDto);
    }

    // get method that returns a json with all enderecos
    @Get()
    findAllEndereco() {
        return this.enderecoService.findAll();
    }
}
