# Call Stack

import requests

# depth functions
def depth3():
	pass

def depth2():
	depth3()

def depth1():
	depth2()

def runDepths():
	depth1()

# main logic
def get_todo_data():
	# Get the response from the API endpoint.
	response = requests.get('https://jsonplaceholder.typicode.com/todos/1')
	result = response.json()
	return result

def main():
	runDepths()
	result = get_todo_data()
	print(result['userId'])
	print(result['id'])
	print(result['title'])
	print(result['completed'])

main()