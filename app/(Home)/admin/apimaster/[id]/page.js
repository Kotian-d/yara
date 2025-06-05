import { getApiById } from "@/app/queries/apiquery";
import { getOperatorData } from "@/app/queries/operatorquery";
import AddApiForm from "../components/apiform";

const page = async({params}) => {
    const { id } = await params;
    const formdata = await getApiById(id);
    const operators = await getOperatorData();

  return (
    <div>
      <AddApiForm title={"Edit API"} formdata={JSON.parse(JSON.stringify(formdata))} operators={JSON.parse(JSON.stringify(operators))}/>
    </div>
  )
}

export default page
