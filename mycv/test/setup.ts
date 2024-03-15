import { rm } from 'fs/promises';
import { join } from 'path';

// configuramos essa função no .json do arquivo jest, para definir um "beforeEach" de escopo Global
global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'test.sqlite'));
  } catch (error) {}
});
