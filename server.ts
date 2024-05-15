import express, { Request, Response } from "express";
import Replicate from "replicate";
import cors from 'cors';
import path from 'path';

const replicate = new Replicate({
    auth: "r8_7czSP5xjOVjetjN7Nsu97yVzIQmECOW22aM4W",
});

const model =
    "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf";
const input = {
    prompt:
        "I need a small room with 21 degrees of light, 34 ultrasonic, 45 temperture and 56 humidity",
};

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