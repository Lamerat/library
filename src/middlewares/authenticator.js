import passport from 'passport';

export const authenticator = (req, res, next) => passport.authenticate('jwt', {session: false})(req,res,next);
