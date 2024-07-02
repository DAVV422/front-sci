import { Component, Input, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
    selector: '[users-table-item]',
    templateUrl: './users-table-item.component.html',
    standalone: true,
    imports: [AngularSvgIconModule, CurrencyPipe],
})
export class UsersTableItemComponent implements OnInit {  
  @Input() auction = <User>{};

  constructor(
    private readonly router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  show(){
    this.router.navigate(['/sci/users/show', this.auction.id]);
  }

  confirmDelete(userId: string): void {
    const confirmed = confirm('¿Está seguro que quiere eliminar este equipo?');
    if (confirmed) {
      this.delete(userId);
    }
  }
  delete(id: string) {
    this.userService.delete(id).subscribe(() => {
      window.location.reload();
    });
  }
}
