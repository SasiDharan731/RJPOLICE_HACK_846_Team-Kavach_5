from twilio.rest import Client

account_sid = "ACafa5dd6f66dac1e97e894923ca8da35a"
auth_token = "9a2f52afd3c4cc25f19772fa260d9044"
client = Client(account_sid, auth_token)


def sendMessage(to, message):
    client.messages.create(
        body=message,
        from_='whatsapp:+14155238886',
        to=to
    )
