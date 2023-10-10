import * as mongoose from 'mongoose';

export interface IBlog extends mongoose.Document{
    title: string;
    body: string;
}