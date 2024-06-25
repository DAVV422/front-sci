import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { EmergencyService } from './emergency.service';
import { Action, Emergency, Form201 } from '../interfaces/emergency.interface';
import { Form201Service } from './form201.service';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  emergency: Emergency = <Emergency>{};
  forms201: Form201[] = [];

  constructor(
    private emergencyService: EmergencyService,
    private form201Service: Form201Service
  ) { }

  getEmergency(emergency_id: string) {
    this.emergencyService.getById(emergency_id).subscribe(
      (resp: any) => {
        this.emergency = resp.data;
        this.form201Service.getByEmergency(this.emergency.id!).subscribe((response: any) => {
          this.forms201 = response.data;
          console.log(this.forms201);
          for (let form of this.forms201) {
            this.generatePDFForm(form);
          }
        });
        this.emergencyService.getActions(this.emergency.id!).subscribe(
          (resp: any) => {
            this.generatePDFFormAction(resp.data);
          }
        )
      }
    );

  }

  public generatePDF(emergency_id: string): void {
    this.getEmergency(emergency_id);
  }
  public generatePDFFormAction(actions: Action[]): void {
    const doc = new jsPDF('p', 'mm', 'a4');

    // Título
    doc.setFontSize(12);
    doc.text('SCI-201 Resumen de las Acciones', 10, 10);
    let pos:number = 15;
    // Cuadros y Texto
    this.addBox(doc, 10, 15, 190, 10, `1. Fecha y Hora`, `2. Accion:`, 45);
    for(let action of actions){
      pos += 10;
      this.addBox(doc, 10, pos, 190, 10, `${ action.date } - ${action.hour}`, `2. Fecha de preparación: ${action.description}`, 95);
    }

  }

  public generatePDFForm(form: Form201): void {
    const doc = new jsPDF('p', 'mm', 'a4');

    // Título
    doc.setFontSize(12);
    doc.text('SCI-201 Resumen del Incidente', 10, 10);

    // Cuadros y Texto
    this.addBox(doc, 10, 15, 190, 10, `1. Nombre del Incidente: ${ this.emergency.name }`, `2. Fecha de preparación: ${form.date}`, 95);
    this.addBox(doc, 10, 25, 190, 10, `3. Lugar del Incidente: ${this.emergency.location_description}`);
    this.addBox(doc, 10, 35, 190, 30, `4. Evaluación Inicial (naturaleza del incidente, amenazas, área afectada y aislamiento): \nNaturaleza del Incidente: ${ this.emergency.type }. Amenazas: ${form.thread}.\nArea Afectada: ${form.affected_areas}. Aislamiento: ${form.isolation} `);
    this.addBox(doc, 10, 65, 190, 30, `5. Objetivo(s) inicial (es): ${form.objective}.\n${form.strategy}.\n${form.tactics}`);
    this.addBox(doc, 10, 95, 190, 10, `6. Ubicación del PC:${this.emergency.coordinates_pc}`, `7. Ubicación del E: ${this.emergency.coordinates_e}`,95);
    this.addBox(doc, 10, 105, 190, 10, `8. Ruta Ingreso: ${ form.entry_route }`, `9. Ruta Egreso: ${ form.egress_route }`, 95);
    this.addBox(doc, 10, 115, 190, 20, `10. Mensaje General de Seguridad: ${ form.safety_message }`);
    
    // Pie de página
    doc.setFontSize(10);
    doc.text('SCI-201', 10, 290);
    doc.text('Página 1 de 4', 95, 290);
    doc.text('11. Comandante del Incidente (Nombre y Apellidos):', 150, 290);

    doc.save('resumen_incidente.pdf');
  }

  private addBox(doc: jsPDF, x: number, y: number, width: number, height: number, text1: string, text2: string = '', text2X: number = 0): void {
    doc.setFontSize(10);
    doc.rect(x, y, width, height);

    // Dividir texto en líneas que se ajustan al ancho del cuadro
    const text1Lines = doc.splitTextToSize(text1, width - 4); // Ajustar ancho según el margen
    const text2Lines = text2 ? doc.splitTextToSize(text2, width - text2X - 4) : [];

    // Imprimir líneas de texto en el cuadro
    let offsetY = y + 7;
    text1Lines.forEach((line:any) => {
      doc.text(line, x + 2, offsetY);
      offsetY += 5;
    });

    if (text2) {
      offsetY = y + 7;
      text2Lines.forEach((line:any) => {
        doc.text(line, x + text2X + 2, offsetY);
        offsetY += 5;
      });
      doc.line(x + text2X - 2, y, x + text2X - 2, y + height);
    }
  }
  
}
