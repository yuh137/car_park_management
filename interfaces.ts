export interface Vehicle {
    id: string;
    identification: string;
    owner: string;
    model: string;
    typeName: string;
    inputTime: string;
}

export interface RequestBody {
    username: string,
    password: string
}

export interface Service {
    id: string;
    serviceName: "wash" | "oil";
    price: number;
    vehicleId: string;
}