import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Form201 } from '../../interfaces/emergency.interface';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CurrencyPipe, NgFor } from '@angular/common';
import { EmergencyService } from '../../services/emergency.service';
import { Resource } from 'src/app/modules/equipment/interfaces/equipment.interface';
import { ResourceTableItemComponent } from '../resource-table-item/resource-table-item.component';

@Component({
    selector: '[resource-table]',
    standalone: true,
    imports: [AngularSvgIconModule, CurrencyPipe, ResourceTableItemComponent, NgFor],
    templateUrl: './resource-table.component.html'
})

export class ResourceTableComponent implements OnInit {
    @Input() auctions : Resource[] = [];    

  constructor(
    private router: Router,
    private emergencyServer: EmergencyService
  ) {}

  ngOnInit(): void {    
   
  }

  show(id: string){
    this.router.navigate(['sci/emergencies/show', id]);
  }
}