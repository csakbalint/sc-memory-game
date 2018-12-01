import { Module } from '@nestjs/common';
import { GameController } from './controllers/game.controller';
import { GameService } from './services/game.service';
import { ScoreService } from './services/score.service';
import { ScoreController } from './controllers/score.controller';

@Module({
  imports: [],
  controllers: [GameController, ScoreController],
  providers: [GameService, ScoreService],
})
export class AppModule {}
