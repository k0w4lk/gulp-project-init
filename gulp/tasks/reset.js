import { deleteAsync } from 'del';
import { appConfig } from '../config/app.js';

export function reset() {
  return deleteAsync(appConfig.path.clean);
}
