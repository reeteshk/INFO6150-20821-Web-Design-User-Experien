const e = require("express");
var User = require("../models/model");

exports.createUser = async function (name, email, password) {
    try {
        var user = await User.create({ name, email, password });
        return user;
    } catch (e) {
        throw e;
    }
};

exports.deleteUser = async function (email, password) {
    User.findOneAndUpdate({ email }, { password }, function (err, doc) {
        if (err) throw err;
    });
};

exports.deleteUser = async function (email, password) {
    User.deleteOne({ email, password }, function (err) {
        if (err) throw e;
    });
};

exports.getAllUser = async function () {
    try {
        var user = User.find();
        return user;
    } catch (err) {
        throw e;
    }
};

exports.editUser = async function (name, email, password) {
    try {
        const updateUser = User.findOneAndUpdate({ email }, {
            $set: {
                name: name
            }
        })
        return updateUser;
    } catch (e) {
        throw e;
    }
};


exports.existsUser = function (email, password) {
    try {
        var user = User.count({ email, password });
        return user;
    } catch (e) {
        throw e;
    }
};