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