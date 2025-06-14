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
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { operator } from "@/app/zodschema/operatorSchema";

export function MobileScreen({operator}) {
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
    setTimeout(()=>{
      toast.success("Recharge Success")
    }, 3);
    return;
  }

  return (
      <Card className="w-full flex-col items-center">
        <CardHeader className="w-full flex-col justify-center">
          <CardTitle>Mobile Recharge</CardTitle>
          <CardDescription>
            
          </CardDescription>
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
                      <Input placeholder="Mobile no" {...field} className={"w-[50rem]"}/>
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
                            if(op.providertype === "prepaid"){
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
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Recharge Processing.....
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

export function DTHScreen({operator}) {
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
    setTimeout(()=>{
      toast.success("Recharge Success")
    }, 3);
    return;
  }
  return (
          <Card className="w-full flex justify-center">
        <CardHeader>
          <CardTitle>DTH Recharge</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent className={"flex justify-center items-center"}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile number</FormLabel>
                    <FormControl>
                      <Input placeholder="Mobile no" {...field} className={"w-[50rem]"}/>
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
                            if(op.providertype === "DTH"){
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
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Recharge Processing.....
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

export function FasTagScreen({operator}) {
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
    setTimeout(()=>{
      toast.success("Recharge Success")
    }, 3);
    return;
  }
  return (
          <Card className="w-full flex justify-center">
        <CardHeader>
          <CardTitle>Mobile Recharge</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent className={"flex justify-center items-center"}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile number</FormLabel>
                    <FormControl>
                      <Input placeholder="Mobile no" {...field} className={"w-[50rem]"}/>
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
                            if(op.providertype === "Fastag"){
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
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Recharge Processing.....
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

export function ElectricityScreen({operator}) {
  return (
    <div>
      <h1>Electricity Recharge</h1>
    </div>
  );
}
