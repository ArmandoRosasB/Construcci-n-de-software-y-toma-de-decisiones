const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys")
const User = require("../Models/Users.model");

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    })
})

passport.use(
    new GoogleStrategy({
    // OPTIONS FOR THE GOOGLE STRAT
    callbackURL: "/auth/google/redirect",
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
}, (accesToken, refreshToken, profile, done) => {
    // PASSPORT CALL BACK
    User.fetchOne(profile.id).then((currentUser) => {
        if(currentUser){
            done(null, currentUser[0][0]);
        } else {
            const aux = {
                id: profile.id,
                nombre: profile.displayName,
                username: profile.name.givenName,
            }
        
            const user = new User(aux);
            user.save().then((newUser) =>
            {user.addRol();
            done(null, newUser)})
        }
    })
    
})
)
