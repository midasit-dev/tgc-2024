### do not delete this import scripts ###
import json
from py_base import set_g_values, get_g_values, requests_json, MidasAPI, Product
from py_base_sub import HelloWorld, ApiGet
### do not delete this import scripts ###

def post(id, x, y, z):
  civil = MidasAPI(Product.CIVIL, "KR")
  response =  civil.db_create_itemI("NODE", id, {
		"X" : float(x),
  	"Y" : float(y),
    "Z" : float(x)
	})
  
  return json.dumps(response)

def put(id, x, y, z):
  civil = MidasAPI(Product.CIVIL, "KR")
  response =  civil.db_update_item("NODE", id, {
		"X" : float(x),
  	"Y" : float(y),
    "Z" : float(x)
	})
  
  return json.dumps(response)

def get(id, x, y, z):
  civil = MidasAPI(Product.CIVIL, "KR")
  response =  civil.db_read("NODE")
  return json.dumps(response, indent=2)

def	delete(id):
	civil = MidasAPI(Product.CIVIL, "KR")
	response =  civil.de_delete("NODE", id)
	return json.dumps(response)