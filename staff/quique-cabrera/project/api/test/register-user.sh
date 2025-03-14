curl -X POST -H 'Content-Type: application/json' -d '{"name":"Open IA","email":"open@ia.com","phone":"555555555","username":"open","password":"A3x9zLp8Q1", "role":"administrator"}' http://localhost:8080/users -v




curl -X POST http://localhost:8080/admin/photographers \
-H "Content-Type: application/json" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2Q0NzA1NzBjYjk1NTg4MjA4NzZhYTkiLCJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImlhdCI6MTc0MTk4Nzg0OCwiZXhwIjoxNzQxOTkxNDQ4fQ.5X3rTKnVB0v0Za1P4F7ZzRdVgnhtbkxUc9tGAXHZFO8" \
-d '{
    "name": "Ned Flanders",
    "username": "flanders",
    "email": "ned@flanders.es",
    "phone": "123456789",
    "password": "A3x9zLp8Q1",
    "coverage_area": "Springfield"
}'