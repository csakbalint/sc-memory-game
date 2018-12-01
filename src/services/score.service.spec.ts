import { Test, TestingModule } from '@nestjs/testing';
import { Document } from 'mongoose';
import { uniq as _uniq } from 'lodash';

import { ScoreService } from './score.service';
import { scoreRepository } from '../models/score.model';
import { Game, gameRepository, Status } from '../models/game.model';
import { GameService } from './game.service';

describe('ScoreService', () => {
  let app: TestingModule;
  let service: ScoreService;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [],
      providers: [GameService, ScoreService],
    }).compile();
  });

  beforeEach(async () => {
    service = app.get<ScoreService>(ScoreService);
  });

  describe('submit score', () => {
    let gameService: GameService;
    let game: Game & Document;
    beforeEach(async () => {
      gameService = app.get<GameService>(GameService);
      await gameRepository.deleteMany({});
      game = await gameService.createGame(20, 'first');
    });

    it('should fail if seconds are invalid', async () => {
      await expect(
        service.submitScore({
          seconds: 0, // invalid
          name: 'name',
          token: 'token',
          steps: 1,
        }),
      ).rejects.toBeTruthy();
    });

    it('should fail if steps are invalid', async () => {
      await expect(
        service.submitScore({
          seconds: 10,
          name: 'name',
          token: 'token',
          steps: 0, // invalid
        }),
      ).rejects.toBeTruthy();

      await expect(
        service.submitScore({
          seconds: 10,
          name: 'name',
          token: 'token',
          steps: 1.2, // invalid
        }),
      ).rejects.toBeTruthy();
    });

    it('should fail if game is missing', async () => {
      await expect(
        service.submitScore({
          seconds: 10,
          name: 'name',
          token: 'token', // invalid,
          steps: 10,
        }),
      ).rejects.toBeTruthy();
    });

    it('should fail if game is not active', async () => {
      await expect(
        service.submitScore({
          seconds: 10,
          name: 'name',
          token: game.token,
          steps: 10,
        }),
      ).rejects.toBeTruthy();
    });

    it('should fail if player is not participant', async () => {
      await gameRepository.updateOne(
        { token: game.token },
        { status: Status.Active },
      );

      await expect(
        service.submitScore({
          seconds: 10,
          name: 'name', // invalid
          token: game.token,
          steps: 10,
        }),
      ).rejects.toBeTruthy();

      await gameRepository.updateOne(
        { token: game.token },
        { joined: 'not-name' },
      );

      await expect(
        service.submitScore({
          seconds: 10,
          name: 'name', // invalid
          token: game.token,
          steps: 10,
        }),
      ).rejects.toBeTruthy();
    });

    it('should submit a score', async () => {
      await gameRepository.updateOne(
        { token: game.token },
        { status: Status.Active, joined: 'name' },
      );

      const { score } = await service.submitScore({
        seconds: 10,
        name: 'name',
        token: game.token,
        steps: 10,
      });
      expect(score).toBeTruthy();
    });

    it('should close the game', async () => {
      const name = 'name';
      await gameRepository.updateOne(
        { token: game.token },
        { status: Status.Active, joined: name },
      );

      const { score, game: closedGame } = await service.submitScore({
        seconds: 10,
        name,
        token: game.token,
        steps: 10,
      });
      expect(score).toBeTruthy();
      expect(closedGame.status).toBe(Status.Closed);
      expect(closedGame.winner).toBe(name);
    });
  });
});
