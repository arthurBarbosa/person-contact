export class Person {
    id: number;
    name: string;
    email: string;
    favorite: boolean;
    image: any;

    constructor(name: string, email: string){
        this.name = name;
        this.email = email;
    }
}
