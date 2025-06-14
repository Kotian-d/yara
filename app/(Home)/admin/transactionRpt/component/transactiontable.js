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
import ConnectDB from '@/app/db/connectDb';
import transactions from '@/app/model/transactions';
import { Check, Code, ReceiptText, RefreshCw, RotateCw, X } from "lucide-react";
import CustTooltip from "@/app/(Home)/component/tooltip";

const TransactionsTable = async() => {
    await ConnectDB()
    const trans = await transactions
    .find({ createdAt: { $gte: new Date().toDateString() } })
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

  return (
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

        <Table className="table-auto border border-gray-400">
          <TableHeader>
            <TableRow className="bg-slate-100 border border-gray-300">
              <TableHead className="text-center border border-gray-300">
                SI
              </TableHead>
              <TableHead className="text-center border border-gray-300">
                User
              </TableHead>
              <TableHead className="text-center border border-gray-300">
                Date
              </TableHead>
              <TableHead className="text-center border border-gray-300">
                Operator
              </TableHead>
              <TableHead className="text-center border border-gray-300">
                Mobile no.
              </TableHead>
              <TableHead className="text-center border border-gray-300">
                Amount
              </TableHead>
              <TableHead className="text-center border border-gray-300">
                Txnid
              </TableHead>
              <TableHead className="text-center border border-gray-300">
                Status
              </TableHead>
              <TableHead className="text-center border border-gray-300">
                Api
              </TableHead>
              <TableHead className="text-center border border-gray-300">
                Actions
              </TableHead>
              <TableHead className="text-center border border-gray-300">
                Source
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trans.map((invoice, index) => (
              <TableRow key={index} className={"py-5"}>
                <TableCell className="font-medium text-center border border-gray-300">
                  {index + 1}
                </TableCell>
                <TableCell className="font-medium text-center border border-gray-300">
                  {invoice.userId?.name} - {invoice.userId?.mobile}
                </TableCell>
                <TableCell className="text-center border border-gray-300">
                  {new Date(invoice.createdAt).toLocaleString()}
                </TableCell>
                <TableCell className="text-center border border-gray-300">
                  {invoice.operator?.name}
                </TableCell>
                <TableCell className="text-center border border-gray-300">
                  {invoice.number}
                </TableCell>
                <TableCell className="text-center border border-gray-300">
                  ₹ {invoice.amount}
                </TableCell>
                <TableCell className="text-center border border-gray-300">
                  {invoice.txn_id}
                </TableCell>
                <TableCell className="text-center border border-gray-300">
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
                <TableCell className="text-center border border-gray-300">
                  {invoice.api?.name}
                </TableCell>
                <TableCell className="text-center border border-gray-300">
                  <div className="flex justify-around">
                    <CustTooltip
                      trigger={<Check className="cursor-pointer" />}
                      content={"Success"}
                    />
                    <CustTooltip
                      trigger={<X className="cursor-pointer" />}
                      content={"Refund"}
                    />
                    <CustTooltip
                      trigger={<RefreshCw className="cursor-pointer" />}
                      content={"Status Check"}
                    />
                    <CustTooltip
                      trigger={<RotateCw className="cursor-pointer" />}
                      content={"Resend"}
                    />
                    <CustTooltip
                      trigger={<ReceiptText className="cursor-pointer" />}
                      content={"Logs"}
                    />
                  </div>
                </TableCell>
                <TableCell className="border border-gray-300">
                  <div className="flex justify-center">
                    <Code />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
  )
}

export default TransactionsTable
