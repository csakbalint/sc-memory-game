import 'dotenv/config';
import * as Convict from 'convict';
import { values as _values } from 'lodash';

import { url as mongoDefaultUrl } from './mongodb';

export enum Envs {
  Test = 'test',
  Development = 'development',
  Production = 'production',
}

export const convict = Convict({
  env: {
    doc: 'The current environment of the app',
    format: String,
    enum: _values(Envs),
    default: Envs.Development,
    env: 'NODE_ENV',
  },
  host: {
    doc: 'The host on which the server should run.',
    format: String,
    default: 'localhost',
    env: 'HOST',
  },
  port: {
    doc: 'The port on which the server should run.',
    format: 'port',
    default: 1337,
    env: 'PORT',
  },
  mongodb: {
    doc: 'mongo url',
    format: String,
    default: mongoDefaultUrl,
    env: 'DATABASE_URL',
  },
});
