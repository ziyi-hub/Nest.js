import { Controller, Get, Post, Delete, Put, Redirect, Query, Param, Body, HttpCode, Header } from '@nestjs/common';
import { UserService } from "../services/user.service"
import { UserInterface } from "../interfaces/user.interface";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get()
    returnAllUsers(): UserInterface[] {
        console.log(this.userService.findAll());
        return this.userService.findAll();
    }

    @Get('user/:id')
    returnOneUser(@Param() params): UserInterface {
        console.log(params.id)
        return this.userService.findUserById(params.id);
    }

    @Post('user/add')
    @HttpCode(201)
    @Header("Cache-Control", "none")
    addUser(@Body() body: UserInterface): UserInterface[] {
        return this.userService.setUser(body);
    }

    @Delete('user/:id')
    @HttpCode(202)
    @Header("Cache-Control", "none")
    deleteUser(@Param('id') id: number): UserInterface[] {
        return this.userService.deleteUser(id);
    }

    @Put('user/:id')
    updateUser(@Param() params, @Body() body: UserInterface): UserInterface {
        return this.userService.updateUser(params.id, body);
    }

    @Get('with-params')
    getUrlQueryParams(@Query() queryString: string): string{
        console.log(queryString)
        return queryString;
    }

    @Get('redirect')
    @Redirect('/user/redirected', 301)
    redirect(): void {
        console.log("Redirecting ...")
    }

    @Get('redirected')
    redirected(): string {
        return "We have been redirected!"
    }
}

