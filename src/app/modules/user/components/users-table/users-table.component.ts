import { Component, OnInit } from '@angular/core';
import { Nft } from '../../../dashboard/models/nft';
import { NgFor } from '@angular/common';
import { UsersTableItemComponent } from '../users-table-item/users-table-item.component';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

@Component({
    selector: '[users-table]',
    templateUrl: './users-table.component.html',
    standalone: true,
    imports: [NgFor, UsersTableItemComponent],
})
export class UserTableComponent implements OnInit {  
  public users: User[] = [];

  constructor(private router: Router, private userService: UserService) {    
    this.getUsers();
  }

  ngOnInit(): void {
    
  }

  newUser(): void {
    this.router.navigate(['/auth/sign-up']);
  }

  async getUsers(): Promise<void>{
    this.userService.getAll().subscribe((resp: any) =>{
      this.users = resp.data;
      console.log(this.users);
    })
  }
}
