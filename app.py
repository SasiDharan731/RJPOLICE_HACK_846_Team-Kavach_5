from flask import Flask, request, jsonify
from UrlValidation import urlValidator
from PhoneValidation import phoneNumberDetails
from helpers import constants
from config import db
from SubmitReport import reportSubmission

app = Flask(__name__)
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

    search_result = await phoneNumberDetails.bulk_search(phoneNumber, '+91', installationId)

    for i, result in enumerate(search_result['data']['data']):
        try:
            name = result['value']['name']
        except (AttributeError, IndexError, KeyError):
            result['value']['name'] = "Unknown Name"

    return jsonify(search_result['data'])


@app.route('/submitReport', methods=['POST'])
async def submitReport():
    data = request.get_json()
    response = await reportSubmission.submitReport(data, myDb)
    print(response)
    return "Hello"


if __name__ == '__main__':
    app.run(host='0.0.0.0')
