### do not delete this import scripts ###
import json
# import requests
from py_base import set_g_values, get_g_values, requests_json, MidasAPI, Product, section_property
from py_base_sub import HelloWorld, ApiGet
### do not delete this import scripts ###
import project.sectionproperty.report_sectionproperty as report_sectionproperty

def main(vertices):
	print("vertices: ", vertices)
	temp_text = report_sectionproperty.Do(json.loads(vertices))
	# temp_text = section_property(json.loads(vertices))
	return json.dumps(temp_text)
