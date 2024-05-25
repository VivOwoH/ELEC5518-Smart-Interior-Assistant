# ELEC5518-Smart-Interior-Assistant

## How to run
The webpage will be launched on port 3000.
```
npm install
npm run build
npm run dev
```


## API access
You will have to add your own API key (ThingSpeak, Adafruit, Replicate for RoomGPT) to the code to successfully make data requests.

- Server.ts
```
const replicate = new Replicate({
    auth: "", // <--------------- ENTER YOUR OWN
});

// thingspeak
const thingspeakAPI = axios.create({
    baseURL: "https://api.thingspeak.com",
});

const channelID = '2549941'; // <--------------- THIS IS AN EXAMPLE, YOU NEED TO CREATE YOUR OWN CHANNEL
const readApiKey = ''; // <--------------- ENTER YOUR OWN

// Adafruit IO
const username = ""; // <---------------YOU NEED TO CREATE YOUR ACCOUNT AND FEEDS
const feedKey = 'image-stream'; // <---------------THIS IS THE FEED OF THE IMAGE RECEIVED FROM RASPI
const adafruitIOAPI = axios.create({
    baseURL: "https://io.adafruit.com/api/v2",
    headers: {
        'X-AIO-Key': "", // <--------------- ENTER YOUR OWN
    }
});
```
- client.py for Raspi
```
# api settings
writeAPIKey = ''  # <--------- ENTER YOUR OWN
ThingsURL = 'https://api.thingspeak.com/update?api_key=%s' % writeAPIKey 

```
- photo.py for Raspi
```
IO_USERNAME = '' # <---------------YOU NEED TO CREATE YOUR ACCOUNT AND FEEDS
IO_KEY = "" # <--------- ENTER YOUR OWN
IO_URL = 'io.adafruit.com'
```
