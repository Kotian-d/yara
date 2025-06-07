import { Chart } from "@/app/(Home)/admin/components/chart";
import DashboardCard from "@/app/(Home)/component/dashboardcard";
import RecentTransactions from "@/app/(Home)/component/recenthistory";
import ConnectDB from "@/app/db/connectDb";
import {
  BadgeAlert,
  BadgeCheck,
  BadgePercent,
  BadgeX,
  Users,
  Wallet,
} from "lucide-react";

export default async function Dashboard() {
  await ConnectDB();
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

  return (
    <>
      <div className="px-4 bg-slate-50">
        <h1 className="font-semibold p-4 text-2xl">Dashboard</h1>
        <div className="flex justify-between gap-4 md:flex-nowrap flex-wrap">
          {cardlist.map((data, index) => {
            return (
              <DashboardCard
                key={index}
                title={data.title}
                children={data.children}
                description={data.description}
                icon={data.icon}
                icolor={data.icolor}
              />
            );
          })}
        </div>
        <div className="md:flex gap-5 py-4">
          <Chart />
          <RecentTransactions />
        </div>
      </div>
    </>
  );
}
