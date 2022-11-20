const mongoose = require('mongoose');
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
    const passpattern = /^(?=.[0-9])(?=.[!@#$%^&])[a-zA-Z0-9!@#$%^&]{6,16}$/;
    if (password.match(passpattern)) {
        return true;
    } else {
        return false;
    }
}
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        validate: [validateName, "Enter Valid Name"],
        match: [
            /^[a-zA-Z\s]+$/,
            "Enter valid email address",
        ],
    },
    email: {
        type: String,
        validate: [validateEmail, "Enter Valid Email"],
        match: [
            /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/,
            "Enter valid email address",
        ],
    },
    password: {
        type: String,
        
    },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;