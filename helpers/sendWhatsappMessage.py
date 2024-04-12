from twilio.rest import Client

account_sid = "SEC"
auth_token = "SEC"
client = Client(account_sid, auth_token)

twilio_number = "SEC"


# def sendMessage(to, message):
#     print("Sending message to", to, message)
#     data = client.messages.create(
#         body=message,
#         from_='whatsapp:+14155238886',
#         to='whatsapp:+919944910314'
#     )
#
#     return data

def send_message(to_number, body_text):
    try:
        message = client.messages.create(
            from_=f"whatsapp:{twilio_number}",
            body=body_text,
            to=to_number
        )
        print(f"Message sent to {to_number}: {message.body}")
    except Exception as e:
        print(f"Error sending message to {to_number}: {e}")

