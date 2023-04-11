const User = require("../Models/Users.model")

const passport = require("passport");

exports.google = passport.authenticate("google",{
    scope: ["profile"]
})

exports.redirect = (request, response) => {
    User.fetchPrivilegios(request.user.id)
                    .then(([rows_privilegios, fieldData]) => {
                        const privilegios = [];
                        rows_privilegios.forEach(element =>{
                            privilegios.push(element.nombre);
                        });
                        console.log(privilegios)
                        request.session.privilegios = privilegios;
                        return request.session.save(err => {
                            response.redirect('/AboutMe/Portfolio');
                        });
                    })
                    .catch((error) => {console.log(error)});
}