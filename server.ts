import express, { Request, Response } from "express";
import axios from "axios";
import { createObjectCsvWriter } from "csv-writer";
import Replicate from "replicate";
import cors from 'cors';
import path from 'path';

const replicate = new Replicate({
    auth: "", // <--------------- ENTER YOUR OWN
});

const model =
    "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf";
const input = {
    prompt:
        "I need a small room with 21 degrees of light, 34 ultrasonic, 45 temperture and 56 humidity",
};

// thingspeak
const thingspeakAPI = axios.create({
    baseURL: "https://api.thingspeak.com",
});

const channelID = '2549941';
const readApiKey = ''; // <--------------- ENTER YOUR OWN

// Adafruit IO
const username = "vivianH";
const feedKey = 'image-stream';
const adafruitIOAPI = axios.create({
    baseURL: "https://io.adafruit.com/api/v2",
    headers: {
        'X-AIO-Key': "", // <--------------- ENTER YOUR OWN
    }
});

const app = express();
app.use(express.json());
app.use('/public', express.static('public'));

// Define the CORS options
const corsOptions = {
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:8080'] // Whitelist the domains you want to allow
};
app.use(cors(corsOptions)); // Use the cors middleware with your options

// Replicate request
app.get("/request", async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await replicate.run(model, { input });
        // Send the response back to the client
        res.json({ message: 'Image generated at URL:', result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


const fetchDataFromThingSpeak = async (): Promise<any> => {
    try {
        const response = await thingspeakAPI.get(`/channels/${channelID}/feeds.json?api_key=${readApiKey}`);
        return response.data.feeds;
    } catch (error) {
        throw new Error("Failed to fetch data from ThingSpeak");
    }
};

const saveDataToCSV = (data: any[], filePath: string): void => {
    const csvWriter = createObjectCsvWriter({
        path: filePath,
        header: [
            { id: "created_at", title: "Timestamp" },
            { id: "field1", title: "Distance" },
            { id: "field2", title: "Humidity" }, 
            { id: "field3", title: "Temperature" }, 
            { id: "field4", title: "Light" }, 
        ],
    });
    csvWriter.writeRecords(data)
        .then(() => console.log("Saved to CSV"))
        .catch((error: any) => console.error("Failed to save to CSV:", error));
};


app.get("/fetch", async (req: Request, res: Response): Promise<void> => {
    try {
        const data = await fetchDataFromThingSpeak();
        const filePath = path.join(__dirname, "data.csv");
        saveDataToCSV(data, filePath);
        res.json({ message: "Data fetched and saved to CSV", data});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch and save data" });
    }
});

app.get("/fetch-image-feed", async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await adafruitIOAPI.get(`/${username}/feeds/${feedKey}/data`);
        res.json({ message: "Fetched image feed data", data: response.data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch image feed data" });
    }
});


app.get('/', (_, res) => {
    res.sendFile(path.resolve('./public/index.html'));
  });

const start = async (): Promise<void> => {
    try {
        app.listen(3000, () => {
            console.log("Server started on port 3000");
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

void start();