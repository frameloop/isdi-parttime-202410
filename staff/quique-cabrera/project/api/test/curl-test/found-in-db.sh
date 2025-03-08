curl -s -X GET http://localhost:8080/users/customers | jq '.[] | {name, username,}'

curl -s -X GET http://localhost:8080/users/customers | jq

