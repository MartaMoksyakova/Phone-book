import { IUser} from '..//phone-book/user.inteface';

export class User implements IUser{
 constructor(
    public id: number,
    public name: string,
    public surname: string,
    public phone: string
     ){}
}