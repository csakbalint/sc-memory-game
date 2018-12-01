import * as assert from 'assert';
import { Injectable } from '@nestjs/common';
import { chain as _chain } from 'lodash';

import { Game, gameRepository } from 'src/models/game.model';

@Injectable()
export class GameService {
  async createGame(size: number, player: string): Promise<Game> {
    return gameRepository.create({
      createdBy: player,
      pictures: this._generateCards(size),
    });
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
