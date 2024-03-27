import requests
import json

search = str(input('검색어를 입력하세요: '))
base_url = 'https://openapi.naver.com'
endpoint = '/v1/search/blog.json'
queries  = f'?display=10&start=1&sort=sim&query={search}'
request_url = base_url + endpoint + queries

response = requests.get(request_url, headers={
		'X-Naver-Client-Id': '_ZmCg8dq6yF7ryeYonjh',
		'X-Naver-Client-Secret': 'y4gNuvrnkE',
		'Content-Type': 'application/json'
	})
result = response.json()

filtered = []
for item in result['items']:
  filtered.append(item['title'])
  
print(json.dumps(filtered, indent=2, ensure_ascii=False))