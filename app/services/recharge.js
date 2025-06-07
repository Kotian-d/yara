import { NextResponse } from "next/server";
import operator from "../model/operators";
import siteconfig from "../model/siteconfig";
import transactions from "../model/transactions";
import { getUserByToken } from "../queries/userquery";
import apis from "../model/apis";

export default async function recharge(mn, amt, opcode, api_token) {
  const user = await getUserByToken(api_token);

  if (!user) return { status: "error", message: "Unauthorized User" };

  const _operator = await operator
    .findOne({ opcode })
    .populate(["api1", "api2", "api3", "api4", "api5"]);

  //check for
  if (!_operator)
    return {
      status: "error",
      message: "Invalid operator code",
    };

  //check for operator enbaled
  if (!_operator.isenabled)
    return {
      status: "error",
      message: "Operator Down",
    };

  console.log(user);
  //check for user balance
  if (user.balance < amt) {
    return {
      status: "error",
      message: `Insufficient Balance, your balance is ${user.balance}`,
    };
  }
  //check for blocked denomination
  if (_operator.denomination.split(",").includes(amt)) {
    return {
      status: "error",
      message: `denomination Blocked`,
    };
  }

  //check for sameamount pending txn
  const issameamount = true;
  if (issameamount) {
    const ispending = await transactions.findOne({
      $and: [{ number: mn }, { status: "PENDING" }, { amount: amt }],
    });

    if (ispending) {
      return {
        status: "error",
        message:
          "Given number Transation with same amount is already in pending",
      };
    }
  } else {
    const ispending = await transactions
      .findOne({ number: mn })
      .where("status", "PENDING");

    if (ispending) {
      return {
        status: "error",
        message: "Given number Transation is already in pending",
      };
    }
  }

  //check for success retries
  const config = await siteconfig.findOne({});
  const successretry = config.successRetry;

  const foundTx = await transactions.findOne({
    $and: [{ number: mn }, { status: "SUCCESS" }, { amount: amt }],
  });

  if (foundTx) {
    if (
      Math.floor(
        (new Date().getTime() - Date.parse(foundTx.createdAt)) / 60000
      ) < successretry
    ) {
      return {
        status: "error",
        message: `Frequent recharge with ${successretry} minutes is banned`,
      };
    }
  }

  const req_id = "74" + Math.floor(Math.random() * 90000000 + 10000000) + "100";

  await transactions.create({
    number: mn,
    amount: amt,
    operator: _operator._id,
    req_id: req_id,
    userId: user._id,
  });

  for (let i = 1; i <= Number(config.numberOfApiRoutes); i++) {
    try {
      let api = eval(`_operator.api${i}`);

      if (!api) throw Error("failed");
      if (api.isStopRecharge)
        return { status: "error", message: "Operator Blocked" };

      const [opparam] = api?.operator?.filter((op) => {
        if (op.opcode == opcode) return op;
      });

      console.log(`loop ${i}`);
      const url = api[`${_operator.providertype.toLowerCase()}api`]
        .replace("@param1", api.param1)
        .replace("@mn", mn)
        .replace("@amt", amt)
        .replace("@reqid", req_id)
        .replace("@opparam1", opparam.opparam1);

      let res;
      const method = api[`${_operator.providertype.toLowerCase()}_api_method`];

      if (method === "GET") {
        res = await fetch(`${api.host}${url}`, {
          method: api[`${_operator.providertype.toLowerCase()}_api_method`],
        });
      }

      if (method === "POST") {
        res = await fetch(`${api.host}${url.split("?")[0]}`, {
          method: method,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: url.split("?")[1],
        });
      }

      if (api.recharge_response.response_type === "JSON") {
        const data = await res.json();
        const status_field = api.recharge_response.status_field;
        const txid_field = api.recharge_response.opid_field;
        const remark_field = api.recharge_response.remark_field;
        const apirefid_field = api.recharge_response.apirefid_field;
        const balance_field = api.recharge_response.balance_field;
        const success_key = api.recharge_response.success_key;
        const failure_key = api.recharge_response.failure_key;
        const pending_key = api.recharge_response.pending_key;

        const status = eval(`data.${status_field}`);
        const txid = eval(`data.${txid_field}`);
        const balance = eval(`data.${balance_field}`);
        const message = eval(`data.${remark_field}`);

        console.log(data);

        if (status === failure_key) {
          await transactions.findOneAndUpdate(
            { req_id: req_id },
            {
              status: "failed",
              txn_id: txid,
              api: api._id,
              remark: message,
            }
          );
          throw Error(JSON.stringify({
            number: mn,
            amount: amt,
            status: "failed",
            txn_id: txid,
          }));
        }

        await transactions.findOneAndUpdate(
          { req_id: req_id },
          {
            status: "success",
            txn_id: txid,
            api: api._id,
          }
        );
        return { data, status: 200 };
      }
    } catch (error) {
      if (i === Number(config.numberOfApiRoutes)) {
        return { status: "failed", message: error.message };
      }
      if(eval(`_operator.api${i +1}`).isStopRecharge){
        return { status: "failed", message: error.message };
      }
      if (error.message === "") {
        return { status: "failed", message: error.message };
      }
    }
  }
}
