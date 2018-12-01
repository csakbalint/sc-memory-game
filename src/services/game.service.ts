import * as assert from 'assert';
import { Injectable } from '@nestjs/common';
import { chain as _chain, difference as _difference } from 'lodash';

import { gameRepository, Status } from '../models/game.model';

export interface PickCardsParams {
  player: string;
  first: number;
  second: number;
}

@Injectable()
export class GameService {
  async createGame(size: number, player: string) {
    return gameRepository.create({
      createdBy: player,
      pictures: this._generateCards(size),
    });
  }

  async joinGame(token: string, player: string) {
    const game = await gameRepository.findOneAndUpdate(
      // players can join only to pending games
      { token, joined: null, status: Status.Pending },
      { joined: player, status: Status.Active },
      { new: true },
    );
    assert(game, `Missing or already running game ${token}`);
    return game;
  }

  async fetchGame(token: string) {
    return gameRepository.findOne({ token });
  }

  async pickCards(token: string, { player, first, second }: PickCardsParams) {
    let game = await gameRepository.findOne({ token });
    assert(game, `Missing game ${token}`);
    assert(
      game.createdBy === player || game.joined === player,
      `You are not a participant`,
    );
    assert(
      first >= 0 && first < game.pictures.length,
      `Invalid picture position`,
    );
    assert(
      second >= 0 && second < game.pictures.length,
      `Invalid picture position`,
    );
    if (game.pictures[first] === game.pictures[second]) {
      let pictures = _difference(game.pictures, [game.pictures[first]]);
      game = await gameRepository.findOneAndUpdate(
        { token },
        { $set: { pictures } },
        { new: true },
      );
    }
    return game;
  }

  async finishGame(token: string, player: string) {
    return gameRepository.findOneAndUpdate(
      { token },
      { winner: player, status: Status.Closed },
      { new: true },
    );
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
