"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_express = __toESM(require("express"));
var import_replicate = __toESM(require("replicate"));
var import_cors = __toESM(require("cors"));
var import_path = __toESM(require("path"));
const replicate = new import_replicate.default({
  auth: "r8_UyH7brBt35yeoQNXjiOt7D2D8QDQXPY0j9bHu"
});
const model = "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf";
const input = {
  prompt: "I need a small room with 21 degrees of light, 34 ultrasonic, 45 temperture and 56 humidity"
};
const app = (0, import_express.default)();
app.use(import_express.default.json());
app.use("/public", import_express.default.static("public"));
const corsOptions = {
  credentials: true,
  origin: ["http://localhost:3000", "http://localhost:8080"]
  // Whitelist the domains you want to allow
};
app.use((0, import_cors.default)(corsOptions));
app.get("/request", async (req, res) => {
  try {
    const result = await replicate.run(model, { input });
    res.json({ message: "Image generated at URL:", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/", (_, res) => {
  res.sendFile(import_path.default.resolve("./public/index.html"));
});
const start = async () => {
  try {
    app.listen(3e3, () => {
      console.log("Server started on port 3000");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
void start();
//# sourceMappingURL=server.js.map
