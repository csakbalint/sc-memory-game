import { gameRepository, Game, Status } from './game.model';

describe('Game Model', () => {
  beforeEach(async () => {
    await gameRepository.remove({});
  });
  it('should create games properly', async () => {
    const game = await gameRepository.create({
      pictures: ['a', 'b'],
      createdBy: 'first',
    });
    expect(typeof game.token).toBe('string');
    expect(game.status).toBe(Status.Pending);
    expect(game.winner).toBe(null);
    expect(game.joined).toBe(null);
  });
  it('should find game by token', async () => {
    const { token, _id } = ((await gameRepository.create({
      pictures: ['a', 'b'],
      createdBy: 'first',
    })) as any) as Game;

    const game = await gameRepository.findOne({ token });
    expect(game._id.toString()).toBe(_id.toString());
  });
});
