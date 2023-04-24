import {
    Controller,
    Get,
    Post,
    Delete,
    Put,
    Patch,
    Query,
    Param,
    Body,
    HttpCode,
    Header,
    ParseIntPipe,
    UsePipes
} from '@nestjs/common';
import { UsersService } from "./users.service"
import { User } from './user.entity';


@Controller('users')
export class UsersController {

    constructor(private service: UsersService){ }

    @Get()
    getAllUsers() {
        return this.service.findAll();
    }

    @Get(':id')
    getOneUser(@Param('id') id: number) {
        return this.service.findOne(id);
    }

    @Post()
    addUser(@Body() user: User) {
        return this.service.createUser(user);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: number) {
        return this.service.deleteUser(id);
    }

    @Patch(':id')
    patchUser(@Param('id') id: number, @Body() user: User) {
        return this.service.patchUser(id, user);
    }

    @Put(':id')
    putUser(@Param('id') id: number, @Body() user: User) {
        return this.service.putUser(id, user);
    }

}
