import JWT, { TokenExpiredError } from "jsonwebtoken";

export const generateAccessToken = async (userId) => {
  return JWT.sign({}, process.env.JWT_SECRET, {
    expiresIn: "1h",
    audience: userId,
    issuer: "yara",
  });
};

export const generateRefreshToken = async (userId) => {
  return JWT.sign({}, process.env.JWT_SECRET, {
    expiresIn: "1y",
    audience: userId,
    issuer: "yara",
  });
};

export const verifyAccessToken = async (token) => {
  return JWT.verify(token, process.env.JWT_SECRET);
};

export const verifyRefreshToken = async (token) => {
  return JWT.verify(token, process.env.JWT_SECRET);
};
