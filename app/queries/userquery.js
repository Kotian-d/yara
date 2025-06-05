import bcrypt from "bcryptjs";
import users from "../model/users";
import ConnectDB from "../db/connectDb";

export async function getUserFromDb(params) {
  await ConnectDB();
  const user = await users.findOne({$or: [{mobile: params}, {email: params}]});
  return user;
}

export async function isValidUser(password, pwHash) {
  await ConnectDB();
  const isValid = await bcrypt.compare(password, pwHash);
  return isValid;
}

export async function saltAndHashPassword(password) {
  await ConnectDB();
  const pwHash = await bcrypt.hash(password, 10);
  return pwHash;
}

export async function getUserByEmail(params) {
  await ConnectDB();
  const user = await users.findOne({email: params});
  return user;
}

export async function getUserByMobile(params) {
  await ConnectDB();
  const user = await users.findOne({mobile: params});
  return user;
}

export async function getUserByToken(params) {
  await ConnectDB();
  const user = await users.findOne({api_token: params});
  return user;
}