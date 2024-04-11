import requests

def get(url, mapiKey):
	# headers 구성하기
	headers = {
		'MAPI-Key': mapiKey,
	}

	# 실제 GET 요청을 수행 합니다.
	response = requests.get(url=url, headers=headers)

	# post와 마찬가지로 예외를 추가 해줍니다.
	if response.ok == False:
		print(f'Error: {response.status_code} / {response.text}')
		return {}
	else:
		return response.json()
	
# 함수 정의에 대한 설명을 추가 합니다.
print('get 함수가 정의 되었습니다.')