import sys, json, time, os, glob
import requests
from gpiozero import DistanceSensor, LightSensor

# os.system('modprobe w1-gpio')
# os.system('modprobe w1-therm')

# base_dir = '/sys/bus/w1/devices/'
# device_folder = glob.glob(base_dir + '28*')[0]
# device_file = device_folder + '/w1_slave'

# raspi settings
dist_sensor = DistanceSensor(echo=12, trigger=16, max_distance=4)
ldr = LightSensor(17)
    
# api settings
writeAPIKey = 'FLPHRRX5TP36UPSW' 
ThingsURL = 'https://api.thingspeak.com/update?api_key=%s' % writeAPIKey 

room_data = {
    "distance": 0,
    "humidity": 0,
    "temperature": 0,
    "light": 0
}

def read_room_data():    
    '''reader'''
    distance = dist_sensor.distance * 100 # cm
    light = ldr.value
    # temp, _ = read_temp() # only celcius
    room_data.update({"distance": distance, "light": light})

def thingspeak(distance, humidity, temperature, light):
    '''post request'''
    queries = {"api_key": writeAPIKey,
               "field1": distance,
                "field2": humidity,
                "field3": temperature,
                "field4": light
                }
    r = requests.get('https://api.thingspeak.com/update', params=queries)
    if r.status_code == requests.codes.ok:
        print("Data Received!")
    else:
        print("Error Code: " + str(r.status_code))

# def read_temp_raw():
#     f = open(device_file, 'r')
#     lines = f.readlines()
#     f.close()
#     return lines
 
# def read_temp():
#     '''temperature'''
#     lines = read_temp_raw()
#     while lines[0].strip()[-3:] != 'YES':
#         time.sleep(0.2)
#         lines = read_temp_raw()
#     equals_pos = lines[1].find('t=')
#     if equals_pos != -1:
#         temp_string = lines[1][equals_pos+2:]
#         temp_c = float(temp_string) / 1000.0
#         temp_f = temp_c * 9.0 / 5.0 + 32.0
#         return temp_c, temp_f


# ------------------- Program entry ---------------------
if __name__=="__main__":
    try:
        while True:
            read_room_data()
            thingspeak(room_data.get("distance"),
                       room_data.get("humidity"),
                       room_data.get("temperature"), 
                       room_data.get("light"))
            print("data is sent to thingspeak")
            time.sleep(30)
    except:
        pass