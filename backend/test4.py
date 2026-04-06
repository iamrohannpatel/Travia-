import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

try:
    models = genai.list_models()
    for m in models:
        print(m.name)
except Exception as e:
    print("FAILED TO LIST MODELS:", e)
