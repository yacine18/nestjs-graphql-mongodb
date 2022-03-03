import * as jwt from 'jsonwebtoken';

const secretKey = "@MLKM~#'poop1234";
// const publicKey = "@MLKM~#'poop1234";

export function signJwt(payload: string) {
  return jwt.sign({ payload }, secretKey, { expiresIn: '1d' });
}

export function decode(token: string) {
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, secretKey);

    return decoded;
  } catch (error) {
    console.error(`error`, error);
    return null;
  }
}
