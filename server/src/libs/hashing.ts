import * as bcrypt from 'bcrypt';

export async function encrypt(text: string, salt = 10) {
  return await bcrypt.hash(text, salt);
}

export async function compare(text: string, hash: string) {
  return await bcrypt.compare(text, hash);
}
