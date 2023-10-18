export type TUser = {
    _id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    mobileNumber: string;
    role: string;
};

export type TUpdateUser = {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    username: string;
    mobileNumber: string;
};

export type TChangePassword = {
    oldPassword: string;
    newPassword: string;
};

export type TSketch = {
    _id: string;
    name: string;
    coordinates: Array<Array<number>>;
};

export type TDPerson = {
    _id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    graveNumber: string;
    BlockNumber: string;
    LotNumber: string;
    BornDate: string;
    DeathDate: string;
};