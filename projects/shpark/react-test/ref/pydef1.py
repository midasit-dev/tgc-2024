from js import document, XMLHttpRequest
from pyodide import create_proxy
import json
from pyNastran.bdf.bdf import BDF
import os

endpoint = 'https://moa-engineers.midasit.com/civil'
targetnode = '/db/node'
targetelem = '/db/elem'
urlnode = endpoint + targetnode
urlelem = endpoint + targetelem
mapiKey = 'eyJ1ciI6Im1hbm5lcjQiLCJwZyI6ImNpdmlsIiwiY24iOiIwLWhYd1hkSFJBIn0.ca1688e2c65f22e5ad4246115648856f9b361248d524f2b1adb5f51dd79b76eb'

def getHeaders(mapiKey):
    return {
        'MAPI-Key': mapiKey,
        'Content-Type': 'application/json'
    }

def getBody(id, x, y, z):
    return {
        "Assign": {
          id: { "X": x, "Y": y, "Z": z }
        }
    }    

def post(url, headers, jsonObj):
    xhr = XMLHttpRequest.new()
    xhr.open("POST", url, False)
    for key, value in headers.items():
        xhr.setRequestHeader(key, value)
    xhr.send(json.dumps(jsonObj))
    json.loads(xhr.responseText)

def post_nodes(url,mapkey,dic):
    headers=getHeaders(mapkey)
    js_dic = {'Assign': {nid:{'X':loc[0],'Y':loc[1],'Z':loc[2]} for nid,loc in dic.items()}}
    xhr = XMLHttpRequest.new()
    xhr.open("POST", url, False)
    for key, value in headers.items():
        xhr.setRequestHeader(key, value)
    xhr.send(json.dumps(js_dic))
    return json.loads(xhr.responseText)

def read_nastran(bdf_file):
    model = BDF()
    model.read_bdf(bdf_file)
    os.remove(bdf_file)
    return model
 
def import_nodes(model):
    node_dic = {nid:node.xyz for nid,node in sorted(model.nodes.items())}		    
    post_nodes(urlnode,mapiKey,node_dic)

def post_elems(url,mapkey,dic):
    headers=getHeaders(mapkey)
    js_dic = {'Assign': dic}
    xhr = XMLHttpRequest.new()
    xhr.open("POST", url, False)
    for key, value in headers.items():
        xhr.setRequestHeader(key, value)
    xhr.send(json.dumps(js_dic))
    return json.loads(xhr.responseText)

def import_elements(model):
    elem_dic = dict()
    counter = 0
    for eid,element in sorted(model.elements.items()):
        nids=[0,0,0,0,0,0,0,0]
        counter+=1
        if element.type == 'CQUAD4':
            nids[0:4]=element.nodes[0:4]
            elem_dic[eid]={'TYPE':'PLATE','SECT':1,'MATL':1,'ANGLE':0,'STYPE':1,'NODE':nids}
        elif element.type == 'CQUAD8':
            nids[0:4]=element.nodes[0:4]
            elem_dic[eid]={'TYPE':'PLATE','SECT':1,'MATL':1,'ANGLE':0,'STYPE':1,'NODE':nids}
        elif element.type == 'CTRIA3':
            nids[0:3]=element.nodes[0:3]
            elem_dic[eid]={'TYPE':'PLATE','SECT':1,'MATL':1,'ANGLE':0,'STYPE':1,'NODE':nids}
        elif element.type == 'CTRIA6':
            nids[0:3]=element.nodes[0:3]
            elem_dic[eid]={'TYPE':'PLATE','SECT':1,'MATL':1,'ANGLE':0,'STYPE':1,'NODE':nids}
        elif element.type == 'CHEXA':
            nids[0:8]=element.nodes[0:8]
            elem_dic[eid]={'TYPE':'SOLID','SECT':0,'MATL':1,'NODE':nids}
        elif element.type == 'CTETRA':
            nids[0:4]=element.nodes[0:4]
            elem_dic[eid]={'TYPE':'SOLID','SECT':0,'MATL':1,'NODE':nids}
        elif element.type == 'CPENTA':
            nids[0:6]=element.nodes[0:6]
            elem_dic[eid]={'TYPE':'SOLID','SECT':0,'MATL':1,'NODE':nids}   
        if(counter%10011==0):
            res=post_elems(urlelem,mapiKey,elem_dic)
            elem_dic=dict() 
    return post_elems(urlelem,mapiKey,elem_dic)

async def process_file(event):
    fileList = event.target.files.to_py()
    for f in fileList:
        data = await f.text()
        f = open('testfile.txt', 'w')
        f.write(data)
        f.close()
    model = read_nastran('testfile.txt')
    import_nodes(model)
    import_elements(model)
    
    document.getElementById("content").innerHTML = "success"

def main():
    file_event = create_proxy(process_file)
    
    e = document.getElementById("myfile")
    e.addEventListener("change", file_event, False)    

main()