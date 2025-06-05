import React from "react";
import AddApiForm from "../components/apiform";
import { getOperatorData } from "@/app/queries/operatorquery";

const AddApi = async () => {
  const operators = await getOperatorData();
  return <AddApiForm title={"Add API"} operators={JSON.parse(JSON.stringify(operators))}/>;
};

export default AddApi;
