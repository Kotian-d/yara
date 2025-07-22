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
  BookingScreen,
  PrepaidScreen,
} from "../component/tabScreens";
import { getOperatorData } from "@/app/queries/operatorquery";
import providertype from "@/app/model/providertype";

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
  const providerTypes = await providertype.find({});

  return (
    <>
      <div className="px-4 bg-slate-50">
        <h1 className="font-semibold p-4 text-2xl">Dashboard</h1>
        <Tabs defaultValue="mobile" className="flex">
          <TabsList className="w-[35rem] bg-slate-50">
            {providerTypes.map((providerType, index) => {
              if (providerType.isenabled) {
                return (
                  <TabsTrigger
                    key={index}
                    value={providerType.name.toLowerCase()}
                    className={
                      "bg-slate-50 cursor-pointer data-[state=active]:bg-slate-50 data-[state=active]:shadow-none data-[state=active]:border-b-4 rounded-none data-[state=active]:border-b-primary focus-visible:border-none"
                    }
                  >
                    {providerType.name}
                  </TabsTrigger>
                );
              }
            })}
          </TabsList>
          {providerTypes.map((providerType, index) => {
            if (providerType.isenabled) {
              if (providerType.isfetchbill) {
                return (
                  <TabsContent
                    value={providerType.name.toLowerCase()}
                    key={index}
                  >
                    <BillPaymetScreen
                      operator={JSON.parse(JSON.stringify(operator))}
                      title={providerType.name}
                    />
                  </TabsContent>
                );
              } else if (providerType.name.toLowerCase() === "booking") {
                console.log("booking");
                return(<TabsContent
                  value={providerType.name.toLowerCase()}
                  key={index}
                >
                  <BookingScreen />
                </TabsContent>);
              } else {
                return (
                  <TabsContent
                    value={providerType.name.toLowerCase()}
                    key={index}
                  >
                    <PrepaidScreen
                      operator={JSON.parse(JSON.stringify(operator))}
                      title={providerType.name}
                    />
                  </TabsContent>
                );
              }
            }
          })}
        </Tabs>
        <div className="md:flex gap-5 py-4">
          <RecentTransactions />
        </div>
      </div>
    </>
  );
}
