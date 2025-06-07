import { UpdateConfig } from "@/app/actions/actions";
import ConnectDB from "@/app/db/connectDb";
import siteconfig from "@/app/model/siteconfig";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export default async function Settings() {
  await ConnectDB();
  const config = await siteconfig.findOne({});
  return (
    <div>
      <h1 className="tracking-widest flex p-8">
        <Card className="px-10 h-fit py-5 w-full">
          <CardHeader>
            <CardTitle className="text-xl">Business Rules</CardTitle>
            <CardDescription className="text-center"></CardDescription>
          </CardHeader>
          <CardContent className="font-medium text-muted-foreground font-sans tracking-tight">
            <form className="flex flex-col gap-3" action={UpdateConfig}>
              <div className="flex justify-between items-center rounded-md p-3 border flex-wrap md:space-y-0 space-y-5">
                <div className="flex gap-8 items-center">
                  <label htmlFor="pending" className="cursor-pointer font-sans">
                    Block same amount pending retries only
                  </label>
                  <Checkbox
                    id="pending"
                    name="sameamtpending"
                    className={"bg-slate-200 border-2 border-accent-foreground"}
                    defaultChecked={config?.sameamtpending}
                  ></Checkbox>
                </div>

                <div className="flex items-center gap-3">
                  <label className="cursor-pointer font-sans">
                    Number of API Routes:
                  </label>
                  <select
                    className="px-5 py-2 cursor-pointer rounded-md bg-white border"
                    name="apiroutescount"
                    defaultValue={config?.numberOfApiRoutes}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between rounded-md border p-3 flex-wrap gap-8">
                <div className="flex items-center w-full gap-2">
                  <label
                    htmlFor="frequent"
                    className="cursor-pointer font-sans"
                  >
                    Same Number Same Amt Recharge Block Minutes:
                  </label>
                  <Input
                    id="frequent"
                    className="w-72"
                    name="successretry"
                    defaultValue={config?.successRetry}
                  ></Input>
                </div>

                <div className="flex items-center w-full gap-2">
                  <label
                    htmlFor="addbalance"
                    className="cursor-pointer font-sans"
                  >
                    Same Number Same Amt Add Balance Block Minutes:
                  </label>
                  <Input
                    id="addbalance"
                    className=" w-72"
                    name="addbalanceretry"
                    defaultValue={config?.addbalanceRetry}
                  ></Input>
                </div>

                <div className="flex items-center w-full gap-2">
                  <label
                    htmlFor="apitimeout"
                    className="cursor-pointer font-sans"
                  >
                    API to API Switch Timeout in Minutes:
                  </label>
                  <Input
                    id="apitimeout"
                    className=" w-72"
                    name="addbalanceretry"
                    defaultValue={config?.addbalanceRetry}
                  ></Input>
                </div>
              </div>
              <Button className="w-fit mt-5 self-end font-semibold ">
                Save
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex gap-2 text-sm"></CardFooter>
        </Card>
      </h1>
    </div>
  );
}
