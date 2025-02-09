curl -X POST -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzkyYWE2ZmQ3NWI3NjdhNTUyZTJkYzMiLCJpYXQiOjE3MzgyNjMyNzB9.Wvz7QK6544Jfp3ll4bPCQ48m3w5Ut_q2O050Xbl-Xog' -H 'Content-Type: application/json' -d '{
        "image": "https://i.pinimg.com/736x/f9/56/b2/f956b2a0b4c294ded596c0130a7955ca.jpg",
        "text": "its me again"
    }' http://localhost:8080/posts -v

    