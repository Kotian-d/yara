import Searchform from "../../component/searchform";
import operators from "@/app/model/operators";
import { getApiData } from "@/app/queries/apiquery";
import ConnectDB from "@/app/db/connectDb";
import { getTransactionDetails } from "@/app/queries/transactionquery";
import users from "@/app/model/users";

const TransactionRpt = async ({ searchParams }) => {
  let { page, user, limit } = await searchParams;
  page = !page || Number(page) < 1 ? 1 : Number(page);
  limit = limit ? limit : 25;
  let skip = limit * (page - 1);
  const query = {};
  if (user) {
    const { _id } = await users.findOne({ mobile: user });
    query.userId = _id;
  }

  await ConnectDB();
  const {
    trans,
    successCount,
    failCount,
    pendingCount,
    totalSuccess,
    totalFail,
    totalPending,
    totalPages,
  } = await getTransactionDetails(query, limit, skip);
  const operator = await operators.find({});
  const apidata = await getApiData();

  //console.log(trans);

  return (
    <div className="py-2 px-3 flex flex-col gap-5 mb-5 mostly-customized-scrollbar">
      <h2 className="font-sans text-md">Recharge Report</h2>
      <Searchform
        operator={JSON.parse(JSON.stringify(operator))}
        apidata={JSON.parse(JSON.stringify(apidata))}
        trans={JSON.parse(JSON.stringify(trans))}
        successCount={successCount}
        failCount={failCount}
        pendingCount={pendingCount}
        totalSuccess={totalSuccess}
        totalFail={totalFail}
        totalPending={totalPending}
        page={page}
        limit={limit}
        skip={skip}
        totalPages={Math.ceil(totalPages / limit)}
      />
    </div>
  );
};

export default TransactionRpt;
