import RecentTransactions from "@/app/(Home)/component/recenthistory";
import {
  BadgeAlert,
  BadgeCheck,
  BadgePercent,
  BadgeX,
  Users,
  Wallet,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BillPaymetScreen,
  PrepaidScreen,
} from "../component/tabScreens";
import { getOperatorData } from "@/app/queries/operatorquery";

const cardlist = [
  {
    title: "Success",
    children: "₹ 1,45,741",
    description: "Total Success",
    icon: <BadgeCheck color="green" size={"40"} />,
  },
  {
    title: "Refund",
    children: "₹ 14,210",
    description: "Total Failure",
    icon: <BadgeX color="red" size={"40"} />,
  },
  {
    title: "Pending",
    children: "₹ 249",
    description: "Total Pending",
    icon: <BadgeAlert color="orange" size={"40"} />,
  },
  {
    title: "Users",
    children: "2500",
    description: "Total Number of Users",
    icon: <Users color="blue" size={"40"} />,
  },
  {
    title: "Wallet",
    children: "₹ 2,14,215",
    description: "Total User Balance",
    icon: <Wallet color="brown" size={"40"} />,
  },
  {
    title: "CashBack",
    children: "₹ 2,14,215",
    description: "Total Cashback",
    icon: <BadgePercent color="purple" size={"40"} />,
  },
];

export default async function Dashboard() {
  const operator = await getOperatorData();

  return (
    <>
      <div className="px-4 bg-slate-50">
        <h1 className="font-semibold p-4 text-2xl">Dashboard</h1>
        <Tabs defaultValue="mobile" className="flex">
          <TabsList className="w-[35rem] bg-slate-50">
            <TabsTrigger
              value="mobile"
              className={
                "bg-slate-50 cursor-pointer data-[state=active]:bg-slate-50 data-[state=active]:shadow-none data-[state=active]:border-b-4 rounded-none data-[state=active]:border-b-primary focus-visible:border-none"
              }
            >
              Mobile
            </TabsTrigger>
            <TabsTrigger
              value="dth"
              className={
                "bg-slate-50 cursor-pointer data-[state=active]:bg-slate-50 data-[state=active]:shadow-none data-[state=active]:border-b-4 rounded-none data-[state=active]:border-b-primary focus-visible:border-none"
              }
            >
              DTH
            </TabsTrigger>
            <TabsTrigger
              value="postpaid"
              className={
                "bg-slate-50 cursor-pointer data-[state=active]:bg-slate-50 data-[state=active]:shadow-none data-[state=active]:border-b-4 rounded-none data-[state=active]:border-b-primary focus-visible:border-none"
              }
            >
              Postpaid
            </TabsTrigger>
             <TabsTrigger
              value="landline"
              className={
                "bg-slate-50 cursor-pointer data-[state=active]:bg-slate-50 data-[state=active]:shadow-none data-[state=active]:border-b-4 rounded-none data-[state=active]:border-b-primary focus-visible:border-none"
              }
            >
              Landline
            </TabsTrigger>
            <TabsTrigger
              value="fastag"
              className={
                "bg-slate-50 cursor-pointer data-[state=active]:bg-slate-50 data-[state=active]:shadow-none data-[state=active]:border-b-4 rounded-none data-[state=active]:border-b-primary focus-visible:border-none"
              }
            >
              FasTag
            </TabsTrigger>
            <TabsTrigger
              value="electricity"
              className={
                "bg-slate-50 cursor-pointer data-[state=active]:bg-slate-50 data-[state=active]:shadow-none data-[state=active]:border-b-4 rounded-none data-[state=active]:border-b-primary focus-visible:border-none"
              }
            >
              Electricity
            </TabsTrigger>
          </TabsList>
          <TabsContent value="mobile">
            <PrepaidScreen
              operator={JSON.parse(JSON.stringify(operator))}
              title={"Mobile"}
            />
          </TabsContent>
          <TabsContent value="dth">
            <PrepaidScreen
              operator={JSON.parse(JSON.stringify(operator))}
              title={"DTH"}
            />
          </TabsContent>
           <TabsContent value="postpaid">
            <BillPaymetScreen
              operator={JSON.parse(JSON.stringify(operator))}
              title={"Postpaid"}
            />
          </TabsContent>
          <TabsContent value="landline">
            <BillPaymetScreen
              operator={JSON.parse(JSON.stringify(operator))}
              title={"Landline"}
            />
          </TabsContent>
          <TabsContent value="fastag">
            <BillPaymetScreen
              operator={JSON.parse(JSON.stringify(operator))}
              title={"Fastag"}
            />
          </TabsContent>
          <TabsContent value="electricity">
            <BillPaymetScreen
              operator={JSON.parse(JSON.stringify(operator))}
              title={"Electricity"}
            />
          </TabsContent>
        </Tabs>
        <div className="md:flex gap-5 py-4">
          <RecentTransactions />
        </div>
      </div>
    </>
  );
}
