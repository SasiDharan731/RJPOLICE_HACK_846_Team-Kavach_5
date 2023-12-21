import json

from openai import OpenAI
from PhoneValidation import phoneNumberDetails
from helpers import constants
import asyncio

installationId = constants.CONSTANTS['INSTALLATION_ID']

client = OpenAI(
    api_key=constants.CONSTANTS['OPENAI_API_KEY']
)


async def whatsappAssistant(message):
    messages = [{"role": "system", "content": "You are a Rajasthan cyber crime awareness Whatsapp bot, You will be "
                                              "capable of checking URLs, False advertisements, Phone numbers, "
                                              "email addresses, and you can also be used to report cyber crimes via "
                                              "voice notes also"},
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
        }
        messages.append(response_message)

        for tool_call in tool_calls:
            function_name = tool_call.function.name
            function_to_call = available_functions[function_name]
            function_args = json.loads(tool_call.function.arguments)

            function_response = await function_to_call(
                phoneNumbers=function_args.get("phoneNumbers"),
                countryCode="+91",
                installationId=installationId
            )

            try:
                print("Phone number details: \n"
                      "Name : " + function_response['data']['data'][0]['value']['name'] + "\n"
                                                                                          "City : " +
                      function_response['data']['data'][0]['value']['addresses'][0]['city'] + "\n"
                                                                                              "Scam score: " + "0")
            except(KeyError, IndexError, AttributeError):
                print("Phone number details: \n"
                      "Name : " + "Unknown name" + "\n"
                                                   "City : " +
                      function_response['data']['data'][0]['value']['addresses'][0]['city'] + "\n"
                                                                                              "Scam score: " + "0")
    else:
        print(response_message.content)


if __name__ == "__main__":
    asyncio.run(whatsappAssistant("+919944910314"))
