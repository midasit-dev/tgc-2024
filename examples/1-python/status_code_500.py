import requests

base_url = 'https://httpbin.org'
endpoint = '/status'
url_path = '/500' # 서버 오류
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
elif response.status_code == 500:
	print('Internal server error.')
else:
	print(f'Error: {response.status_code}')