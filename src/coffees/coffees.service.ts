import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Http2ServerRequest } from 'http2';
import { Model } from 'mongoose';
import { findIndex } from 'rxjs';
import { CreateDto } from './dto/create-dto/createcoffee-dto';
import { UpdateDto } from './dto/create-dto/updatecoffee-dto';
import { Coffee } from './entity/coffee.entity';

@Injectable()
export class CoffeesService 
{
    constructor(
        @InjectModel(Coffee.name) private readonly coffees: Model<Coffee>,
      ) {}
    

    findAll()
    {
        return this.coffees.find().exec();
    }
    async findCoffee(id: string){
        
        let item =await this.coffees.findOne({ _id: id }).exec()
        if(!item)
        throw new HttpException(`Coffee not #${id} found`, HttpStatus.NOT_FOUND)

        else   
            return item;
        
            
    }
    async updateCoffee(id: string, UpdateDetail:UpdateDto)
    {
        const existingCoffee = await this.coffees
      .findOneAndUpdate({ _id: id }, { $set: UpdateDetail }, { new: true })
      .exec();

      return existingCoffee;
    }
    addCoffee(createCoffeeDto: CreateDto) {
        const coffee = new this.coffees(createCoffeeDto);
        return coffee.save();
      }

    async removeCoffee(cid: string)
    {
        //const coffee = await this.coffees.findOne(cid);
        return await this.coffees.findByIdAndRemove({_id:cid})
    }
}
