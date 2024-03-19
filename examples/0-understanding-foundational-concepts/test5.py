import requests
import json

search = '테스트'
url = f'https://openapi.naver.com/v1/search/blog.json?display=10&start=1&sort=sim&query={search}'
response = requests.get(url, headers={
	'X-Naver-Client-Id': '_ZmCg8dq6yF7ryeYonjh',
	'X-Naver-Client-Secret': 'y4gNuvrnkE',
	'Content-Type': 'application/json'
})

result = response.json()
result
