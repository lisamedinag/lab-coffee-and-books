module.exports = (app) => {
  // const index = require("./base.routes");
  // app.use("/", index);

  app.use("/", require("./base.routes"))
  //app.use("/", require("./user.routes"))
  app.use("/places", require("./places.routes"))
 // app.use("/admin", require("./admin.routes"))
}