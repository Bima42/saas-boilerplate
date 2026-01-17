import * as migration_20260117_172041 from './20260117_172041';
import * as migration_20260117_174230 from './20260117_174230';

export const migrations = [
  {
    up: migration_20260117_172041.up,
    down: migration_20260117_172041.down,
    name: '20260117_172041',
  },
  {
    up: migration_20260117_174230.up,
    down: migration_20260117_174230.down,
    name: '20260117_174230'
  },
];
