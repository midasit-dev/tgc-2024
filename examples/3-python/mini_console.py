# 이전에 정의했던 함수를 import 합니다.
from request_set import *

# 종료를 위한 시스템 함수를 import 합니다.
import sys

# API 요청을 위한 기본 정보들을 정의 합니다.
endpoint = 'https://moa-engineers.midasit.com/civil'
target = '/db/node'
url = endpoint + target
# Civil NX로부터 얻어온 API Key를 미리 입력 해줍니다.
mapiKey = 'eyJ1ciI6ImtoMTAxMkBtaWRhc2l0LmNvbSIsInBnIjoiY2l2aWwiLCJjbiI6IkFSejNvNDdBU0EifQ.9f8ef7d4f1dba1d70fd90d64402bf4c16d45546a841d917a0353a3088d4a1bd0'

# 사용자가 선택할 수 있는 옵션을 딕셔너리로 정의 합니다.
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
██████╗ ███████╗ ██████╗ ██╗   ██╗███████╗███████╗████████╗
██╔══██╗██╔════╝██╔═══██╗██║   ██║██╔════╝██╔════╝╚══██╔══╝
██████╔╝█████╗  ██║   ██║██║   ██║█████╗  ███████╗   ██║   
██╔══██╗██╔══╝  ██║▄▄ ██║██║   ██║██╔══╝  ╚════██║   ██║   
██║  ██║███████╗╚██████╔╝╚██████╔╝███████╗███████║   ██║   
╚═╝  ╚═╝╚══════╝ ╚══▀▀═╝  ╚═════╝ ╚══════╝╚══════╝   ╚═╝  			 
''')
	
	# 옵션을 출력 합니다.
	print('OPTIONS을 선택하세요!')
	for key, value in dict_index_name.items():
		print(f'{key}. {value}') # 1. POST, 2. GET, ...

	# 무한 반복을 통해 사용자의 입력을 받습니다.
	while True:

		# 사용자의 입력을 받습니다.
		selected = input('숫자를 입력하세요:')
		selected_name = ''
		
		# selected가 dictionary key 범위 안에 있는지 검사를 합니다.
		if selected in dict_index_name.keys():
			selected_name = dict_index_name[selected]
		print('선택된 값 :', selected_name)
		
		# POST (생성할 절점에 대한 정보 필요)
		if selected_name == 'POST':
			id = int(input('id:'))
			x = int(input('x:'))
			y = int(input('y:'))
			z = int(input('z:'))
			data = post(url=url, mapiKey=mapiKey, id=id, x=x, y=y, z=z)
			print(data)
		# PUT (변경할 값에 대한 정보 필요)
		elif selected_name == 'PUT':
			id = int(input('id:'))
			x = int(input('x:'))
			y = int(input('y:'))
			z = int(input('z:'))
			data = put(url=url, mapiKey=mapiKey, id=id, x=x, y=y, z=z)
			print(data)
		# GET
		elif selected_name == 'GET':
			data = get(url=url, mapiKey=mapiKey)
			print(data)
		# DELETE
		elif selected_name == 'DELETE':
			id = int(input('id:'))
			data = delete(url=url, mapiKey=mapiKey, id=id)
			print(data)
		# EXIT (sys.exit() 함수를 사용하여 종료)
		elif selected_name == 'EXIT':
			sys.exit()
		# 그 외의 값이 들어온 경우 에러 메시지를 출력 합니다.
		else:
			print('잘못된 입력입니다. 다시 시도하세요!')
	
main()