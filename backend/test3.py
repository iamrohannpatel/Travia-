import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

models_to_test = ['gemini-1.5-flash', 'gemini-1.5-flash-latest', 'gemini-pro', 'gemini-1.0-pro']

for m in models_to_test:
    try:
        model = genai.GenerativeModel(m)
        res = model.generate_content("hello")
        print(f"{m}: SUCCESS")
    except Exception as e:
        print(f"{m}: FAILED {str(e)[:50]}")
