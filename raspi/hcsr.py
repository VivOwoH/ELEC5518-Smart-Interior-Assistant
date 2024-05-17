#!/usr/bin/env python3
 
from time import sleep
from gpiozero import DistanceSensor

dist_sensor = DistanceSensor(echo=12, trigger=16, max_distance=4)

while True:
	print("Distance sensor read %.1f cm." % (dist_sensor.distance * 100))
	sleep(0.5)
