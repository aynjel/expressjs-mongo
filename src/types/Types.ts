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