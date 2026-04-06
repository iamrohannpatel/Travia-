import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# Supabase (via HTTPX)
import httpx

# Gemini (google-genai SDK)
from google import genai
from google.genai import types

load_dotenv()

app = FastAPI(title="WanderStack API")

# Configure CORS for local frontend (adding typical Vite ports)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", "http://127.0.0.1:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Supabase configuration
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")
if SUPABASE_URL and SUPABASE_KEY:
    print("Supabase configuration ready.")

# Initialize Gemini
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
gemini_client = None
if GEMINI_API_KEY:
    gemini_client = genai.Client(api_key=GEMINI_API_KEY)
    print("Gemini client initialized.")

class TripRequest(BaseModel):
    destination: str
    budget: float
    travelers: int
    days: int
    vibe: int

@app.post("/api/generate-trip")
async def generate_trip(request: TripRequest):
    if not gemini_client:
        raise HTTPException(status_code=500, detail="Gemini API key not configured on the server.")

    system_prompt = f"You are an expert travel API. The user is going to {request.destination} for {request.days} days with {request.travelers} travelers. Their total budget is ${request.budget} and vibe level is {request.vibe}/5. Return STRICTLY a JSON object. NO markdown formatting. The JSON must have: 'packages' (an array of 3 objects, each with a 'name' field being one of 'Shoestring', 'Sweet Spot', or 'Splurge', and containing daily 'hotel', 'food', 'transit', and 'total' as numbers) and 'itinerary' (an array of {request.days} objects containing 'day' as a number, 'title' as a string, 'description' as a string, and 'tags' as an array of strings)."

    try:
        response = gemini_client.models.generate_content(
            model='gemini-2.5-flash',
            contents=system_prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
            ),
        )
        
        # Parse the JSON response securely
        generated_data = json.loads(response.text)
        
        # Insert into Supabase if configured using REST API
        trip_id = None
        if SUPABASE_URL and SUPABASE_KEY:
            db_payload = {
                "destination": request.destination,
                "budget": request.budget,
                "days": request.days,
                "vibe": request.vibe,
                "packages": generated_data.get("packages", []),
                "itinerary": generated_data.get("itinerary", [])
            }
            try:
                headers = {
                    "apikey": SUPABASE_KEY,
                    "Authorization": f"Bearer {SUPABASE_KEY}",
                    "Content-Type": "application/json",
                    "Prefer": "return=representation"
                }
                with httpx.Client() as client:
                    sb_response = client.post(
                        f"{SUPABASE_URL}/rest/v1/trips",
                        json=db_payload,
                        headers=headers
                    )
                    
                    if sb_response.status_code < 300:
                        sb_data = sb_response.json()
                        if len(sb_data) > 0:
                            trip_id = sb_data[0].get("id")
                    else:
                        print(f"Supabase REST API Error: {sb_response.status_code} - {sb_response.text}")
            except Exception as db_err:
                print(f"Warning: Failed to insert trip into Supabase: {db_err}")
                
        return {
            "trip_id": trip_id,
            "data": generated_data
        }
    except Exception as e:
        print(f"Error generating trip: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def read_root():
    return {"message": "Welcome to the WanderStack API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
