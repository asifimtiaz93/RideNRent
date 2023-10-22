
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const Driveropts = {}
const Dvr = require('../models/dvrModel');
const Psngr = require('../models/psngrModel');
const passport = require('passport');
Driveropts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
Driveropts.secretOrKey = 'Random String';




passport.use(new JwtStrategy(Driveropts, async(jwt_payload, done)=> {

  //console.log(jwt_payload.id);
 try {
  const user = await Dvr.findById(jwt_payload.id);
  const psngr = await Psngr.findById(jwt_payload.id);
  if (user) {
    return done(null, user);

  } 
  if (psngr) {
    return done(null, psngr);

  }
   else {
    return done(null, false);
    // or you could create a new account
  }
} catch (err) {
  return done(err, false);
}
}));
