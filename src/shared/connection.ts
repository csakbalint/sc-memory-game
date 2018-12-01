import 'reflect-metadata';
import * as mongoose from 'mongoose';
import * as assert from 'assert';

import { config } from '../config';

assert(config.mongodb, 'Missing database configuration');

export const connection = mongoose.createConnection(config.mongodb, {
  useNewUrlParser: true,
});
