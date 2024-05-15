#!/usr/bin/env python3
from time import sleep
from gpiozero import LightSensor, Buzzer
import RPi.GPIO as GPIO

ldr = LightSensor(17)
while True:
	print(ldr.value)
	sleep(1)
