import json

from openai import OpenAI
from PhoneValidation import phoneNumberDetails
from UrlValidation import urlValidator
from helpers import constants
import asyncio

installationId = constants.CONSTANTS['INSTALLATION_ID']

client = OpenAI(
    api_key=constants.CONSTANTS['OPENAI_API_KEY']
)


def formatResponse(data):
    name = data['data']['data'][0]['value']['name']
    city = data['data']['data'][0]['value']['addresses'][0]['city']
    score = data['data']['data'][0]['value']['score'] or "0"
    if score > 0.7:
        message = "Safe number"
    else:
        message = "Number is not safe"
    return "*This phone number belongs to* \n \n *Name*: {}\n *City*: {}\n *Scam score*: {}\n".format(name, city, score)


def formatResponseUrl(data):
    if data['isSafe'] > 0.7:
        return "*Safe to visit this url*, To get complete report check it out in our dashboard"
    else:
        return "*NOT SAFE TO VISIT*, Might be scam or phising link"


async def whatsappAssistant(message):
    messages = [{"role": "system", "content": "You are a Rajasthan cyber crime awareness Whatsapp bot created by "
                                              "Team_Kavach(Reg id: RJPOLICE_HACK_846) for Rajasthan police hackathon, "
                                              "You will be"
                                              "capable of checking URLs, False advertisements, Phone numbers, "
                                              "email addresses, and you can also be used to report cyber crimes via "
                                              "voice notes also. You should respond in their language alone,"
                                              "for example if they message in hindi reply in hindi"},
                {"role": "user", "content": message}
                ]
    tools = [
        {
            "type": "function",
            "function": {
                "name": "search_phone_numbers",
                "description": "Get detailed information about a phone number. Also it checks if this phone number is "
                               "potentially a scam or not protecting user safety, The function's response contains "
                               "it's scam score rated from 0 to 1, 0 being not scam and 1 being scam, phone number "
                               "owner name in the value field, a number can be a scammer if he has a high score in "
                               "the value field",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "phoneNumbers": {
                            "type": "string",
                            "description": "Phone number"
                        },
                    },
                    "required": ["phoneNumber"],
                },
            },
        },
        {
            "type": "function",
            "function": {
                "name": "check_url",
                "description": "Check the given URL for authenticity and potential security risks.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "url": {
                            "type": "string",
                            "description": "URL to be checked"
                        },
                    },
                    "required": ["url"],
                },
            },
        }
    ]

    response = client.chat.completions.create(
        model="gpt-3.5-turbo-1106",
        messages=messages,
        tools=tools,
        tool_choice="auto",
    )

    response_message = response.choices[0].message
    tool_calls = response_message.tool_calls

    if tool_calls:

        available_functions = {
            "search_phone_numbers": phoneNumberDetails.search_phone_numbers,
            "check_url": urlValidator.analyzeUrl
        }
        messages.append(response_message)

        for tool_call in tool_calls:
            function_name = tool_call.function.name
            function_to_call = available_functions[function_name]
            function_args = json.loads(tool_call.function.arguments)

            if asyncio.iscoroutinefunction(function_to_call):
                function_response = await function_to_call(**function_args)
            else:
                function_response = function_to_call(**function_args)

            if tool_call.function.name == "search_phone_numbers":
                return formatResponse(function_response)
            elif tool_call.function.name == "check_url":
                return formatResponseUrl(function_response)

    else:
        return response_message.content


async def transcribe(mp3_file_path):
    with open(mp3_file_path, "rb") as audio_file:
        # Call the OpenAI API to transcribe the audio using Whisper API
        whisper_response = client.audio.transcriptions.create(
            file=audio_file,
            model="whisper-1",
            response_format="text",
        )
        print(f"""
            Transcribed the voice note to the following text: {whisper_response}.
                Now it's being sent to ChatGPT API to reply...
            """)

        return whisper_response


if __name__ == "__main__":
    asyncio.run(whatsappAssistant("+919944910314"))
