# SC-MEMORY-GAME

Your task is to make a REST API for a basic card-matching game, the kind that your brother/sister/best friend always cheated at when you were little. In case you need a reminder, here’s how it should work.

As you can see, I wrote this code in Typescript, I hope you don't mind.

I built this server with [nestjs](https://nestjs.com/) because I haven't used it so far and I really love [IoC](https://en.wikipedia.org/wiki/Inversion_of_control). I also used Jest (not mocha), because it came with the starter kit.

They also provided a simple starter kit (as you can see), which I decided to use here. I also used one of my previous code responsible for the database connection, but apart from this, anything else is fresh and new.

I made a [README](./API_EXAMPLES.md) file with a few examples of each endpoints of the api, please have a look at it.

## Achievments

- [x] Allow a client to start a new game with the exact amount of cards to show “face down”.
- [x] Allow a client to submit a user’s score (pay attention to validation and fraud detection, too!)
- [x] Allow a client to fetch the all time high score results.
- [x] Allow another client to join a created game (real-time multiplayer feature).
- [x] A client sets up a new game, and the server sends a unique game identifier to this client. Another client can connect to this exact game using this ID.
- [x] There should be 2 clients connected to the same game in real-time to start a match.
- [ ] During an ongoing match between 2 clients, if the active client - i.e. whose turn it is in the game - does not interact with the system for 10 seconds, the turn is automatically passed back to the other client.
- [ ] The client who finds more pairs is the winner.
- [x] The client who submit its score is the winner.
- [x] Implement some kind of testing for these features.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

```bash
npm run mongodb # (optional, see below)
git clone https://github.com/csakbalint/sc-memory-game.git
npm run init
npm run start
```

### Prerequisites

Please make sure to have an up-and-running docker machine on your computer. If not, see [this link](https://github.com/docker/docker-install) or run a local mongodb instance on your localhost:27017.

I used Node.js v10.13, you'll also need one (preferably this version).

### Installing

A step by step series of examples that tell you how to get a development env running

To start the app in develop mode, run the following command

```
npm run start:dev
```

To run tests, call the following command

```
npm run test
```

or

```
npm run test:watch
```

## Deployment

I didn't work on the deployment, because writing code with Typescript in TDD isn't the fastest thing on my list, but I'd add a PM2 as a cheap solution. I'd also use the free plan by MongoLab.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
