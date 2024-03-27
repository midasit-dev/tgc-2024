import requests
import json

search = str(input('검색어를 입력하세요: '))
base_url = 'https://openapi.naver.com'
endpoint = '/v1/search/kin.json'
queries  = f'?display=10&start=1&sort=sim&query={search}'
request_url = base_url + endpoint + queries

response = requests.get(request_url, headers={
		'X-Naver-Client-Id': '_ZmCg8dq6yF7ryeYonjh',
		'X-Naver-Client-Secret': 'y4gNuvrnkE',
		'Content-Type': 'application/json'
	})
result = response.json()

keywords = list(result['items'][0].keys())

print('입력 가능한 Keyword는 아래와 같습니다.')
for keyword in keywords:
	print(keyword)

keyword = str(input('키워드를 입력하세요: '))
filtered = []
if keyword in keywords:
	for item in result['items']:
		filtered.append(item[keyword])
else:
	print('키워드가 존재하지 않습니다.')

print(json.dumps(filtered, indent=2, ensure_ascii=False))