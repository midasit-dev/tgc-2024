import requests

base_url = 'https://jsonplaceholder.typicode.com'
endpoint = '/posts/1'
request_url = base_url + endpoint

# 응답 객체를 만듭니다.
response = requests.get(request_url)

# 동일하게 status_code를 찾아 봅니다.
response.status_code

# 200번이 나왔다면 위 사이트도 현재 정상적으로 응답할 수 있는 주소 값입니다.

# + Test
# 브라우저에서도 확인 해보겠습니다.
# https://jsonplaceholder.typicode.com/posts

# + Code
# 응답 결과에 따라 예외를 추가 합니다.
# 200번은 성공, 나머지는 실패라고 가정 합니다.