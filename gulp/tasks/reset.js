import del from 'del';

export function reset() {
  return del(app.path.clean);
}
