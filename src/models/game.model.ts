import { Schema, Document } from 'mongoose';
import { v4 as generateId } from 'uuid';
import { values as _values } from 'lodash';

import { connection } from '../shared/connection';

export enum Status {
  Pending = 'Pending',
  Active = 'Active',
  Closed = 'Closed',
}

export interface Game {
  token: string;
  pictures: string[];
  status: Status;
  createdBy: string;
  joined: string;
  winner: string;
}

const GameSchema = new Schema({
  token: {
    type: String,
    default: generateId,
    unique: true,
  },
  pictures: [String],
  status: {
    type: String,
    default: Status.Pending,
    enum: _values(Status),
  },
  createdBy: {
    type: String,
  },
  joined: {
    type: String,
    default: null,
  },
  winner: {
    type: String,
    default: null,
  },
});

// updatedAt, createdAt properties are required
GameSchema.set('timestamps', true);
// remove versionKey (__v)
GameSchema.set('versionKey', false);

export const gameRepository = connection.model<Game & Document>(
  'Game',
  GameSchema,
);
