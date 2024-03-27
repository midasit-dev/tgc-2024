import requests

base_url = 'https://httpbin.org'
endpoint = '/status'
url_path = '/403' # 접근 거부 상태 코드
request_url = base_url + endpoint + url_path

response = requests.get(request_url)
if response.status_code == 200:
	print('Success!')
elif response.status_code == 401:
	print('Unauathorized. Authentication required.')
elif response.status_code == 403: 		# add line
	print('Forbidden. Access denied.') 	# add line
else:
	print(f'Error: {response.status_code}')