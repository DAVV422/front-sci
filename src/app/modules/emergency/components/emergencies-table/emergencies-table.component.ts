import { Component, OnInit } from '@angular/core';
import { Nft } from '../../../dashboard/models/nft';
import { NgFor } from '@angular/common';
import { EmergencyTableItemComponent } from '../emergency-table-item/emergency-table-item.component';
import { Router } from '@angular/router';
import { Emergency } from '../../interfaces/emergency.interface';
import { EmergencyService } from '../../services/emergency.service';

@Component({
    selector: '[emergencies-table]',
    templateUrl: './emergencies-table.component.html',
    standalone: true,
    imports: [NgFor, EmergencyTableItemComponent],
})
export class EmergenciesTableComponent implements OnInit {
  public emergencies: Emergency[] = [];

  constructor(private router: Router, 
    private emergencyService: EmergencyService
  ) {}

  ngOnInit(): void {
    this.getEmergencies();
  }

  newUser(): void {
    this.router.navigate(['/sci/emergencies/new']);
  }

  getEmergencies(){
    this.emergencyService.getAll().subscribe((resp: any) => {
      this.emergencies = resp.data;
    })
  }
}
