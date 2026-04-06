import http.client

conn = http.client.HTTPConnection('localhost', 8000)
conn.request('POST', '/api/generate-trip', '{"destination":"Tokyo","budget":1000,"days":3,"vibe":5}', {'Content-Type':'application/json'})
res = conn.getresponse()
print("STATUS", res.status)
print("BODY", res.read().decode())
