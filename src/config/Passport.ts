import passport from 'passport';

export class Passport{
    constructor(){ }

    public static init(){
        passport.serializeUser((user: any, done) => {
            console.log('serializeUser', user);
            process.nextTick(() => {
                done(null, user);
            });
        });

        passport.deserializeUser((user: any, done) => {
            console.log('deserializeUser', user);
            process.nextTick(() => {
                done(null, user);
            });
        });
    }
}