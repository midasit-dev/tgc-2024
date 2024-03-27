# + Code
# 응답 결과에 따라 예외를 추가 합니다.
# 200번은 성공, 나머지는 실패라고 가정 합니다.

import requests

base_url = 'https://jsonplaceholder.typicode.com'
endpoint = '/posts/abcdefg'
request_url = base_url + endpoint

# 동일한 구조에서 다음과 같이 status_code에 대한 예외를 추가할 수 있습니다.
response = requests.get(request_url)
if response.status_code == 200:
	print('Success!')
else:
	print(f'Error: {response.status_code}')
