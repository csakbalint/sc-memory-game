import { Envs, convict } from './config';

export interface config {
  env: Envs;
  host: string;
  port: number;
  mongodb: string;
}

convict.validate({ allowed: 'strict' });

export const config: config = convict.get();
