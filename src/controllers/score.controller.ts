import {
  Controller,
  Inject,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  Get,
} from '@nestjs/common';
import { IsString, IsInt, Min } from 'class-validator';

import { ScoreService } from '@src/services/score.service';

export class SubmitScoreRequest {
  @IsInt()
  @Min(1)
  readonly steps: number;

  @IsInt()
  @Min(1)
  readonly seconds: number;

  @IsString()
  readonly name: string;

  @IsString()
  readonly token: string;
}

@Controller('score')
export class ScoreController {
  constructor(@Inject('ScoreService') private scoreService: ScoreService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  submitScore(@Body() params: SubmitScoreRequest) {
    return this.scoreService.submitScore(params);
  }

  @Get()
  fetchScores() {
    return this.scoreService.fetchHighestScores();
  }
}
