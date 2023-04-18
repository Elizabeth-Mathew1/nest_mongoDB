import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ParamsTokenFactory } from '@nestjs/core/pipes';
import { create } from 'domain';
import { CoffeesService } from './coffees.service';
import { CreateDto } from './dto/create-dto/createcoffee-dto';
import { UpdateDto } from './dto/create-dto/updatecoffee-dto';

@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeesService: CoffeesService){}
    @Get('allcups')
    findAll()
    {
        return this.coffeesService.findAll();
    }
    @Get('mycup')
    findmyCoffee()
    {
        return ('Your cup of coffee!')
    }
    @Get(':id')
    findCoffeeId(@Param('id') id:string )
    {
       
        return this.coffeesService.findCoffee(id)
    }
    @Post()
    create(@Body() createcoffeesdto: CreateDto )
    {
        return this.coffeesService.addCoffee(createcoffeesdto)
    }
    @Patch(':id')
    update(@Param('id') id:string , @Body() updatecoffeedto: UpdateDto)
    {
        return this.coffeesService.updateCoffee(id,updatecoffeedto)
    }

    @Delete(':id')
    delete(@Param('id') cid:string)
    {
        return this.coffeesService.removeCoffee(cid)
    }

}