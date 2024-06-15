import requests


# header를 만들어주는 함수
def getHeaders(mapiKey):
  return {
    'MAPI-Key': mapiKey
  }
# body를 만들어주는 함수
def getBody(id, x, y, z):
  return {
      "Assign": {
        id: { "X": x, "Y": y, "Z": z }
      }
  }
# response를 처리해주는 함수 (에러 처리 포함)
def responseHandler(response):
  if response.ok == False:
    print(f'Error: {response.status_code} / {response.text}')
    return {}
  else:
    return response.json()
# 각 method별 함수들
def post_nodes1(url,mapiKey,dic):
  js_dic = {"Assign": {nid:{"X":loc[0],"Y":loc[1],"Z":loc[2]} for nid,loc in dic.items()}}
  requests.post(url=url,headers=getHeaders(mapiKey),json=js_dic)

def import_elements(model,url,mapiKey):
    elem_dic = dict()
    counter = 0
    for eid,element in sorted(model.elements.items()):
        nids=[0,0,0,0,0,0,0,0]
        counter+=1
        if element.type == 'CQUAD4':
            nids[0:4]=element.node_ids[0:4]
            elem_dic[eid]={'TYPE':'PLATE','SECT':1,'MATL':1,'ANGLE':0,'STYPE':1,'NODE':nids}
        elif element.type == 'CQUAD8':
            nids[0:4]=element.node_ids[0:4]
            elem_dic[eid]={'TYPE':'PLATE','SECT':1,'MATL':1,'ANGLE':0,'STYPE':1,'NODE':nids}
        elif element.type == 'CTRIA3':
            nids[0:3]=element.node_ids[0:3]
            elem_dic[eid]={'TYPE':'PLATE','SECT':1,'MATL':1,'ANGLE':0,'STYPE':1,'NODE':nids}
        elif element.type == 'CHEXA':
            nids[0:3]=element.node_ids[0:3]
            elem_dic[eid]={'TYPE':'SOLID','SECT':0,'MATL':1,'NODE':nids}
        elif element.type == 'CTETRA':
            nids[0:8]=element.node_ids[0:4]
            elem_dic[eid]={'TYPE':'SOLID','SECT':0,'MATL':1,'NODE':nids}
        elif element.type == 'CPENTA':
            nids[0:8]=element.node_ids[0:6]
            elem_dic[eid]={'TYPE':'SOLID','SECT':0,'MATL':1,'NODE':nids}
        if(counter%10011==0):
            res=requests.post(url=url,headers=getHeaders(mapiKey),json={"Assign":elem_dic})
            elem_dic=dict()
    res=requests.post(url=url,headers=getHeaders(mapiKey),json={"Assign":elem_dic})
    print(res)

def post(url, mapiKey, id, x, y, z):
  response = requests.post(
    url=url,
    headers=getHeaders(mapiKey),
    json=getBody(id, x, y, z)
  )
  return responseHandler(response)
def put(url, mapiKey, id, x, y, z):
  response = requests.put(
    url=url,
    headers=getHeaders(mapiKey),
    json=getBody(id, x, y, z)
  )
  return responseHandler(response)
def get(url, mapiKey):
  response = requests.get(
    url=url,
    headers=getHeaders(mapiKey)
  )
  return responseHandler(response)
def delete(url, mapiKey, id):
  response = requests.delete(
    url=url + f'/{id}',
    headers=getHeaders(mapiKey)
  )
  return responseHandler(response)
