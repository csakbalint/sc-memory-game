# API Call Examples

There are few examples about the available endpoints and features provided by the current version of the software. You can see them below.

1. Create a game with 10 cards

```bash
curl -X "POST" "http://localhost:3000/game" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "player": "first",
  "size": 10
}'
```

_don't forget to change the tokens (provided by the first api call)_

2. Join as a second player to the game

```bash
curl -X "POST" "http://localhost:3000/game/1be9b8aa-834e-425f-b1b8-ddf8de784649/join" \
 -H 'Content-Type: application/json; charset=utf-8' \
 -d \$'{
"player": "second"
}'
```

3. by picking cards you can remove the images from the game

```bash
curl -X "PUT" "http://localhost:3000/game/1be9b8aa-834e-425f-b1b8-ddf8de784649/pick" \
 -H 'Content-Type: application/json; charset=utf-8' \
 -d \$'{
"player": "second",
"first": 0,
"second": 9
}'
```

4. submit a score to the game, the game will be closed after that

```bash
curl -X "POST" "http://localhost:3000/score" \
 -H 'Content-Type: application/json; charset=utf-8' \
 -d \$'{
"steps": 12,
"name": "second",
"seconds": 12,
"token": "1be9b8aa-834e-425f-b1b8-ddf8de784649"
}'
```

5. fetch the available scores (limit: 100)

```bash
curl "http://localhost:3000/score"
```
