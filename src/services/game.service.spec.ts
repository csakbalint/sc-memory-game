import { Test, TestingModule } from '@nestjs/testing';
import { spy, SinonSpy } from 'sinon';
import { uniq as _uniq, lastIndexOf as _lastIndexOf } from 'lodash';

import { GameService } from './game.service';
import { gameRepository, Status, Game } from '../models/game.model';
import { Document } from 'mongoose';

describe('GameService', () => {
  let app: TestingModule;
  let service: GameService;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [],
      providers: [GameService],
    }).compile();
  });

  beforeEach(async () => {
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
      const player = 'first';
      const game = await service.createGame(size, player);
      expect(game.createdBy).toBe(player);
      expect(game.pictures.length).toBe(size);
      expect(generateCards.calledOnce).toBe(true);
    });
  });

  describe('join game', () => {
    it('should fail if game is missing', async () => {
      await expect(service.joinGame('invalid_token', '')).rejects.toBeTruthy();
    });

    it('should fail if the game is already started', async () => {
      const { token } = await service.createGame(20, 'first');
      await gameRepository.updateOne({ token }, { joined: 'second' });
      await expect(service.joinGame(token, 'third')).rejects.toBeTruthy();
      await gameRepository.updateOne(
        { token },
        { joined: null, status: Status.Active },
      );
      await expect(service.joinGame(token, 'third')).rejects.toBeTruthy();
    });

    it('should run well', async () => {
      const secondPlayer = 'second';
      const { token } = await service.createGame(20, 'first');
      const game = await service.joinGame(token, secondPlayer);
      expect(game.joined).toBe(secondPlayer);
      expect(game.status).toBe(Status.Active);
    });
  });

  describe('pick cards', () => {
    let game: Game & Document;
    beforeEach(async () => {
      const { token } = await service.createGame(20, 'first');
      game = await service.joinGame(token, 'second');
    });

    it('should remove cards if the given positions were correct', async () => {
      const first = 0;
      const second = _lastIndexOf(game.pictures, game.pictures[first]);
      const updatedGame = await service.pickCards(game.token, {
        player: 'second',
        first,
        second,
      });
      expect(updatedGame.pictures.length).toBe(18);
    });
  });

  describe('generate cards', () => {
    it('should fail if invalid number', () => {
      expect(() => service._generateCards(0)).toThrowError();
    });

    it('should generate duplicated images', () => {
      const cards = service._generateCards(10);
      expect(cards.length).toBe(_uniq(cards).length * 2);
    });

    it('should generate the exact amount of images', () => {
      expect(service._generateCards(10).length).toBe(10);
    });
  });
});
