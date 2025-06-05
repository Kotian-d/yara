"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import toast, { Toaster } from "react-hot-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { smsformschema } from "@/app/zodschema/smsformSchema";
import { Loader2 } from "lucide-react";
import { addSMSApi } from "@/app/actions/actions";

const SMSApiForm = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(smsformschema),
    defaultValues: {
      textsmsapi: data?.textsmsapi,
      whatsappapi: data?.whatsappapi,
      registrationtemplate: data?.registrationtemplate,
      registrationtemplateid: data?.registrationtemplateid,
      balancetransfertemplate: data?.balancetransfertemplate,
      balancetransfertemplateid: data?.balancetransfertemplateid,
      balancerecievedtemplate: data?.balancerecievedtemplate,
      balancerecievedtemplateid: data?.balancerecievedtemplateid,
      balancereversetemplate: data?.balancereversetemplate,
      balancereversetemplateid: data?.balancereversetemplateid,
    },
  });

  const { isSubmitting } = useFormState({
    control: form.control,
  });

  async function onSubmit(values) {
    try {
      const response = await addSMSApi(values);
      toast.success(response);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="flex justify-center">
      <Toaster />
      <Card className="w-full px-10 py-5 border-none">
        <CardHeader>
          <CardTitle className="text-center font-sans">
            SMS Template Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex justify-evenly items-center rounded-md border p-8 gap-8">
                <FormField
                  control={form.control}
                  name="textsmsapi"
                  render={({ field }) => (
                    <FormItem className={"w-full"}>
                      <FormLabel>SMS Api</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="bg-slate-50"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="whatsappapi"
                  render={({ field }) => (
                    <FormItem className={"w-full"}>
                      <FormLabel>Whatsapp Api</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="bg-slate-50"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="rounded-md border p-5 space-y-8">
                <div className="lg:grid lg:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="registrationtemplate"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Registeration SMS Template</FormLabel>
                        <FormControl>
                          <Textarea className={"resize-none bg-slate-50"} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="registrationtemplateid"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Registeration SMS Template ID</FormLabel>
                        <FormControl>
                          <Input className="lg:w-fit bg-slate-50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="lg:grid lg:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="balancetransfertemplate"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Balance Transfer SMS Template</FormLabel>
                        <FormControl>
                          <Textarea
                            className="resize-none bg-slate-50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="balancetransfertemplateid"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Balance Transfer SMS Template ID</FormLabel>
                        <FormControl>
                          <Input className="lg:w-fit bg-slate-50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="lg:grid lg:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="balancerecievedtemplate"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Balance Received SMS Template</FormLabel>
                        <FormControl>
                          <Textarea
                            className="resize-none bg-slate-50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="balancerecievedtemplateid"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Balance Received SMS Template ID</FormLabel>
                        <FormControl>
                          <Input className="lg:w-fit bg-slate-50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="lg:grid lg:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="balancereversetemplate"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Balance Reverse SMS Template</FormLabel>
                        <FormControl>
                          <Textarea
                            className="resize-none bg-slate-50"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="balancereversetemplateid"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Balance Reverse SMS Template ID</FormLabel>
                        <FormControl>
                          <Input className="lg:w-fit bg-slate-50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {isSubmitting ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Submitting.....
                </Button>
              ) : (
                <Button type="submit"> Submit </Button>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SMSApiForm;
