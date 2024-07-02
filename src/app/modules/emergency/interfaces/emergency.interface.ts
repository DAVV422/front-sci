import { User } from "../../user/interfaces/user.interface";

export interface Emergency {  
    id?: string; // Asumiendo que hay una columna 'id' heredada de BaseEntity
    name: string;
    location_description?: string;
    date: Date;
    hour: string;
    type: string;
    coordinates?: number[];
    coordinates_pc?: number[];
    coordinates_e?: number[];
    state: string;
    duration: string;
    form201?: Form201[];
    user?: User;
    attends?: Attend[];
    resources?: any;
}

export interface EmergencyUpdate {  
  id?: string; // Asumiendo que hay una columna 'id' heredada de BaseEntity
  name?: string;
  location_description?: string;
  date?: Date;
  hour?: string;
  type?: string;
  coordinates?: number[];
  coordinates_pc?: number[];
  coordinates_e?: number[];
  state?: string;
  duration?: string;
  form201?: Form201[];
  user?: User;
  attends?: Attend[];
  resources?: any;
}

export interface Form201 {
  id?: string
  objective: string,
  strategy: string,
  safety_message: string,
  url_organization_chart: string,
  thread: string,
  isolation: string,
  affected_areas: string,
  tactics: string,
  egress_route: string,
  entry_route: string,
  affected_areasM: string,
  date: Date,
  emergency: string
}

export interface Charge {
  id?: string,
  name: string,
  level: number,
  weight: number
}

export interface Attend {
  id?: string
  date: Date,
  charge: Charge,
  user: User,
  emergency: Emergency
}

export interface Action {
  id?: string,
  date: Date,
  hour: string,
  description: string,
  form201: Form201

}