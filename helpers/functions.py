from language_tool_python import LanguageTool
import urllib.request
from pydub import AudioSegment
import os
import requests
import easyocr
from io import BytesIO
from PIL import Image

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


def ogg2mp3(audio_url):
    # Get the response of the OGG file
    response = requests.get(audio_url)

    # Get the redirect URL result
    url = response.url  # `url` value something like this: "https://s3-external-1.amazonaws.com/media.twiliocdn.com/<some-hash>/<some-other-hash>"
    print(url)
    # Download the OGG file
    urllib.request.urlretrieve(url, "data/audio.ogg")
    # Load the OGG file
    audio_file = AudioSegment.from_ogg("data/audio.ogg")
    # Export the file as MP3
    audio_file.export("data/audio.mp3", format="mp3")
    return os.path.join(os.getcwd(), "data/audio.mp3")


def extractTextFromImage(image_url):
    response = requests.get(image_url)
    img = Image.open(BytesIO(response.content))

    # Perform OCR using EasyOCR
    reader = easyocr.Reader(['en'])  # You can specify the language(s) you want to use
    result = reader.readtext(img)

    # Extract and concatenate the recognized text
    text = ' '.join([entry[1] for entry in result])

    return text
