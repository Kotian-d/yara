export const runtime = "nodejs";
import { SignJWT, jwtVerify } from "jose";

export const generateAccessToken = async (userId) => {
  const encodedSecret = new TextEncoder().encode(process.env.JWT_SECRET); // Encode the secret key

  const jwt = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" }) // Algorithm for signing
    .setIssuedAt() // Set issued at timestamp //Set audienece
    .setExpirationTime("1m") // Token expires in 1 hour
    .sign(encodedSecret); // Sign with the secret key

  return jwt;
};

export const generateRefreshToken = async (userId) => {
  const encodedSecret = new TextEncoder().encode(process.env.JWT_SECRET); // Encode the secret key

  const jwt = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" }) // Algorithm for signing
    .setIssuedAt() // Set issued at timestamp//Set audienece
    .setExpirationTime("1y") // Token expires in 1 year
    .sign(encodedSecret); // Sign with the secret key

  return jwt;
};

export const verifyToken = async (token) => {
  const encodedSecret = new TextEncoder().encode(process.env.JWT_SECRET); // Encode the secret key

  try {
    const { payload } = await jwtVerify(token, encodedSecret);
    return payload;
  } catch (error) {
    throw new Error(error.code);
  }
};
