const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const Passengeropts = {}
const Psngr = require('../models/psngrModel');
const passengerPassport = require('passport');
Passengeropts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
Passengeropts.secretOrKey = 'Random String';



passengerPassport.use(new JwtStrategy(Passengeropts, async(jwt_payload, done)=> {
  console.log("inside passprt");
  //console.log(jwt_payload.id);
 try {
  const user = await Psngr.findById(jwt_payload.id);
  //console.log(user);
  if (user) {
    return done(null, user);
  } else {
    return done(null, false);
    // or you could create a new account
  }
} catch (err) {
  return done(err, false);
}
}));

module.exports = passengerPassport;