"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
import {
  Bus,
  BusFront,
  BusIcon,
  Loader2,
  Plane,
  Ticket,
  Train,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useState } from "react";
import PayBill from "./paybill";
import FetchBill from "./fetchbill";
import Link from "next/link";

export function PrepaidScreen({ operator, title }) {
  const form = useForm({
    defaultValues: {
      number: "",
      operator: "",
      amount: "",
    },
  });

  const { isSubmitting } = useFormState({
    control: form.control,
  });

  async function onSubmit(values) {
    setTimeout(() => {
      toast.success("Recharge Success");
    }, 3);
    return;
  }

  return (
    <Card className="w-full flex-col items-center">
      <CardHeader className="w-full flex-col justify-center">
        <CardTitle>{title} Recharge</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Mobile no"
                      {...field}
                      className={"w-[50rem]"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="operator"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>select operator</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[50rem]">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={null}>Select</SelectItem>
                      {operator.map((op, index) => {
                        if (op.providertype === "prepaid") {
                          return (
                            <SelectItem key={index} value={op._id}>
                              {op.name}
                            </SelectItem>
                          );
                        }
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="Amount" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isSubmitting ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Recharge
                Processing.....
              </Button>
            ) : (
              <Button type="submit" className="cursor-pointer">
                Recharge
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col gap-2"></CardFooter>
    </Card>
  );
}

export function BillPaymetScreen({ operator, title }) {
  const [billfetched, setbillfetched] = useState(false);
  return (
    <Card className="w-full flex justify-center">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className={"flex justify-center items-center"}>
        {billfetched ? (
          <PayBill operator={operator} />
        ) : (
          <FetchBill operator={operator} setbillfetched={setbillfetched} />
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2"></CardFooter>
    </Card>
  );
}

export function BookingScreen({ operator, title }) {
  return (
    <Card className="w-full flex justify-center">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className={"flex gap-8 items-center"}>
        <Link href={"#"}>
          <div className="w-35 h-35 border rounded-md cursor-pointer flex items-end justify-end">
            Fastag Booking
          </div>
        </Link>
        <Link href={"#"}>
          <div className="w-35 h-35 border rounded-md cursor-pointer flex-col">
            <div className="flex justify-end p-4">
              <BusIcon size={35} />
            </div>
            <span className="text-sm">Bus ticket Booking</span>
          </div>
        </Link>
        <Link href={"#"}>
          <div className="w-35 h-35 border rounded-md cursor-pointer flex items-end justify-end">
            <Train />
            <span className="text-sm ">Train ticket Booking</span>
          </div>
        </Link>
        <Link href={"#"}>
          <div className="w-35 h-35 border rounded-md cursor-pointer flex items-end justify-end">
            <Plane />
            <span className="text-sm ">Flight ticket Booking</span>
          </div>
        </Link>
        <Link href={"#"}>
          <div className="w-35 h-35 border rounded-md cursor-pointer flex items-end justify-end">
            <Ticket />
            <span className="text-sm ">Movie ticket Booking</span>
          </div>
        </Link>
      </CardContent>
      <CardFooter className="flex-col gap-2"></CardFooter>
    </Card>
  );
}
