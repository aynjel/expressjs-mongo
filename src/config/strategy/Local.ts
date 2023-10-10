import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from './../../models/User';

export class Local{
    constructor(){
        this.init();
    }

    init(){
        passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        }, async (email, password, done) => {
            try{
                console.log('email', email);
                return done(null, { email: email });
                // const user = await User.findOne({ email: email });
                // if(!user){
                //     return done(null, false, { message: 'User not found' });
                // }
                // const isPasswordValid = await user.comparePassword(password);
                // if(!isPasswordValid){
                //     return done(null, false, { message: 'Invalid password' });
                // }
                // return done(null, user);
            }catch(error){
                return done(error);
            }
        }));
    }
}