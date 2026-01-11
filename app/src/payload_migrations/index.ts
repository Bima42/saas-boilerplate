import * as migration_20260111_215658 from './20260111_215658';
import * as migration_20260111_220004 from './20260111_220004';

export const migrations = [
  {
    up: migration_20260111_215658.up,
    down: migration_20260111_215658.down,
    name: '20260111_215658',
  },
  {
    up: migration_20260111_220004.up,
    down: migration_20260111_220004.down,
    name: '20260111_220004'
  },
];
