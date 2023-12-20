from pymongo import MongoClient
from helpers import constants

connection_string = constants.CONSTANTS['MONGO_URI']


def connectToDB():
    client = MongoClient(connection_string)
    print("Connected to MongoDB")
    db = client.reports
    return db
