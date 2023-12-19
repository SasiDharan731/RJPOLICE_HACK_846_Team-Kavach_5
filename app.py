from flask import Flask, request, jsonify
from UrlValidation import urlValidator

app = Flask(__name__)

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


if __name__ == '__main__':
    app.run()
