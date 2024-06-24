import { Emergency } from "../../emergency/interfaces/emergency.interface";

export interface Equipment {
  id: string;
  name: string;
  description: string;
  utilization: string;
  acquisitionDate: string;
  stateAcquisition: string;
  stateActual: string;
  urlPhoto: string;
  createdAt: string;
  updatedAt: string;
}

export interface Resource {
  id: string;
  state_initial: string;
  state_end: string;
  date: string;
  hour: string;
  emergency: Emergency;
  equipment: Equipment;
}
