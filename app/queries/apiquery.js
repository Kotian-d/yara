import api from "../model/apis";
import ConnectDB from "../db/connectDb";

export async function getApiData() {
  await ConnectDB();
  const Api = await api
    .find()
    .select(
      "-operator -dth_api_method -prepaid_api_method -createdAt -updatedAt -__v -recharge_response"
    );
  return Api;
}

export async function getApiById(params) {
    await ConnectDB();
    const Api = await api.findOne({id: params});
    return Api;
    
}