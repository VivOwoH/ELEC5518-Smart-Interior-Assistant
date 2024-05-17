#!/usr/bin/env python3
#-- coding: utf-8 --
import RPi.GPIO as GPIO
import time

def angle_to_percent(angle):
	if angle > 180 or angle < 0:
		return False
	start = 2.5
	end = 12
	ratio = (end-start)/180
	angle_as_percent = angle*ratio
	return start+angle_as_percent

GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)

pwm_gpio = 12
frequency = 50
GPIO.setup(pwm_gpio, GPIO.OUT)
pwm = GPIO.PWM(pwm_gpio, frequency)

pwm.start(angle_to_percent(20))
time.sleep(1)

pwm.ChangeDutyCycle(angle_to_percent(100))
time.sleep(1)

pwm.ChangeDutyCycle(angle_to_percent(180))
time.sleep(1)

pwm.stop()
GPIO.cleanup()
