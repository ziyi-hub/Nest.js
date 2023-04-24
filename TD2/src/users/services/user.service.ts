import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { data } from "../../data";
import { UserInterface } from "../interfaces/user.interface";

@Injectable()
export class UserService {
    private readonly users: UserInterface[] = []

    constructor(){
        this.getData();
    }

    create(user: UserInterface) : void {
        this.users.push(user);
    }

    findAll(): UserInterface[] {
        return this.users;
    }

    getData(): void {
        data.map((user: any) => this.create(user));
    }

    findUserById(idUser: number): UserInterface {
        if(this.users.find((user: UserInterface) =>  user.id == idUser ) == null){
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }else{
            return this.users.find((user: UserInterface) =>  user.id == idUser )
        }
        //return this.users.find((user: UserInterface) =>  { return user.id == idUser } )
    }

    setUser(params: UserInterface): UserInterface[] {
        this.create(params);
        return this.findAll();
    }

    deleteUser(idUser: number): UserInterface[] {
        let user = this.users.find((user: UserInterface) =>  user.id == idUser )
        if((!user == false) && (idUser >= 0)){
            return this.users.splice(idUser, 1)
        }else{
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }

    updateUser(idUser: number, body: UserInterface): UserInterface {
        let user = this.findUserById(idUser);
        user.id = body.id;
        user.nom = body.nom;
        user.prenom = body.prenom;
        user.email = body.email;
        return user;
    }
}
