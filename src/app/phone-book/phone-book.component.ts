import { Component, OnInit, ViewChild, TemplateRef  } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ServicesComponent } from '../shared/services/services.component';
import {User} from '../phone-book/user';
import { IUser} from '../phone-book/user.inteface';


@Component({
  selector: 'app-phone-book',
  templateUrl: './phone-book.component.html',
  styleUrls: ['./phone-book.component.scss']
})


export class PhoneBookComponent implements OnInit {

  firstName:string;
  lastName: string;
  number: string;
  isAdd = true;
  task : string;
  isEdit = false;
  editId: number;
  modalRef: BsModalRef;
  usersArray: Array<IUser> = [];
  displayedColumns: string[] = ['name', 'surname', 'phone', 'edit', 'delete'];
  dataSource = new MatTableDataSource(this.usersArray);
  searchName: string = '';

  

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  
  constructor(private modalService: BsModalService,
    private contactsService: ServicesComponent) {
   }

  ngOnInit(): void {
    this.getContactsFromService();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  openModal(modal: TemplateRef<any>, user?: IUser) {
    this.modalRef = this.modalService.show(modal);
    if(user) {
      this.editId = user.id;
      this.firstName = user.name;
      this.lastName = user.surname;
      this.number = user.phone;
      this.isEdit = true;
    }
  }

  disabled: boolean = false;

getContactsFromService(): void{
  this.contactsService.getContacts().subscribe(data => {
    this.usersArray = data;
    this.dataSource = new MatTableDataSource(this.usersArray);
    this.dataSource.sort = this.sort;
  })
}


addContact(): void{
  let user: IUser = new User(1, this.firstName, this.lastName, this.number);
  if(!this.isEdit) {
    if(this.usersArray.length > 0) {
      user.id = this.usersArray.slice(-1)[0].id + 1;
    }
   this.contactsService.addContact(user).subscribe( data => {
     this.getContactsFromService();
     this.modalRef.hide();
    })
  }

  else{
    user.id = this.editId;
    this.contactsService.updateContact(user).subscribe( () => {
    this.getContactsFromService();
    this.modalRef.hide();
    this.firstName = '';
    this.lastName = '';
    this.number = '';
    })
  }
}

deleteContact(user: IUser): void{
  this.contactsService.deleteContact(user).subscribe(() => {
    this.getContactsFromService();
  })
}

}



