import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { IUserModel, UserModel } from '../models/UserModel';

passport.use(
    new LocalStrategy(async function (username, password, done): Promise<void> {
        try {
            const user = await UserModel.findOne({ username }).exec();

            if (!user) {
                done(null, false);
            }

            const isCorrect = await user.comparePassword(password);

            done(null, isCorrect ? user : false);
        } catch (error) {
            done(error, false);
        }
    })
);

passport.use(
    new JWTStrategy(
        {
            secretOrKey: process.env.SECRET_KEY,
            jwtFromRequest: ExtractJwt.fromHeader('token'),
        },
        async (payload: { data: IUserModel }, done): Promise<void> => {
            try {
                const user = await UserModel.findById(payload.data._id).exec();
                done(null, user || false);
            } catch (error) {
                done(error, false);
                console.log(error);
            }
        }
    )
);

passport.serializeUser((user: IUserModel, done) => {
    done(null, user?._id);
});

passport.deserializeUser((id, done) => {
    UserModel.findById(id, (err, user) => {
        done(err, user);
    });
});

export { passport };
