import os, traceback
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()
client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

try:
    response = client.models.generate_content(
        model='gemini-2.0-flash',
        contents='Say hello in JSON format with a key called greeting',
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
        ),
    )
    print("SUCCESS!")
    print(response.text)
except Exception as e:
    with open("error_log.txt", "w") as f:
        traceback.print_exc(file=f)
    traceback.print_exc()
