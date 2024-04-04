import os
import sys
import requests
import pandas as pd
from node_ctrl_util import ErrorMessage, StringSupport, print_json_table

# request URL
base_url = 'https://moa-engineers.midasit.com'
endpoint = '/civil/db/node'
request_url = base_url + endpoint

# API Key를 입력 받아 저장 합니다.
mapikey = str(input('API Key를 입력하세요:'))
def get_headers():
	return {
		'Content-Type': 'application/json',
		'MAPI-Key': mapikey,
	}

# 사용자 정보를 출력 합니다.
def print_user_information():
	res_mapikey = requests.get(url=base_url + '/mapikey/verify', headers=get_headers())
	if res_mapikey.status_code != 200:
		raise ErrorMessage('API Key가 유효하지 않습니다.')
	verify_data = res_mapikey.json()

	StringSupport.enter()
	print('\\ [ USER INFORMATION ]')
	print('\\ user'.ljust(15), verify_data["user"])
	print('\\ program'.ljust(15), verify_data["program"])
	print('\\ keyVerified'.ljust(15), verify_data["keyVerified"])
	print('\\ status'.ljust(15), verify_data["status"])
	StringSupport.enter()

	if not verify_data['status'] == 'connected':
		raise ErrorMessage('API Key가 연결 상태가 아닙니다.')

# get 동작을 정의 합니다.
def process_get():
	print('Node 정보를 가져옵니다.')
	# BUG: 이 주석 아래에 GET 요청을 작성하세요.
	# GET 요청 (url, headers 포함)
	# util에 있는 print_json_table 함수 이용
	pass

# post 동작을 정의 합니다.
def process_post():
	print('Node 정보를 생성합니다.')
	process_get()
	StringSupport.enter()

	print('ex) 1, 0, 0, 0')
	body_str = str(input('ID, X, Y, Z 값 입력: '))
	body_arr = body_str.strip().split(',')
	if len(body_arr) < 4:
		print('입력된 값이 잘못 되었습니다.')
		pass
	else:
		# BUG: 이 주석 아래에 POST 요청을 작성하세요.
		# POST 요청 (url, headers, body 포함)
		# body 생성에 대한 설명
			# body 형태: { 'Assign': { 'ID': { 'X': X, 'Y': Y, 'Z': Z } } }
			# body_arr의 형태: [ 'ID', 'X', 'Y', 'Z' ] -> 각 값은 strip()으로 공백 제거
			# body_arr의 값은 int로 변환하여 사용
			# Postman의 POST Node API 요청을 참고하여 작성
		# python에서는 body를 json의 변수에 넣어야 합니다.
		# response = requests.post(url=request_url, headers=get_headers(), json=body)
		pass

# put 동작을 정의 합니다.
def process_put():
	print('Node 정보를 수정합니다.')
	process_get()
	StringSupport.enter()

	print('ex) 1, 0, 0, 0')
	body_str = str(input('ID, X, Y, Z 값 입력: '))
	body_arr = body_str.strip().split(',')
	if len(body_arr) < 4:
		print('입력된 값이 잘못 되었습니다.')
	else:
		# BUG: 이 주석 아래에 PUT 요청을 작성하세요.
		# PUT 요청 (url, headers, body 포함)
		# body 생성에 대한 설명은 POST와 동일
		pass

# delete 동작을 정의 합니다.
def process_delete():
	print('Node 정보를 삭제합니다.')
	process_get()
	StringSupport.enter()
	
	# BUG: 이 주석 아래에 DELETE 요청을 작성하세요.
	# DELETE 요청 (url, headers 포함)
	# 삭제할 Node ID를 입력 받아 특정 Node 정보를 삭제합니다
	pass

# 텍스트 변환 https://patorjk.com/software/taag/#p=display&f=Calvin%20S&t=node-controller
while True:
	try:
		# 터미널을 모두 지웁니다.
		os.system('cls')
		
		# 제목을 출력 합니다.
		print('''
┌┐┌┌─┐┌┬┐┌─┐  ┌─┐┌─┐┌┐┌┌┬┐┬─┐┌─┐┬  ┬  ┌─┐┬─┐
││││ │ ││├┤   │  │ ││││ │ ├┬┘│ ││  │  ├┤ ├┬┘
┘└┘└─┘─┴┘└─┘  └─┘└─┘┘└┘ ┴ ┴└─└─┘┴─┘┴─┘└─┘┴└─ By TGC 2024
--------------------------------------------------------''')
		# User 정보를 출력 합니다.
		print_user_information()

		# 옵션을 출력 합니다.
		StringSupport.liner()
		options = [ '1: GET', '2: POST', '3: PUT', '4: DELETE', '5: EXIT' ]
		print(f'\\ {', '.join(options)}')
		sel_option = int(input("\\ 옵션을 선택하세요 (숫자 입력): "))

		# 옵션 값 에러 확인!
		if not 1 <= sel_option <= len(options):
			raise ErrorMessage('유효하지 않은 옵션 값을 입력 하였습니다.')

		sel_option_value = options[sel_option - 1]
		print('\\ 입력된 옵션 값:', sel_option_value, '\n')

		# 옵션 값에 따라 처리 합니다.
		if sel_option_value == '1: GET':
			process_get()
		if sel_option_value == '2: POST':
			process_post()
		if sel_option_value == '3: PUT':
			process_put()
		if sel_option_value == '4: DELETE':
			process_delete()
		if sel_option_value == '5: EXIT':
			print('프로그램을 종료 합니다.')
			sys.exit()

		# 사용자가 아무 키나 입력할 때 까지 대기 합니다.
		input('\n아무 키나 입력하세요...')

	except ErrorMessage as e:
			# 에러 메시지 출력
			print(f'\n[error] {e.message}')
			print('[error] 프로그램이 종료 됩니다.')
			sys.exit()
		