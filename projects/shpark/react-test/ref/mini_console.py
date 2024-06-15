from request_set import *
import sys
import pyNastran
from pyNastran.bdf.bdf import BDF

endpoint = 'https://moa-engineers.midasit.com/civil'
targetnode = '/db/node'
targetelem = '/db/elem'
urlnode = endpoint + targetnode
urlelem = endpoint + targetelem
# Civil NX로부터 얻어온 API Key를 미리 입력 해줍니다.
mapiKey = 'eyJ1ciI6Im1hbm5lcjQiLCJwZyI6ImNpdmlsIiwiY24iOiIwLWhYd1hkSFJBIn0.ca1688e2c65f22e5ad4246115648856f9b361248d524f2b1adb5f51dd79b76eb'

dict_index_name = {
  '1': 'POST',
  '2': 'GET',
  '3': 'PUT',
  '4': 'DELETE',
  '5': 'EXIT'
}

def main():
  # 제목을 출력 합니다.
  print('''
REQUEST API CONSOLE
''')
  print('OPTIONS을 선택하세요!')
  for key, value in dict_index_name.items():
    print(f'{key}. {value}') # 1. POST, 2. GET, ...
		
    
  model = BDF()
  model.read_bdf('spring.bdf')
  #for nid,node in sorted(model.nodes.items()):
  #  print(nid, node.xyz)
  node_dic = {nid:node.xyz for nid,node in sorted(model.nodes.items())}
  post_nodes1(urlnode,mapiKey,dic=node_dic)

  import_elements(model,urlelem,mapiKey)
		#post(url=url,mapiKey=mapiKey, id=nid, x=node.xyz[0],y=node.xyz[1],z=node.xyz[2])
	#for eid,element in sorted(model.elements.items()):
	#	print(eid, element.type)
    #data = post(url=url, mapiKey=mapiKey, id=id, x=x, y=y, z=z)
    
	
main()
