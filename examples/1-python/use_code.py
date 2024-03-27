import json

# Parsing JSON
json_string = '{	"name": "John Doe",	"age": 30,	"isEmployed": true}'
parsed = json.loads(json_string)
print(parsed)

# use Dictionary
print('current name', parsed['name'])
parsed['name'] = 'kim hyun'
print('new name', parsed['name'])
print (parsed)

# Generating JSON
data = {"name": "John Doe", "age": 30, "isEmployed": True}
json_string = json.dumps(data)
print(json_string)

# not use json_string
json_string['name'] = 'kim hyun'
