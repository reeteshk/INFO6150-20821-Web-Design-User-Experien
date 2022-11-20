var userService = require("../services/services");
var User = require("../models/model");
var bcrypt = require('bcrypt');
// Validate Name
const validateName = (name) => {
    const namepattern = /^[a-zA-Z\s]+$/;
    if (name.match(namepattern)) {
        return (true)
    }

    return (false)
}

// Validate Email
const validateEmail = (email) => {
    const emailpattern = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/;
    if (email.match(emailpattern)) {
        return (true)
    }

    return (false)
}

// Validate Password
const validatePassword = (password) => {
    const passpattern =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;;
    if (password.match(passpattern)) {
        return true;
    } else {
        return false;
    }
}

exports.createUser = async function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var hashedPassword = await bcrypt.hash(req.body.password, 10);
    if (await User.findOne({ email: req.body.email })) {
        return res.status(400).send({ message: "Email already exists. Enter new Email adddress." });
    }
    try {
        let valName = false;
        let valEmail = false;
        let valPass = false;
        if (validateName(req.body.name)) {
            valName = true;
        }
        else {
            valName = false;
            return res.status(400).send({ message: "Enter Valid Name." });
        }

        if (validateEmail(req.body.email)) {
            valEmail = true;
        }
        else {
            valEmail = false;
            return res.status(400).send({ message: "Enter Valid Email adddress." });
        }

        if (validatePassword(req.body.password)) {
            console.log("validation came here");
            valPass = true;
        }
        else {
            valPass = false;
            return res.status(400).send({ message: "Enter Valid Password(Minimum 6 chars along with 1 special char)." });
        }
        if (valName && valEmail && valPass) {
            var user = await userService.createUser(name, email, password);
            return res.status(200).json({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            });
        }

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }

};

exports.deleteUser = async function (req, res) {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        res.status(404).send({ message: "User not found." });
    }
    else {
        const deleteUser = User.deleteOne({ email: req.body.email });
        deleteUser.then(deletedUser => {
            if (!deletedUser) {
                res.status(404).send({ message: "User not found." });
            }
            else {
                res.status(202).send({ message: `User deleted.` });
            }
        });
    }
};

exports.getAllUser = async function (req, res) {
    User.find({}, function (error, users) {
        if (error) {
            return res.status(500).send({
                message: 'Error while finding records',
                data: []
            })
        } else {
            var user = users.map(function (elem) {
                return {
                    name: elem.name,
                    email: elem.email,
                }
            })
            res.send(user);
        }
    });
};

exports.editUser = async function (req, res) {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        res.status(404).send({ message: "User not found." });
    }
    else {
        if (req.body.nameupdate === undefined && req.body.passwordupdate === undefined) {
            res.status(400).send({ message: "Enter Name or password to update." });
        }
        else {
            if (req.body.nameupdate !== undefined && req.body.passwordupdate === undefined) {
                if (validateName(req.body.nameupdate)) {

                    const updateUser = User.findOneAndUpdate({ email: req.body.email }, {
                        $set: {
                            name: req.body.nameupdate
                        }
                    })
                    updateUser.then(updatedUser => {
                        if (!updatedUser) {
                            res.status(404).send({ message: "User not found." });
                        }
                        else {
                            res.status(202).send({ message: `User updated with new Name.` });
                        }
                    });
                }
                else {

                    res.status(400).send({ message: "Enter Valid Name." });
                }
            }
            else if (req.body.nameupdate === undefined && req.body.passwordupdate !== undefined) {
                if (validatePassword(req.body.passwordupdate)) {

                    const updateUser = User.findOneAndUpdate({ email: req.body.email }, {
                        $set: {
                            password: req.body.passwordupdate
                        }
                    })
                    updateUser.then(updatedUser => {
                        if (!updatedUser) {
                            res.status(404).send({ message: "User not found." });
                        }
                        else {
                            res.status(202).send({ message: `User updated with new Password.` });
                        }
                    });
                }
                else {

                    res.status(400).send({ message: "Enter Valid Password(Minimum 6 chars along with 1 special char)." });
                }
            }
            else if (req.body.nameupdate !== undefined && req.body.passwordupdate !== undefined) {
                if (validateName(req.body.nameupdate) && validatePassword(req.body.passwordupdate)) {

                    const updateUser = User.findOneAndUpdate({ email: req.body.email }, {
                        $set: {
                            name: req.body.nameupdate,
                            password: req.body.passwordupdate
                        }
                    })
                    updateUser.then(updatedUser => {
                        if (!updatedUser) {
                            res.status(404).send({ message: "User not found." });
                        }
                        else {
                            res.status(202).send({ message: `User updated with new Name and Password.` });
                        }
                    });
                }
                else {
                    res.status(400).send({ message: "Enter Valid Name and Enter Valid Password(Minimum 6 chars along with 1 special char)." });
                }
            }
        }
    }
};

exports.loginUser = async function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    //const hashedPassword = await bcrypt.hash(req.body.password, 10);

    let result = await User.exists({ email, password });
    if (result != null) {
        return res.status(200).json({ status: 200, exist: true });
    } else {
        return res
            .status(200)
            .json({ status: 200, message: "User doesn't exist", exist: false });
    }
};