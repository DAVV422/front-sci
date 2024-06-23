import { Component, Input, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Emergency } from '../../interfaces/emergency.interface';
import { Router } from '@angular/router';

@Component({
    selector: '[emergency-table-item]',
    templateUrl: './emergency-table-item.component.html',
    standalone: true,
    imports: [AngularSvgIconModule, CurrencyPipe],
})
export class EmergencyTableItemComponent implements OnInit {  
  @Input() auction = <Emergency>{};

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {}

  show(id: string){
    this.router.navigate(['sci/emergencies/show', id]);
  }
}
