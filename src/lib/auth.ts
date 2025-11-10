import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "7d";

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET environment variable");
}

const SECRET = JWT_SECRET as jwt.Secret;
const SIGN_OPTIONS: SignOptions = {
  expiresIn: JWT_EXPIRES_IN as unknown as number,
};

export function signJwt(payload: Record<string, unknown>) {
  return jwt.sign(payload, SECRET, SIGN_OPTIONS);
}

export function verifyJwt<T>(token: string) {
  return jwt.verify(token, SECRET) as T;
}

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export function comparePassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

export const AUTH_COOKIE_NAME = "ai_fitness_auth";

