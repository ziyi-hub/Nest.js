import {UserInterface} from "../interfaces/user.interface";

export class Todo implements UserInterface {
    id: number;
    title: string;
    done: boolean;
    description: string
}
