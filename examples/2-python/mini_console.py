# 이전에 정의했던 구문들을 import 합니다.
from request_post import post
from request_put import put
from request_get import get
from request_delete import delete

# 종료를 위한 시스템 함수를 import 합니다.
import sys

# API 요청을 위한 기본 정보들을 정의 합니다.
endpoint = 'https://moa-engineers.midasit.com/civil'
target = '/db/node'
url = endpoint + target
mapiKey = 'eyJ1ciI6ImtoMTAxMkBtaWRhc2l0LmNvbSIsInBnIjoiY2l2aWwiLCJjbiI6Im1nYU1wVUYtVHcifQ.61bc43c2e85240eabb4f5afd915374a14ba99aa6edd150e5c208a37274d1658f'

# 사용자가 선택할 수 있는 옵션을 딕셔너리로 정의 합니다.
dict_index_name = {
	'1': 'POST',
	'2': 'GET',
	'3': 'PUT',
	'4': 'DELETE',
	'5': 'EXIT'
}

# 실행 할 함수를 정의 합니다.
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
		print(f'{key}. {value}')

	# 무한 반복을 통해 사용자의 입력을 받습니다.
	while True:
		# 사용자의 입력을 받습니다.
		selected = input('숫자를 입력하세요:')
		selected_name = dict_index_name[selected]
		print('선택된 값 :', selected_name)

		# 반환된 결과를 저장할 변수를 정의 합니다.
		data = None
		if selected_name == 'POST':
			# POST는 생성할 값에 대한 정보가 추가로 필요 합니다.
			# 추가 사용자 입력을 받습니다.
			id = int(input('id:'))
			x = int(input('x:'))
			y = int(input('y:'))
			z = int(input('z:'))
			data = post(url=url, mapiKey=mapiKey, id=id, x=x, y=y, z=z)
		elif selected_name == 'GET':
			data = get(url=url, mapiKey=mapiKey)
		elif selected_name == 'PUT':
			# PUT도 마찬가지로 변경할 값에 대한 정보가 추가로 필요 합니다.
			# 추가 사용자 입력을 받습니다.
			id = int(input('id:'))
			x = int(input('x:'))
			y = int(input('y:'))
			z = int(input('z:'))
			data = put(url=url, mapiKey=mapiKey, id=id, x=x, y=y, z=z)
		elif selected_name == 'DELETE':
			# DELETE도 삭제할 ID값을 받야아 하므로 사용자 입력을 받습니다.
			id = int(input('id:'))
			data = delete(url=url, mapiKey=mapiKey, id=id)
		elif selected_name == 'EXIT':
			# 프로그램을 종료 합니다.
			sys.exit()
		else:
			# 잘못된 입력에 대해 사용자에게 알립니다.
			print('잘못된 입력입니다. 다시 시도하세요!')

		# 반환된 결과를 출력 합니다.
		print(data)
	
# 함수를 실행 합니다.
main()