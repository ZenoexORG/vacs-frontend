export interface VehicleType {
	name: string;
	description: string;
	id: number;
}

export interface Vehicle {
	id: string;
	type_id: number;
	owner_id: string;
	soat: string;
}
