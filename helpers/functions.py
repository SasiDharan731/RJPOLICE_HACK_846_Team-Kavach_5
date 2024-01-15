from language_tool_python import LanguageTool

import requests

url = "https://google-reverse-image-api.vercel.app/reverse"
data = {"imageUrl": "https://fastly.picsum.photos/id/513/200/300.jpg?hmac=KcBD-M89_o9rkxWW6PS2yEfAMCfd3TH9McppOsf3GZ0"}

response = requests.post(url, json=data)

if response.ok:
    print(response.json())
else:
    print(response.status_code)



def has_grammar_errors(text):
    tool = LanguageTool('en-US')
    matches = tool.check(text)
    return len(matches) > 0


text_with_errors = "Hi Joe"
has_errors = has_grammar_errors(text_with_errors)

print(has_errors)
