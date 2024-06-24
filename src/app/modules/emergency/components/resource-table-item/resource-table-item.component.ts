import { Component, Input, OnInit } from '@angular/core';
import { Equipment, Resource } from '../../../equipment/interfaces/equipment.interface';
import { CurrencyPipe } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RouterLink } from '@angular/router';
import { EquipmentService } from '../../../equipment/services/equipment.service';

@Component({
  selector: '[resource-table-item]',
  standalone: true,
  imports: [AngularSvgIconModule, CurrencyPipe, RouterLink],
  templateUrl: './resource-table-item.component.html',
})
export class ResourceTableItemComponent implements OnInit {
  @Input() resource = <Resource>{};

  constructor(
    private equipmentService: EquipmentService,
  ) { }

  ngOnInit(): void { }

  confirmDelete(equipmentId: string): void {
    const confirmed = confirm('¿Está seguro que quiere eliminar este equipo?');
    if (confirmed) {
      this.delete(equipmentId);
    }
  }
  delete(id: string) {
    this.equipmentService.delete(id).subscribe(() => {
      window.location.reload();
    });
  }
}
