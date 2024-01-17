import re

from bs4 import BeautifulSoup
from flask import Flask, request, jsonify
from UrlValidation import urlValidator
from PhoneValidation import phoneNumberDetails
from helpers import constants, sendWhatsappMessage
from config import db
from SubmitReport import reportSubmission
from flask_cors import CORS
from twilio.twiml.messaging_response import MessagingResponse
from AiAssistant import assistant
import requests
from PIL import Image
import pytesseract
from io import BytesIO

app = Flask(__name__)
CORS(app)
myDb = db.connectToDB()
installationId = constants.CONSTANTS['INSTALLATION_ID']

@app.route('/', methods=['GET'])
def health():
    return jsonify({"data": "OK"})


# This endpoint is used for the validation of the URL of any site
@app.route('/getUrlScore', methods=['POST'])
def getUrlScore():
    data = request.get_json()
    url = data['url']

    response = urlValidator.analyzeUrl(url)

    if response["isSafe"] > 0.70:
        message = "Url is safe to visit"
    else:
        message = "Url is risky"

    return jsonify({'url_score': response["isSafe"], 'message': message, 'report': response["report"]})


@app.route('/getPhoneNumberDetails', methods=['POST'])
async def getPhoneNumberDetails():
    data = request.get_json()
    phoneNumber = data['phoneNumber']

    search_result = await phoneNumberDetails.search_phone_numbers(phoneNumber, '+91', installationId)

    for i, result in enumerate(search_result['data']['data']):
        try:
            name = result['value']['name']
        except (AttributeError, IndexError, KeyError):
            result['value']['name'] = "Unknown Name"

    return jsonify(search_result['data'])


@app.route('/voiceIncidentReport', methods=['POST'])
def submitVoiceReport():
    data = request.get_json()
    response = reportSubmission.transcribeReport(data['message'])
    print(response.choices[0].message.content)
    return jsonify({'status': 'success', 'message': response.choices[0].message.content})


@app.route('/incidentReport', methods=['POST'])
def submitReport():
    data = request.get_json()
    response = reportSubmission.submitReport(data, myDb)
    return jsonify({'status': 'success', 'message': 'Report submitted successfully', 'id': str(response.inserted_id)})


@app.route('/whatsappMessage', methods=['POST'])
async def whatsappMessage():
    # Fetch the message
    msg = request.form.get('Body')

    # Create reply
    resp = MessagingResponse()
    reply = await assistant.whatsappAssistant(msg)
    print("reply:", reply)
    resp.message(reply)

    return str(resp)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True)
