import requests
import json

search = (str(input('검색어를 입력하세요: ')))
base_url = 'https://openapi.naver.com'
endpoint = '/v1/search/blog.json'
queries  = f'?display=10&start=1&sort=sim&query={search}'
request_url = base_url + endpoint + queries

print('데이터를 처리중입니다 ...')
response = requests.get(request_url, headers={
		'X-Naver-Client-Id': '_ZmCg8dq6yF7ryeYonjh',
		'X-Naver-Client-Secret': 'y4gNuvrnkE',
		'Content-Type': 'application/json'
	})
result = response.json()
print('데이터 처리가 완료 되었습니다.')


print('\n사용 가능한 키워드 목록: ')
keys = list(result['items'][0].keys())
for key in keys: 
	print(f'>> {key}')
keyword = str(input(f'필터링할 키워드를 입력하세요: '))

filtered = []
for item in result['items']:
	if not keyword in item:
		print('\n키워드가 존재하지 않습니다.')
		break
	else:
		filtered.append(item[keyword])

print('\n필터링된 데이터: ')
print(json.dumps(filtered, indent=2, ensure_ascii=False))