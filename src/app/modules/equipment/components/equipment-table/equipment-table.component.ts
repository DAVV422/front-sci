import { Component, OnInit } from '@angular/core';
import { Equipment } from '../../interfaces/equipment.interface';
import { Router } from '@angular/router';
import { EquipmentService } from '../../services/equipment.service';
import { EquipmentTableItemComponent } from '../equipment-table-item/equipment-table-item.component';
import { NgFor } from '@angular/common';

@Component({
  selector: '[equipment-table]',
  standalone: true,
  imports: [NgFor, EquipmentTableItemComponent],
  templateUrl: './equipment-table.component.html',
  styleUrl: './equipment-table.component.scss'
})
export class EquipmentTableComponent implements OnInit {
  public equipments: Equipment[] = [];

  constructor(
    private router: Router,
    private equipmentService: EquipmentService
  ) {
    this.getEquipments();
  }

  ngOnInit(): void {
    // this.getEquipments();
  }

  async getEquipments(): Promise<void> {
    this.equipmentService.getAll().subscribe((resp: any) => {
      this.equipments = resp.data;
    })
  }

  newEquipment() {
    this.router.navigate(['/sci/equipments/new']);
  }

}
