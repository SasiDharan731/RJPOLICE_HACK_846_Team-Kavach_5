
async def submitReport(report, db):
    collection = db.userReports
    data_to_save = {
        "name": "John Doe",
        "age": 30,
        "email": "john.doe@example.com"
    }

    # Insert a single document into the collection
    result = await collection.insert_one(data_to_save)

    return result
