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
var import_axios = __toESM(require("axios"));
var import_csv_writer = require("csv-writer");
var import_replicate = __toESM(require("replicate"));
var import_cors = __toESM(require("cors"));
var import_path = __toESM(require("path"));
const replicate = new import_replicate.default({
  auth: "r8_7czSP5xjOVjetjN7Nsu97yVzIQmECOW22aM4W"
});
const model = "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf";
const input = {
  prompt: "I need a small room with 21 degrees of light, 34 ultrasonic, 45 temperture and 56 humidity"
};
const thingspeakAPI = import_axios.default.create({
  baseURL: "https://api.thingspeak.com"
});
const channelID = "2549941";
const readApiKey = "2DWC40ZT6TVFVB67";
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
const fetchDataFromThingSpeak = async () => {
  try {
    const response = await thingspeakAPI.get(`/channels/${channelID}/feeds.json?api_key=${readApiKey}`);
    return response.data.feeds;
  } catch (error) {
    throw new Error("Failed to fetch data from ThingSpeak");
  }
};
const saveDataToCSV = (data, filePath) => {
  const csvWriter = (0, import_csv_writer.createObjectCsvWriter)({
    path: filePath,
    header: [
      { id: "created_at", title: "Timestamp" },
      { id: "field1", title: "Distance" },
      { id: "field2", title: "Humidity" },
      { id: "field3", title: "Temperature" },
      { id: "field4", title: "Light" }
    ]
  });
  csvWriter.writeRecords(data).then(() => console.log("Saved to CSV")).catch((error) => console.error("Failed to save to CSV:", error));
};
app.get("/fetch", async (req, res) => {
  try {
    const data = await fetchDataFromThingSpeak();
    const filePath = import_path.default.join(__dirname, "data.csv");
    saveDataToCSV(data, filePath);
    res.json({ message: "Data fetched and saved to CSV", data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch and save data" });
  }
});
app.get("/", (_, res) => {
  res.sendFile(import_path.default.resolve("./public/index.html"));
});
document.getElementById('see-room-data').addEventListener('click', function() {
  var infoBox = document.getElementById('info-box');
  if (infoBox.style.display === 'none') {
      infoBox.style.display = 'block';
  } else {
      infoBox.style.display = 'none'; // Optional: Toggle visibility on click
  }
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
