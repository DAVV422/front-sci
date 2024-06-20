import { User } from "../../user/interfaces/user.interface";

export interface Emergency {  
    id?: number; // Asumiendo que hay una columna 'id' heredada de BaseEntity
    name: string;
    locationDescription?: string;
    date: Date;
    hour: string;
    type: string;
    coordinates?: number[];
    coordinates_pc?: number[];
    coordinates_e?: number[];
    state: string;
    duration: string;
    form201?: any;
    // form201?: Form201[];
    user?: User;
    attends?: any;
    // attends?: Attend[];
    resources?: any;
}