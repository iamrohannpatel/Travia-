import http.client, json

conn = http.client.HTTPConnection('localhost', 8000)
body = json.dumps({"destination":"Tokyo","budget":1000,"days":3,"vibe":3,"travelers":2})
conn.request('POST', '/api/generate-trip', body, {'Content-Type':'application/json'})
res = conn.getresponse()
data = res.read().decode()
print(f"STATUS: {res.status}")
if res.status == 200:
    parsed = json.loads(data)
    print(f"trip_id: {parsed.get('trip_id')}")
    print(f"packages count: {len(parsed['data'].get('packages', []))}")
    print(f"itinerary count: {len(parsed['data'].get('itinerary', []))}")
    print("FULL PIPELINE SUCCESS!")
else:
    print(f"ERROR: {data[:500]}")
