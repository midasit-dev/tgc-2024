### do not delete this import scripts ###
import json
import csv
from py_base import set_g_values, get_g_values, requests_json, MidasAPI, Product
from py_base_sub import HelloWorld, ApiGet, py_db_read, py_db_read_item  # py_db_read_item을 추가
### do not delete this import scripts ###

#npm run start

def py_make_curve_data():
    # Step 1: Read grup data
    grupDataAll = py_db_read('NODE')
    print('test')
    print(grupDataAll)
#    grupData = json.loads(grupDataAll)
#
#    nodeList = []
#    elemList = []
#    
#    # Step 2: Find 'Girder' data and extract node and element lists
#    for key, value in grupData.items():
#        if value["NAME"] == "Girder":
#            nodeList.extend(value.get("N_LIST", []))
#            elemList.extend(value.get("E_LIST", []))
#            break
#
#    # Step 3: Fetch node and element details
#    nodeDetails = []
#    for node in nodeList:
#        nodeData = json.loads(py_db_read_item('NODE', node))
#        nodeDetails.append({
#            'Key': node,
#            'X': nodeData["X"],
#            'Y': nodeData["Y"],
#            'Z': nodeData["Z"]
#        })
#    
#    elemDetails = []
#    for elem in elemList:
#        elemData = json.loads(py_db_read_item('ELEM', elem))
#        elemDetails.append({
#            'Key': elem,
#            'NODE_1': elemData["NODE"][0],
#            'NODE_2': elemData["NODE"][1]
#        })
#    
#    # Step 4: Write data to CSV
#    with open('c:\temp\output.csv', mode='w', newline='') as file:
#        writer = csv.writer(file)
#
#        # Write Node Info
#        writer.writerow(['Node Info'])
#        writer.writerow(['절점Key', 'x좌표값', 'y좌표값', 'z좌표값'])
#        for node in nodeDetails:
#            writer.writerow([node['Key'], node['X'], node['Y'], node['Z']])
#        
#        writer.writerow([])  # Empty row for separation
#
#        # Write Elem Info
#        writer.writerow(['Elem Info'])
#        writer.writerow(['ElemKey', 'NODE 1번 Key', 'NODE 2번 Key'])
#        for elem in elemDetails:
#            writer.writerow([elem['Key'], elem['NODE_1'], elem['NODE_2']])

    return grupDataAll

def main():
    data = py_make_curve_data()
    print('Data processed:', data)