import json

# Writing JSON to a file
data = {"name": "kim hyun", "age": 25, "isEmployed": True}
with open('use_sample.json', 'w') as file:
	json.dump(data, file)

# Reading JSON from a file
with open('use_sample.json', 'r') as file:
	data = json.load(file)
	print(data)
