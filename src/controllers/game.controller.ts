import {
  Controller,
  Inject,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  Param,
} from '@nestjs/common';
import { IsString, IsInt, Min, Max } from 'class-validator';

import { GameService } from '../services/game.service';
import { Game } from '../models/game.model';

export class CreateGameRequest {
  @IsInt()
  @Min(1)
  @Max(20)
  readonly size: number;

  @IsString()
  readonly player: string;
}

export class JoinGameRequest {
  @IsString()
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

  @Post(':token/join')
  @UsePipes(new ValidationPipe({ transform: true }))
  joinGame(
    @Param('token') token: string,
    @Body() { player }: JoinGameRequest,
  ): Promise<Game> {
    return this.gameService.joinGame(token, player);
  }
}
