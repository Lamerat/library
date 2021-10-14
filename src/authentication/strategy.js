import passportJwt from 'passport-jwt';
import dotenv from 'dotenv';

const JWT_KEY = dotenv.config().parsed.JWT_KEY;

const options = {
    secretOrKey: JWT_KEY,
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtStrategy = new passportJwt.Strategy(options, async (payload, done) => {
  const user = {
      id: payload.id,
      username: payload.username,
  };

  done(null, user);
});

export default jwtStrategy;
