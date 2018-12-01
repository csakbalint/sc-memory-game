import * as assert from 'assert';
import { Injectable } from '@nestjs/common';
import { chain as _chain } from 'lodash';

import { Game, gameRepository, Status } from '../models/game.model';

@Injectable()
export class GameService {
  async createGame(size: number, player: string): Promise<Game> {
    return gameRepository.create({
      createdBy: player,
      pictures: this._generateCards(size),
    });
  }

  async joinGame(token: string, player: string): Promise<Game> {
    const game = await gameRepository.findOneAndUpdate(
      // players can join only to pending games
      { token, joined: null, status: Status.Pending },
      { joined: player, status: Status.Active },
      { new: true },
    );
    assert(game, `Missing or already running game ${token}`);
    return game;
  }

  revealCard(cardId: string, player: string): Promise<Game> {
    return null;
  }

  fetchGame(gameId: string): Promise<Game> {
    return null;
  }

  _finishGame(game: Game): Promise<Game> {
    return null;
  }

  _generateCards(size: number) {
    assert(!(size % 2) && size > 0, 'Invalid number for generating cards');
    return _chain(size / 2) // take the half of the given value
      .times(index => `https://picsum.photos/200?image=${index}`) // generate images
      .map(picture => [picture, picture]) // duplicate them
      .flatten() // flatten the array of arrays
      .shuffle() // shuffle the images
      .value();
  }
}
