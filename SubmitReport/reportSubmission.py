from openai import OpenAI

client = OpenAI(
    api_key="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"
)


def submitReport(report, db):
    collection = db.userReports
    incident = {
        "category": report['category'],
        "subCategory": report['subCategory'],
        "incidentDateTime": report['incidentDateTime'],
        "incidentPlatform": report['incidentPlatform'],
        "description": report['description'],
        "imageUrl": report['imageUrl'],
        "voiceTranscript": report['voiceTranscript']
    }

    result = collection.insert_one(incident)

    return result


def transcribeReport(message):
    pass


def submitPhoneNumberReport(report, db):
    collection = db.phoneNumberReports

    result = collection.insert_one(report)

    return result
