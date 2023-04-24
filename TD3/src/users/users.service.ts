import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private dataSource: Repository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        return await this.dataSource.find();
    }

    async findOne(id: number): Promise<User | null> {
        return await this.dataSource.findOneBy({ id });
    }

    async deleteUser(id: number): Promise<any> {
        const userToDelete = await this.dataSource.findOneBy({ id });
        // Si l'élément avec l'id donné n'est pas trouvé, renvoie une erreur NotFoundException
        if (!userToDelete)
            return new NotFoundException('did you find this user 🥶');
        await this.dataSource.delete(id);
        return { deletedUsers: 1, nbUsers: await this.dataSource.count() };
    }

    async createUser(user: User): Promise<any> {
        await this.dataSource.insert(user);
    }

    async patchUser(id: number, user: User) {
        const userToUpdate = await this.dataSource.findOneBy({ id });
        // Si l'élément avec l'id donné n'est pas trouvé, renvoie une erreur NotFoundException
        if (!userToUpdate)
            return new NotFoundException('did you find this user 🥶');
        // Mettre à jour une seule propriété
        if (user.first_name) userToUpdate.first_name = user.first_name;
        if (user.last_name) userToUpdate.last_name = user.last_name;
        if (user.email) userToUpdate.email = user.email;
        if (user.password) userToUpdate.password = user.password;
        if (user.phone) userToUpdate.phone = user.phone;
        if (user.username) userToUpdate.username = user.username;
        if (user.pfp_url) userToUpdate.pfp_url = user.pfp_url;

        await this.dataSource.save(userToUpdate)
        return { updateUsers: 1, user: userToUpdate };
    }


    async putUser(id: number, user: User) {
        const userToUpdate = await this.dataSource.findOneBy({ id });
        // Si l'élément avec l'id donné n'est pas trouvé, renvoie une erreur NotFoundException
        if (!userToUpdate)
            return new NotFoundException('did you find this user 🥶');
        // Mettre à jour une seule propriété
        userToUpdate.first_name = user.first_name
        userToUpdate.last_name = user.last_name
        userToUpdate.email = user.email
        userToUpdate.password = user.password
        userToUpdate.phone = user.phone
        userToUpdate.username = user.username
        userToUpdate.pfp_url = user.pfp_url
        await this.dataSource.save(userToUpdate)
        return { updateUsers: 1, user: userToUpdate };
    }
}
