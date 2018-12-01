import * as convict from 'convict';

const mongoConfig = convict({
  host: {
    doc: 'Database host name/IP',
    format: '*',
    default: 'localhost',
    env: 'DATABASE_HOST',
  },
  port: {
    doc: 'Database host post',
    format: '*',
    default: 'localhost',
    env: 'DATABASE_PORT',
  },
  user: {
    doc: 'Database authenticaton username',
    format: String,
    default: '',
    env: 'DATABASE_USERNAME',
  },
  password: {
    doc: 'Database authenticaton password',
    format: String,
    default: '',
    env: 'DATABASE_PASSWORD',
  },
  database: {
    doc: 'Default database name',
    format: String,
    default: 'flipit',
    env: 'DATABASE_NAME',
  },
});

const { host, user, password, port, database } = mongoConfig.get();
const mongoAuth = user ? `${user}:${password}@` : '';
export const url = `mongodb://${mongoAuth}${host}:${port}/${database}`;
