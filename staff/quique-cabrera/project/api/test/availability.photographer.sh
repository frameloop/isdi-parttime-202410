curl -X POST http://localhost:8080/sessions/availability \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2QxZjlkNWU2YzIxMjMyZTRhZWNhYWMiLCJyb2xlIjoicGhvdG9ncmFwaGVyIiwiaWF0IjoxNzQxODE3NDU1LCJleHAiOjE3NDE4MjEwNTV9.REo2jlTpoMS1wV-Q9NakRGD_52AV2xaQGEJSbrNOXYE" \
     -d '{
           "photographer": "67d1f9d5e6c21232e4aecaac",
           "date": "2025-03-20",
           "startTime": "10:30",
           "endTime": "12:30",
           "available": true
         }'
