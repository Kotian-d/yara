import RoutingTable from "@/app/(Home)/admin/components/routingtable";
import operator from "@/app/model/operators";
import { getApiData } from "@/app/queries/apiquery";
import siteconfig from "@/app/model/siteconfig";
import ConnectDB from "@/app/db/connectDb";

const providerSetting = async () => {
  await ConnectDB();
  const operatordata = await operator
    .find()
    .populate(["api1", "api2", "api3", "api4", "api5", "planapi"])
    .sort("opcode")
    .lean();
  const apidata = await getApiData();
  const siteconfigdata = await siteconfig.findOne({});
  return (
    <div className="p-8">
      <RoutingTable
        operatordata={JSON.parse(JSON.stringify(operatordata))}
        apidata={JSON.parse(JSON.stringify(apidata))}
        apiroutecount={siteconfigdata.numberOfApiRoutes}
      />
    </div>
  );
};

export default providerSetting;
