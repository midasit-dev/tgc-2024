import requests

def put(url, mapiKey, id, x, y, z):
	# headers 구성하기
	headers = {
		'MAPI-Key': mapiKey
	}

	# post와 마찬가지로 body를 가집니다. (동일한 형태로 구성)
	# 변경할 데이터에 대해 정의 합니다.
	# body는 아래와 같은 형태로 구성되어야 합니다.
	# body = {
	#   "Assign": {
	#     "1": { "X": 0, "Y": 0, "Z": 0 }
	#   }
	# }
	body = {
		"Assign": {
			id: { "X": x, "Y": y, "Z": z }
		}
	}

	# 실제 PUT 요청을 수행 합니다.
	response = requests.put(url=url, headers=headers, json=body)
	if response.ok == False:
		print(f'Error: {response.status_code} / {response.text}')
		return {}
	else:
		return response.json()

print('put 함수가 정의 되었습니다.')