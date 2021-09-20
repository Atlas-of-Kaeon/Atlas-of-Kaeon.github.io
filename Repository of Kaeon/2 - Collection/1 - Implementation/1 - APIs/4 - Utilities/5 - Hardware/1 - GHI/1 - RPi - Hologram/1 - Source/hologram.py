from Hologram.HologramCloud import HologramCloud
 
import requests
import sys
 
hologram = HologramCloud(dict(), network='cellular')
 
try:
	result = hologram.network.connect()
 
except:
	pass
 
try:
	hologram.openReceiveSocket()
 
except:
	pass
 
while True:
 
	message = hologram.popReceivedMessage()
 
	if message != None:
		response = requests.post('http://localhost:' + sys.argv[1] + '/', data=message).text