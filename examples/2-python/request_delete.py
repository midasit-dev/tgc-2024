import requests

# 특정 ID를 삭제하기 위해 ID 값도 매개변수로 받습니다.
def delete(url, mapiKey, id):
	# 특정 ID를 지우기 위해 URL에 ID값을 추가 합니다.
	url = f'{url}/{id}'

	# headers 구성하기
	headers = {
		'MAPI-Key': mapiKey
	}

	# DELETE 요청은 body가 필요 없습니다.
	response = requests.delete(url=url, headers=headers)

	if response.ok == False:
		print(f'Error: {response.status_code} / {response.text}')
		return {}
	else:
		return response.json()
	
print('delete 함수가 정의 되었습니다.')