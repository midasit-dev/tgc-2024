import requests

base_url = 'https://httpbin.org'
endpoint = '/status'
url_path = '/404' # 리소스를 찾을 수 없는 상태 코드
request_url = base_url + endpoint + url_path

response = requests.get(request_url)
if response.status_code == 200:
	print('Success!')
elif response.status_code == 401:
	print('Unauathorized. Authentication required.')
elif response.status_code == 403:
	print('Forbidden. Access denied.')
elif response.status_code == 404:
	print('Resource not found.')
else:
	print(f'Error: {response.status_code}')