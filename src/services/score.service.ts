import * as assert from 'assert';
import { isInteger as _isInteger } from 'lodash';
import { Injectable } from '@nestjs/common';

import { Score, scoreRepository } from '../models/score.model';
import { GameService } from './game.service';
import { Status } from '@src/models/game.model';

@Injectable()
export class ScoreService {
  constructor(private readonly gameService: GameService) {}

  fetchHighestScores(limit = 100) {
    return scoreRepository
      .find()
      .sort({ steps: -1, seconds: -1 })
      .limit(limit)
      .exec();
  }

  async submitScore(params: Score) {
    const { token, name, seconds, steps } = params;
    assert(seconds > 0, `Invalid seconds`);
    assert(steps > 0 && _isInteger(steps), `Invalid steps`);
    let game = await this.gameService.fetchGame(token);
    // I could do the assertion logic on database level
    assert(game, `Missing game ${token}`);
    assert(game.status === Status.Active, `Game ${token} is not active`);
    assert(
      game.createdBy === name || game.joined === name,
      `You are not a participant`,
    );

    const score = await scoreRepository.create(params);
    game = await this.gameService.finishGame(token, name);
    return { score, game };
  }
}
