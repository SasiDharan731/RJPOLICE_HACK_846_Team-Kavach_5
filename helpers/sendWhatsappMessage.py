from twilio.rest import Client

account_sid = "ACafa5dd6f66dac1e97e894923ca8da35a"
auth_token = "9a2f52afd3c4cc25f19772fa260d9044"
client = Client(account_sid, auth_token)

twilio_number = "+14155238886"


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

