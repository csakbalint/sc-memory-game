import {
  Controller,
  Inject,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  Param,
  Put,
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

export class PickCardsRequest {
  @IsInt()
  @Min(0)
  @Max(20)
  readonly first: number;

  @IsInt()
  @Min(0)
  @Max(20)
  readonly second: number;

  @IsString()
  readonly player: string;
}

@Controller('game')
export class GameController {
  constructor(@Inject('GameService') private gameService: GameService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, forbidUnknownValues: true }))
  createGame(@Body() { size, player }: CreateGameRequest): Promise<Game> {
    return this.gameService.createGame(size, player);
  }

  @Post(':token/join')
  @UsePipes(new ValidationPipe({ transform: true, forbidUnknownValues: true }))
  joinGame(
    @Param('token') token: string,
    @Body() { player }: JoinGameRequest,
  ): Promise<Game> {
    return this.gameService.joinGame(token, player);
  }

  @Put(':token/pick')
  @UsePipes(new ValidationPipe({ transform: true, forbidUnknownValues: true }))
  pickCards(
    @Param('token') token: string,
    @Body() body: PickCardsRequest,
  ): Promise<Game> {
    return this.gameService.pickCards(token, body);
  }
}
