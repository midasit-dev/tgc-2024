# status code for the request
import requests

# case 1 (200, 404)
base_url_1 = 'https://jsonplaceholder.typicode.com'
endpoint_1 = '/posts/1'
request_url_1 = base_url_1 + endpoint_1

# case 2 (401, 403, 404, 500)
base_url_2 = 'https://httpbin.org'
endpoint_2 = '/status'
request_url_2 = base_url_2 + endpoint_2

# request_url을 1과 2로 변경해보면서 테스트 해보세요.
# response = requests.get(request_url_2, '/401')
response = requests.get(request_url_2 + '/500')

# 200번대 일반적으로 성공 코드
if response.status_code == 200:
	print('Success!')
# 400번대 일반적으로 Client 오류 (request에 대한)
elif response.status_code == 401: # 인증 필요 상태 코드
	print('Unauthorized. Authentication required.')
elif response.status_code == 403: # 접근 거부 상태 코드
	print('Forbidden. Access denied.')
elif response.status_code == 404: # 리소스를 찾을 수 없는 상태 코드
	print('Resource not found.')
# 500 번대 일반적으로 서버 에러 상태 코드
elif response.status_code == 500: # 서버 오류
	print('Server error')
else:
	print(f'Error: {response.status_code}')