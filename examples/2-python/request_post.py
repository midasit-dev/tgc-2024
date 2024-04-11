import requests

# def -> 함수를 정의 합니다.
# def 함수명(매개변수들)의 구조를 가지고 있습니다.
# 현재 매개변수는 url, headers에 포함될 mapiKey값, body가 있습니다.
def post(url, mapiKey, id, x, y, z):
  # headers 구성하기
  headers = {
    'MAPI-Key': mapiKey
  }
  
  # body 구성하기
  # body는 아래와 같은 형태로 구성되어야 합니다.
  # body = {
  #   "Assign": {
  #     "1": { "X": 0, "Y": 0, "Z": 0 }
  #   }
  # }
  body = {
    "Assign": {
      id: { "X": x, "Y": y, "Z": z }
    }
  }
  
  # 실제 POST 요청을 수행 합니다.
  response = requests.post(url=url, headers=headers, json=body)
  
  # 반환된 응답이 ok가 아니면, 실패한 이유를 출력 해줍니다.
  # status_code가 200번대가 아니라면 일반적으로 실패 입니다.
  # 실패한 이유는 text를 통해 출력 합니다.
  if response.ok == False:
    print(f'Error: {response.status_code} / {response.text}')
    return {}
  else: 
    return response.json()
  
print('post 함수가 정의 되었습니다.')