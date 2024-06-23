import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentTableItemComponent } from './equipment-table-item.component';

describe('EquipmentTableItemComponent', () => {
  let component: EquipmentTableItemComponent;
  let fixture: ComponentFixture<EquipmentTableItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentTableItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EquipmentTableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
