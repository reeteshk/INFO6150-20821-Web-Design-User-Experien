 const control = require("../controller/controller");
module.exports = (app) => {
    app.post("/user/create", control.createUser);
    app.delete("/user/delete", control.deleteUser);
    app.get("/user/getAll", control.getAllUser);
    app.put("/user/edit", control.editUser);
    app.post("/user/login", control.loginUser);
};