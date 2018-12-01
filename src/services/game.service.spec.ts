import { Test, TestingModule } from '@nestjs/testing';
import { spy, SinonSpy } from 'sinon';

import { GameService } from './game.service';
import { Game, gameRepository } from '../models/game.model';

describe('GameController', () => {
  let app: TestingModule;
  let service: GameService;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [],
      providers: [GameService],
    }).compile();
  });

  beforeEach(async () => {
    await gameRepository.remove({});
    service = app.get<GameService>(GameService);
  });

  describe('create game', () => {
    let generateCards: SinonSpy<[number], string[]>;

    beforeEach(() => {
      generateCards = spy(service, '_generateCards');
    });

    afterEach(() => {
      generateCards.restore();
    });

    it('should fail with invalid size', async () => {
      await expect(service.createGame(0, '')).rejects.toBeTruthy();
      await expect(service.createGame(3, '')).rejects.toBeTruthy();
    });

    it('should generate game well', async () => {
      const size = 10;
      const player = 'alma';
      const game: Game = await service.createGame(size, player);
      expect(game.createdBy).toBe(player);
      expect(game.pictures.length).toBe(size);
      expect(generateCards.calledOnce).toBe(true);
    });
  });
});
