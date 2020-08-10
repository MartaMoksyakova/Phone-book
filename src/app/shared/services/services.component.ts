import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from './../../phone-book/user.inteface';
import { User } from './../../phone-book/user';


@Injectable({
  providedIn: 'root'
})
export class ServicesComponent {
  private contactArray: Array<IUser> = [];

  constructor(private http: HttpClient) { }


  getContacts(): Observable<Array<IUser>>{
    return this.http.get<Array<IUser>>(environment.url);
    }
  
  
  
  addContact(user: IUser): Observable<Array<IUser>>{
    return this.http.post<Array<IUser>>(environment.url, user)
  }
  
  deleteContact(user: IUser): Observable<Array<IUser>>{
    return this.http.delete<Array<IUser>>(environment.url + '/' + user.id)
  }
  
  updateContact(user: IUser): Observable<Array<IUser>>{
    return this.http.put<Array<IUser>>(environment.url + '/' + user.id, user)
  }
}
