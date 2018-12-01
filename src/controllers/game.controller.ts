import {
  Controller,
  Inject,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { GameService } from 'src/services/game.service';
import { Game } from '@src/models/game.model';

import { IsString, IsInt, Min, Max, Length } from 'class-validator';

export class CreateGameRequest {
  @IsInt()
  @Min(1)
  @Max(20)
  readonly size: number;

  @IsString()
  @Length(10)
  readonly player: string;
}

@Controller('game')
export class GameController {
  constructor(@Inject('GameService') private gameService: GameService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createGame(@Body() { size, player }: CreateGameRequest): Promise<Game> {
    return this.gameService.createGame(size, player);
  }
}
