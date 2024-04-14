import requests

# header를 만들어주는 함수
def getHeaders(mapiKey):
  return {
    'MAPI-Key': mapiKey
	}

# body를 만들어주는 함수
def getBody(id, x, y, z):
  return {
		"Assign": {
			id: { "X": x, "Y": y, "Z": z }
		}
	}

# response를 처리해주는 함수 (에러 처리 포함)
def responseHandler(response):
	if response.ok == False:
		print(f'Error: {response.status_code} / {response.text}')
		return {}
	else: 
		return response.json()

# 각 method별 함수들
def post(url, mapiKey, id, x, y, z):
  response = requests.post(
    url=url,
    headers=getHeaders(mapiKey),
    json=getBody(id, x, y, z)
  )
  
  return responseHandler(response)
  
def put(url, mapiKey, id, x, y, z):
  response = requests.put(
    url=url,
    headers=getHeaders(mapiKey),
    json=getBody(id, x, y, z)
  )
  
  return responseHandler(response)
  
def get(url, mapiKey):
  response = requests.get(
    url=url,
    headers=getHeaders(mapiKey)
  )
  
  return responseHandler(response)
  
def delete(url, mapiKey, id):
  response = requests.delete(
    url=url + f'/{id}',
    headers=getHeaders(mapiKey)
  )
  
  return responseHandler(response)