import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Searchform from "../../component/searchform";
import operators from "@/app/model/operators";
import { getApiData } from "@/app/queries/apiquery";
import ConnectDB from "@/app/db/connectDb";
import transactions from "@/app/model/transactions";
import { Check, RefreshCw, X } from "lucide-react";

const invoices = [
  {
    id: 1,
    user: "Front Office",
    date: "	29-10-2024 16:10:01",
    operator: "Vi",
    amount: 199,
    status: "Pending",
    number: "154211411",
    parent: "Ajay",
    api: "realrobo",
    txnid: "5422152111418441",
  },
  {
    id: 1,
    user: "Front Office",
    date: "	29-10-2024 16:10:01",
    operator: "Airtel",
    amount: 859,
    status: "Success",
    number: "154211411",
    parent: "Ajay",
    api: "realrobo",
    txnid: "5422152111418441",
  },
  {
    id: 1,
    user: "Test",
    date: "	29-10-2024 16:10:01",
    operator: "BSNL",
    amount: 799,
    status: "Success",
    number: "154211411",
    parent: "Ajay",
    api: "realrobo",
    txnid: "5422152111418441",
  },
  {
    id: 1,
    user: "Front Office",
    date: "	29-10-2024 16:10:01",
    operator: "Airtel",
    amount: 349,
    status: "Failed",
    number: "154211411",
    parent: "Ajay",
    api: "realrobo",
    txnid: "5422152111418441",
  },
  {
    id: 1,
    user: "Pavathi",
    date: "	29-10-2024 16:10:01",
    operator: "SUN Direct",
    amount: 10,
    status: "Success",
    number: "154211411",
    parent: "Ajay",
    api: "realrobo",
    txnid: "5422152111418441",
  },
  {
    id: 1,
    user: "Ezeecharge",
    date: "	29-10-2024 16:10:01",
    operator: "Videocon",
    amount: 100,
    status: "Failed",
    number: "154211411",
    parent: "Ajay",
    api: "realrobo",
    txnid: "5422152111418441",
  },
  {
    id: 1,
    user: "Ravish",
    date: "	29-10-2024 16:10:01",
    operator: "Airtel",
    amount: 299,
    status: "Success",
    number: "154211411",
    parent: "Ajay",
    api: "realrobo",
    txnid: "5422152111418441",
  },
  {
    id: 1,
    user: "Ravish",
    date: "	29-10-2024 16:10:01",
    operator: "Airtel",
    amount: 299,
    status: "Success",
    number: "154211411",
    parent: "Ajay",
    api: "realrobo",
    txnid: "5422152111418441",
  },
  {
    id: 1,
    user: "Ravish",
    date: "	29-10-2024 16:10:01",
    operator: "Airtel",
    amount: 299,
    status: "Success",
    number: "154211411",
    parent: "Ajay",
    api: "realrobo",
    txnid: "5422152111418441",
  },
  {
    id: 1,
    user: "Ravish",
    date: "	29-10-2024 16:10:01",
    operator: "Airtel",
    amount: 299,
    status: "Success",
    number: "154211411",
    parent: "Ajay",
    api: "realrobo",
    txnid: "5422152111418441",
  },
  {
    id: 1,
    user: "Ravish",
    date: "	29-10-2024 16:10:01",
    operator: "Airtel",
    amount: 299,
    status: "Success",
    number: "154211411",
    parent: "Ajay",
    api: "realrobo",
    txnid: "5422152111418441",
  },
  {
    id: 1,
    user: "Ravish",
    date: "	29-10-2024 16:10:01",
    operator: "Airtel",
    amount: 299,
    status: "Success",
    number: "154211411",
    parent: "Ajay",
    api: "realrobo",
    txnid: "5422152111418441",
  },
  {
    id: 1,
    user: "Ravish",
    date: "	29-10-2024 16:10:01",
    operator: "Airtel",
    amount: 299,
    status: "Success",
    number: "154211411",
    parent: "Ajay",
    api: "realrobo",
    txnid: "5422152111418441",
  },
  {
    id: 1,
    user: "Ravish",
    date: "	29-10-2024 16:10:01",
    operator: "Airtel",
    amount: 299,
    status: "Success",
    number: "154211411",
    parent: "Ajay",
    api: "realrobo",
    txnid: "5422152111418441",
  },
  {
    id: 1,
    user: "Ravish",
    date: "	29-10-2024 16:10:01",
    operator: "Airtel",
    amount: 299,
    status: "Success",
    number: "154211411",
    parent: "Ajay",
    api: "realrobo",
    txnid: "5422152111418441",
  },
  {
    id: 1,
    user: "Ravish",
    date: "	29-10-2024 16:10:01",
    operator: "Airtel",
    amount: 299,
    status: "Success",
    number: "154211411",
    parent: "Ajay",
    api: "realrobo",
    txnid: "5422152111418441",
  },
  {
    id: 1,
    user: "Ravish",
    date: "	29-10-2024 16:10:01",
    operator: "Airtel",
    amount: 299,
    status: "Success",
    number: "154211411",
    parent: "Ajay",
    api: "realrobo",
    txnid: "5422152111418441",
  },
  {
    id: 1,
    user: "Ravish",
    date: "	29-10-2024 16:10:01",
    operator: "Airtel",
    amount: 299,
    status: "Success",
    number: "154211411",
    parent: "Ajay",
    api: "realrobo",
    txnid: "5422152111418441",
  },
  {
    id: 1,
    user: "Ravish",
    date: "	29-10-2024 16:10:01",
    operator: "Airtel",
    amount: 299,
    status: "Success",
    number: "154211411",
    parent: "Ajay",
    api: "realrobo",
    txnid: "5422152111418441",
  },
  {
    id: 1,
    user: "Ravish",
    date: "	29-10-2024 16:10:01",
    operator: "Airtel",
    amount: 299,
    status: "Success",
    number: "154211411",
    parent: "Ajay",
    api: "realrobo",
    txnid: "5422152111418441",
  },
];

const TransactionRpt = async () => {
  await ConnectDB();
  const trans = await transactions
    .find({})
    .sort({ createdAt: -1 })
    .populate(["operator", "api", "userId"])
    .lean();
  const totalSuccess = await transactions.aggregate([
    {
      $match: {
        status: "success",
      },
    },
    { $group: { _id: "$status", total: { $sum: `$amount` } } },
  ]);
  const totalPending = await transactions.aggregate([
    {
      $match: {
        status: "pending",
      },
    },
    { $group: { _id: "$status", total: { $sum: `$amount` } } },
  ]);
  const totalFail = await transactions.aggregate([
    {
      $match: {
        status: "failed",
      },
    },
    { $group: { _id: "$status", total: { $sum: `$amount` } } },
  ]);

  const successCount = await transactions.count({ status: "success" });
  const pendingCount = await transactions.count({ status: "pending" });
  const failCount = await transactions.count({ status: "failed" });
  const operator = await operators.find({});
  const apidata = await getApiData();

  return (
    <div className="py-2 px-3 flex flex-col gap-5">
      <h2 className="font-sans text-md">Recharge Report</h2>
      <Searchform
        operator={JSON.parse(JSON.stringify(operator))}
        apidata={JSON.parse(JSON.stringify(apidata))}
      />
      <div>
        <div className="flex justify-between">
          <div className="flex gap-5 m-2">
            <span>Total</span>
            <span className="text-green-800">
              Success: {totalSuccess[0]?.total}
            </span>
            <span className="text-yellow-600">
              Pending: {totalPending[0]?.total ? totalPending[0]?.total : 0}
            </span>
            <span className="text-red-800">Failed: {totalFail[0].total}</span>
          </div>

          <div className="flex gap-5 m-2">
            <span>Count</span>
            <span className="text-green-800">Success: {successCount}</span>
            <span className="text-yellow-600">Pending: {pendingCount}</span>
            <span className="text-red-800">Failed: {failCount}</span>
          </div>
        </div>

        <Table className="table-auto">
          <TableHeader>
            <TableRow className="bg-slate-100">
              <TableHead>SI</TableHead>
              <TableHead className="text-center">User</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Operator</TableHead>
              <TableHead>Mobile no.</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Txnid</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Api</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trans.map((invoice, index) => (
              <TableRow key={index} className={"py-5"}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium text-center">
                  {invoice.userId?.name} - {invoice.userId?.mobile}
                </TableCell>
                <TableCell>
                  {new Date(invoice.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>{invoice.operator?.name}</TableCell>
                <TableCell>{invoice.number}</TableCell>
                <TableCell>₹ {invoice.amount}</TableCell>
                <TableCell>{invoice.txn_id}</TableCell>
                <TableCell>
                  {invoice.status === "success" && (
                    <span className="px-3 bg-green-200 text-green-800 font-semibold text-md text- py-1 rounded-md font-sans capitalize">
                      {invoice.status}
                    </span>
                  )}
                  {invoice.status === "pending" && (
                    <span className="px-3 bg-yellow-200 text-yellow-800 font-semibold text-md text- py-1 rounded-md font-sans capitalize">
                      {invoice.status}
                    </span>
                  )}
                  {invoice.status === "failed" && (
                    <span className="px-3 bg-red-200 text-red-500 font-semibold text-md text- py-1 rounded-md font-sans capitalize">
                      {invoice.status}
                    </span>
                  )}
                </TableCell>
                <TableCell>{invoice.api?.name}</TableCell>
                <TableCell>
                  <div className="flex justify-around">
                   <Check />
                  <X />
                  <RefreshCw />
                  </div>
                 
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionRpt;
