import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
//import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee, CoffeeSchema} from './entity/coffee.entity';
//import { Flavor } from './entity/flavor.entity';
//import { CoffeeRatingModule } from '../coffee-rating/coffee-rating.module';




@Module({
    controllers:[CoffeesController],
    providers:[CoffeesService,
    { 
      provide: 'COFFEE_BRANDS',
      useValue:['Starbucks','Kaapi']
    },
    
    ],
    imports:[
      MongooseModule.forFeature([{ 
      name: Coffee.name, 
      schema: CoffeeSchema }])
    ],
    exports:[CoffeesService]
})
export class CoffeesModule {}