# Interactive Console & Debugger

import requests

# Get the response from the API endpoint.
response = requests.get('https://jsonplaceholder.typicode.com/todos/1')
print(response.text)

result = response.json()
print(result['userId'])
print(result['id'])
print(result['title'])
print(result['completed'])