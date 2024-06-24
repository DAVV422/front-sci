import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Attend } from '../../interfaces/emergency.interface';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: '[attend-table-item]',
    standalone: true,
    imports: [AngularSvgIconModule, CurrencyPipe],
    templateUrl: 'attend-table-item.component.html'
})

export class AttendTableItemComponent implements OnInit {
    @Input() auction = <Attend>{};

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.auction);
  }

  show(id: string){
    this.router.navigate(['sci/emergencies/show', id]);
  }
}