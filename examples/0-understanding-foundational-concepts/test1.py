# interactive Console

import requests

# Get the response from the API endpoint.
# Get Google main page HTML.
response = requests.get('https://google.com');
print(response.text)