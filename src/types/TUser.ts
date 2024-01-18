export type TUser = {
    _id: string;
    name: string;
    email: string;
    username: string;
    password: string;
    role: string;
};

export type TUpdateUser = {
    name?: string;
    email?: string;
    username?: string;
    password?: string;
    role?: string;
};