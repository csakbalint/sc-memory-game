import { Schema, Document } from 'mongoose';
import { values as _values } from 'lodash';

import { connection } from '../shared/connection';

export interface Score {
  steps: number;
  seconds: number;
  name: string;
  token: string;
}

const ScoreSchema = new Schema({
  steps: {
    type: Number,
    required: true,
  },
  seconds: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

// updatedAt, createdAt properties are required
ScoreSchema.set('timestamps', true);
// remove versionKey (__v)
ScoreSchema.set('versionKey', false);

export const scoreRepository = connection.model<Score & Document>(
  'Score',
  ScoreSchema,
);
