# create branch
curl -s -X POST http://localhost:3000/branches -H 'Content-Type: application/json' \
  -d '{"name":"MG Road","location":"Bengaluru","pricing":{"SEDAN":100,"SUV":150}}' | jq

# add car
curl -s -X POST http://localhost:3000/branches/1/cars -H 'Content-Type: application/json' \
  -d '{"carType":"SEDAN","registrationNo":"KA01AA0001"}' | jq

# search
curl -s "http://localhost:3000/branches/1/available?carType=SEDAN&start=2025-11-28T12:00:00Z&end=2025-11-28T16:00:00Z" | jq

# book
curl -s -X POST http://localhost:3000/bookings -H 'Content-Type: application/json' \
  -d '{"userId":"u1","branchId":1,"carType":"SEDAN","start":"2025-11-28T12:00:00Z","end":"2025-11-28T16:00:00Z"}' | jq
