import { scoreRepository, Score } from './score.model';

describe('Score Model', () => {
  beforeAll(async () => {
    await scoreRepository.remove({});
  });

  it('should fail if any property is missing', async () => {
    await expect(scoreRepository.create({})).rejects.toBeTruthy();
    await expect(scoreRepository.create({ steps: 0 })).rejects.toBeTruthy();
    await expect(
      scoreRepository.create({ steps: 0, name: '123' }),
    ).rejects.toBeTruthy();
    await expect(
      scoreRepository.create({ steps: 0, name: '123', seconds: 12 }),
    ).rejects.toBeTruthy();
  });

  it('should create score', async () => {
    const score = await scoreRepository.create({
      steps: 10,
      name: 'player',
      seconds: 10,
      token: 'a-valid-token',
    });
    expect(score).toBeTruthy;
  });
});
