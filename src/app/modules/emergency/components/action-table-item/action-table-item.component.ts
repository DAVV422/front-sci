import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '../../interfaces/emergency.interface';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: '[action-table-item]',
    standalone: true,
    imports: [AngularSvgIconModule, CurrencyPipe],
    templateUrl: './action-table-item.component.html'
})

export class ActionTableItemComponent implements OnInit {
    @Input() auction = <Action>{};

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