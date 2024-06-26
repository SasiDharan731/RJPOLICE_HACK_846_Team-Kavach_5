import httpx


async def search_phone_numbers(phoneNumbers, countryCode="+91", installationId="a1i0f--kQhQRuko-oqjI50-JegXSHqrCS9E_fSKaEqmr9hAzxkumx0Z3B76sN9Vu"):
    headers = {
        "content-type": "application/json; charset=UTF-8",
        "accept-encoding": "gzip",
        "user-agent": "Truecaller/11.75.5 (Android;10)",
        "Authorization": f"Bearer {installationId}"
    }
    params = {
        "q": str(phoneNumbers),
        "countryCode": countryCode,
        "type": 14,
        "placement": "SEARCHRESULTS,HISTORY,DETAILS",
        "encoding": "json"
    }
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                "https://search5-noneu.truecaller.com/v2/bulk", params=params, headers=headers
            )
        response.raise_for_status()

        print(response.json(), "Hello")

        return {
            "status_code": response.status_code,
            "data": response.json()
        }
    except httpx.HTTPError as exc:
        error_message = "An HTTP error occurred: " + str(exc)
        return {
            "status_code": exc.response.status_code if hasattr(exc, "response") else None,
            "error": "HTTP Error",
            "message": error_message
        }
