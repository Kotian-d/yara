import ConnectDB from "../db/connectDb";
import api from "../model/apis";
import operator from "../model/operators";


export async function getOperatorData() {
  await ConnectDB();
  const data = await operator
    .find().sort({name: 1})
    .populate(["api1", "api2", "api3", "api4", "api5","planapi"])
    .select("-createdAt")
    .lean();
  return data;
}