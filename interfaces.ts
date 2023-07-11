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