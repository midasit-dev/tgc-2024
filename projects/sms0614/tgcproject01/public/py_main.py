### do not delete this import scripts ###
import json
from py_base import set_g_values, get_g_values, requests_json, MidasAPI, Product
from py_base_sub import HelloWorld, ApiGet
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
		GroupList = {}
		for key in response:
			if 'E_LIST' in response[key]:
				GroupList[response[key]['NAME']] = response[key]['E_LIST']
			else:
				GroupList[response[key]['NAME']] = []
	
	return json.dumps(GroupList)

def py_get_ELEM_list(E_LIST):
	civil = MidasAPI(Product.CIVIL, "KR")
	## E_LIST = [[], [1,2,3], [3,4,5]]
	## E_LIST 에서 번호를 추출하여 ElementList 에 저장
	ElementList = []
	for E in E_LIST:
		for e in E:
			ElementList.append(e)
	ElementList = list(set(ElementList))
	ElementID = ','.join(map(str, ElementList))
	response = civil.db_read_item("ELEM",ElementID)
	if "error" in response:
		return json.dumps(response)
	else:
		## ElemetList = [{'NODE' : [1,2,3,4]}, {'NODE' : [5,6,7,8]}]
		ElementList = []
		TotalNode = []
		for STGroup in range(len(E_LIST)):
			NodeList = []
			for Element in E_LIST[STGroup]:
				NodeList.append(response[str(Element)]['NODE'][0])
				NodeList.append(response[str(Element)]['NODE'][1])
				TotalNode.append(response[str(Element)]['NODE'][0])
				TotalNode.append(response[str(Element)]['NODE'][1])
			NodeList = list(set(NodeList))
			ElementList.append({'NODE' : NodeList})
		TotalNode = list(set(TotalNode))
  
		## Node 정보 추출
		NodeID = ','.join(map(str, TotalNode))
		response = civil.db_read_item("NODE",NodeID)
		if "error" in response:
			return json.dumps(response)
		else:
			for i in range(len(ElementList)):
				CORD_Array = []
				for j in range(len(ElementList[i]['NODE'])):
					CORD_Array.append([response[str(ElementList[i]['NODE'][j])]['X'],response[str(ElementList[i]['NODE'][j])]['Z']])
				ElementList[i]['CORD'] = CORD_Array
			print('ElementList : ', ElementList)
	return json.dumps(ElementList)