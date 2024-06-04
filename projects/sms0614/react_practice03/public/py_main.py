### do not delete this import scripts ###
import json
# import requests
from py_base import set_g_values, get_g_values, requests_json, MidasAPI, Product, section_property
from py_base_sub import HelloWorld, ApiGet
### do not delete this import scripts ###

def main(vertices):
	temp_vertices = json.loads(vertices)
	result = section_property(vertices)
	print(result)
	return json.dumps(result)
