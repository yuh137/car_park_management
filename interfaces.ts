export interface Vehicle {
    id: string;
    identification: string;
    owner: string;
    model: string;
    typeName: string;
    inputTime: string;
}

export interface Admin {
    id: string;
    username: string;
    password: string;
    createdAt: string;
    totalIncome: number;
    lastVehicle: number;
}

export interface Service {
    id: string;
    serviceName: "wash" | "oil";
    price: number;
    vehicleId: string;
}