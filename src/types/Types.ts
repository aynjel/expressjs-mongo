export type TUser = {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string;
};

export type TSketch = {
    _id: string;
    name: string;
    // array of pairs of coordinates
    coordinates: Array<Array<number>>;
};