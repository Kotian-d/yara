import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const RecentTransactions = () => {
  const TxList = [
    {
      user: "USER001",
      date: "15-05-2025 12:28:28",
      txnid: "ROER258743287-BHASKAR D HEGDE",
      operator: "Dishtv",
      number: "02800089421",
      amount: "290.00",
      status: "success",
    },
    {
      user: "USER002",
      date: "15-05-2025 12:28:28",
      txnid: "WREC211413750_FAKKIRAPPA.GOULI.",
      operator: "Dishtv",
      number: "244459779",
      amount: "290.00",
      status: "success",
    },
    {
      user: "USER005",
      date: "15-05-2025 12:28:28",
      txnid: "WREC211410905_SURESHBAMMIGATTIS",
      operator: "Dishtv",
      number: "302321209",
      amount: "249.00",
      status: "pending",
    },
    {
      user: "USER008",
      date: "15-05-2025 11:37:44",
      txnid: "WREC211410299_MADIVALAPPAMALAGI",
      operator: "Videocon D2h",
      number: "188757193",
      amount: "290.00",
      status: "failure",
    },
    {
      user: "USER124",
      date: "15-05-2025 10:04:10",
      txnid: "ROER258743287-BHASKAR D HEGDE",
      operator: "Videocon D2h",
      number: "82716105",
      amount: "290.00",
      status: "success",
    },
    {
      user: "USER425",
      date: "15-05-2025 12:28:28",
      txnid: "ROER258743287-BHASKAR D HEGDE",
      operator: "Dishtv",
      number: "02800089421",
      amount: "290.00",
      status: "success",
    },
    {
      user: "USER001",
      date: "15-05-2025 12:28:28",
      txnid: "ROER258743287-BHASKAR D HEGDE",
      operator: "Dishtv",
      number: "02800089421",
      amount: "290.00",
      status: "success",
    },
    {
      user: "USER002",
      date: "15-05-2025 12:28:28",
      txnid: "WREC211413750_FAKKIRAPPA.GOULI.",
      operator: "Dishtv",
      number: "244459779",
      amount: "290.00",
      status: "failure",
    },
    {
      user: "USER005",
      date: "15-05-2025 12:28:28",
      txnid: "WREC211410905_SURESHBAMMIGATTIS",
      operator: "Dishtv",
      number: "302321209",
      amount: "290.00",
      status: "success",
    },
    {
      user: "USER008",
      date: "15-05-2025 11:37:44",
      txnid: "WREC211410299_MADIVALAPPAMALAGI",
      operator: "Videocon D2h",
      number: "188757193",
      amount: "290.00",
      status: "success",
    },
  ];

  return (
    <Card className="overflow-hidden flex-1 mostly-customized-scrollbar">
      <CardHeader>
        <CardTitle>Last 10 Transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of your recent transactions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">User</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Txnid</TableHead>
              <TableHead>Operator</TableHead>
              <TableHead>Number</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TxList.map((data, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">{data.user}</TableCell>
                  <TableCell>{data.date}</TableCell>
                  <TableCell>{data.txnid}</TableCell>
                  <TableCell>{data.operator}</TableCell>
                  <TableCell>{data.number}</TableCell>
                  <TableCell>{data.amount}</TableCell>
                  <TableCell className={`text-right font-semibold ${data.status == "success" ? "text-green-900" : data.status == "failure" ? "text-red-500" : "text-yellow-400" }`}>{data.status.toUpperCase()}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
