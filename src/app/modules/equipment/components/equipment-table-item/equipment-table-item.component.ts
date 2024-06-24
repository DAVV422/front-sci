import { Component, Input, OnInit } from '@angular/core';
import { Equipment } from '../../interfaces/equipment.interface';
import { CurrencyPipe } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RouterLink } from '@angular/router';
import { EquipmentService } from '../../services/equipment.service';

@Component({
  selector: '[equipment-table-item]',
  standalone: true,
  imports: [AngularSvgIconModule, CurrencyPipe, RouterLink],
  templateUrl: './equipment-table-item.component.html',
  styleUrl: './equipment-table-item.component.scss'
})
export class EquipmentTableItemComponent implements OnInit {
  @Input() equipment = <Equipment>{};

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
