### do not delete this import scripts ###
import json
from py_base import set_g_values, get_g_values, requests_json, MidasAPI, Product
from py_base_sub import HelloWorld, ApiGet
from py_pycurve import create_pycurve
### do not delete this import scripts ###

def py_db_create(item_name, items):
	civil = MidasAPI(Product.CIVIL, "KR")
	return json.dumps(civil.db_create(item_name, json.loads(items)))

def py_db_create_item(item_name, item_id, item):
	civil = MidasAPI(Product.CIVIL, "KR")
	return json.dumps(civil.db_create_item(item_name, item_id, json.loads(item)))

def py_db_read(item_name):
	civil = MidasAPI(Product.CIVIL, "KR")
	return json.dumps(civil.db_read(item_name))

def py_db_read_item(item_name, item_id):
	civil = MidasAPI(Product.CIVIL, "KR")
	return json.dumps(civil.db_read_item(item_name, item_id))

def py_db_update(item_name, items):
	civil = MidasAPI(Product.CIVIL, "KR")
	return json.dumps(civil.db_update(item_name, json.loads(items)))

def py_db_update_item(item_name, item_id, item):
	civil = MidasAPI(Product.CIVIL, "KR")
	return json.dumps(civil.db_update_item(item_name, item_id, json.loads(item)))

def py_db_delete(item_name, item_id):
	civil = MidasAPI(Product.CIVIL, "KR")
	return json.dumps(civil.db_delete(item_name, item_id))

def py_get_GRUP_list():
	civil = MidasAPI(Product.CIVIL, "KR")
	response = civil.db_read("GRUP")
	if "error" in response:
		return json.dumps(response)
	else:
		GroupList = []
		for key in response:
			GroupList.append(response[key]['NAME'])
		
	return json.dumps(GroupList)

def py_pycurve(BH_TableRows, LayerData, ElementStructList):
	BH_TableRows_ = json.loads(BH_TableRows)
	LayerData_ = json.loads(LayerData)
	ElementStructList_ = json.loads(ElementStructList)
	result = create_pycurve(BH_TableRows_, LayerData_, ElementStructList_)
	print("result: ", result)
	return result