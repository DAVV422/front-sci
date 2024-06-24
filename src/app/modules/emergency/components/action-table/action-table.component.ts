import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Form201 } from '../../interfaces/emergency.interface';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CurrencyPipe, NgFor } from '@angular/common';
import { ActionTableItemComponent } from '../action-table-item/action-table-item.component';
import { EmergencyService } from '../../services/emergency.service';

@Component({
    selector: '[action-table]',
    standalone: true,
    imports: [AngularSvgIconModule, CurrencyPipe, ActionTableItemComponent, NgFor],
    templateUrl: './action-table.component.html'
})

export class ActionTableComponent implements OnInit {
    @Input() auction = <Form201>{};
    public actions: Action[] = [];

  constructor(
    private router: Router,
    private emergencyServer: EmergencyService
  ) {}

  ngOnInit(): void {    
    this.emergencyServer.getActions(this.auction.id!).subscribe(
        (resp: any) => {
            console.log(resp);
            this.actions = resp.data;
        }
    );
  }

  show(id: string){
    this.router.navigate(['sci/emergencies/show', id]);
  }
}