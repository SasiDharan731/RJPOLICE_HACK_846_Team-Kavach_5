from datetime import datetime

from flask import Flask, request, jsonify
from UrlValidation import urlValidator
from PhoneValidation import phoneNumberDetails
from helpers import constants
from config import db
from SubmitReport import reportSubmission
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
myDb = db.connectToDB()
installationId = constants.CONSTANTS['INSTALLATION_ID']


# This endpoint is used for the validation of the URL of any site
@app.route('/getUrlScore', methods=['POST'])
def getUrlScore():
    data = request.get_json()
    url = data['url']

    url_score, report = urlValidator.analyzeUrl(url)

    if url_score > 0.70:
        message = "Url is safe to visit"
    else:
        message = "Url is risky"

    return jsonify({'url_score': url_score, 'message': message, 'report': report})


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



if __name__ == '__main__':
    app.run(host='0.0.0.0')
