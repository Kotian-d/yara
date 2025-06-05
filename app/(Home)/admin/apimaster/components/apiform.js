"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import toast, { Toaster } from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, useFormState } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { addApi, updateApi } from "@/app/actions/actions";
import { apiformSchema } from "@/app/zodschema/apiformSchema";

const AddApiForm = ({ title, formdata, operators }) => {
  const form = useForm({
    resolver: zodResolver(apiformSchema),
    defaultValues: {
      api_name: formdata?.name,
      isactive: formdata?.isActive,
      isplanapi: formdata?.isPlanApi,
      host: formdata?.host,
      param1: formdata?.param1,
      param2: formdata?.param2,
      param3: formdata?.param3,
      param4: formdata?.param4,
      param5: formdata?.param5,
      param6: formdata?.param6,
      param7: formdata?.param7,
      prepaidApiMethod: formdata ? formdata.prepaid_api_method : "GET",
      prepaidApi: formdata?.prepaidapi,
      dthApiMethod: formdata ? formdata.dth_api_method : "GET",
      dthApi: formdata?.dthapi,
      balanceApiMethod: formdata ? formdata.balance_api_method : "GET",
      balanceApi: formdata?.bal_check_api,
      balancecheckResponse: formdata?.balance_check_response?.balance_field,
      RcResponseMethod: formdata
        ? formdata.recharge_response.response_type
        : "GET",
      RcResponseStatus: formdata?.recharge_response.status_field,
      RcResponseOpid: formdata?.recharge_response.opid_field,
      RcResponseApirefid: formdata?.recharge_response.apirefid_field,
      RcResponsebalance: formdata?.recharge_response.balance_field,
      RcResponseSuccess: formdata?.recharge_response.success_key,
      RcResponseFailure: formdata?.recharge_response.failure_key,
      RcResponsePending: formdata?.recharge_response.pending_key,
      RcResponseRemark: formdata?.recharge_response.remark_field,
      CbResponseReqid: formdata?.callback_response?.reqid,
      CbResponseStatus: formdata?.callback_response?.status_field,
      CbResponseOpid: formdata?.callback_response?.opid_field,
      CbResponseApirefid: formdata?.callback_response?.apirefid_field,
      CbResponsebalance: formdata?.callback_response?.balance_field,
      CbResponseSuccess: formdata?.callback_response?.success_key,
      CbResponseFailure: formdata?.callback_response?.failure_key,
      CbResponsePending: formdata?.callback_response?.pending_key,
      CbResponseRemark: formdata?.callback_response?.remark_field,
      operator: formdata
        ? formdata.operator.map((value, index) => {
            return {
              opname: value?.opname?.toString(),
              opcode: value?.opcode,
              opparam1: value?.opparam1,
              opparam2: value?.opparam2,
              opparam3: value?.opparam3,
              opparam4: value?.opparam3,
              opparam5: value?.opparam5,
              limit: value?.limit ? value.limit : "",
            };
          })
        : operators.map((operator, index) => {
            return {
              opname: operator.name.toString(),
              opcode: operator.opcode,
              opparam1: "",
              opparam2: "",
              opparam3: "",
              opparam4: "",
              opparam5: "",
              limit: "",
            };
          }),
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "operator",
  });

  const { isSubmitting } = useFormState({
    control: form.control,
  });

  async function onSubmit(values) {
    try {
      if (formdata) {
        const response = await updateApi(formdata._id, values);
        toast.success(response);
      } else {
        const response = await addApi(values);
        toast.success(response);
      }

      form.reset();
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="flex justify-center items-center p-5 bg-background">
      <Toaster />
      <Card className="w-[75%] px-10 h-fit py-5">
        <CardHeader>
          <CardTitle className="text-center font-sans">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              method="POST"
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="isactive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>isActive</FormLabel>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isplanapi"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>isPlanApi</FormLabel>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="api_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>API NAME</FormLabel>
                    <FormControl>
                      <Input
                        className="lg:w-96"
                        placeholder="name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="host"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>host</FormLabel>
                    <FormControl>
                      <Input
                        className="lg:w-96"
                        placeholder="host"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-3 gap-5 items-center">
                <FormField
                  control={form.control}
                  name="param1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Param1</FormLabel>
                      <FormControl>
                        <Input placeholder="param1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="param2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Param2</FormLabel>
                      <FormControl>
                        <Input placeholder="param2" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="param3"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Param3</FormLabel>
                      <FormControl>
                        <Input placeholder="param3" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="param4"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Param4</FormLabel>
                      <FormControl>
                        <Input placeholder="param4" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="param5"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Param5</FormLabel>
                      <FormControl>
                        <Input placeholder="param5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="param6"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Param6</FormLabel>
                      <FormControl>
                        <Input placeholder="param6" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="param7"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Param7</FormLabel>
                      <FormControl>
                        <Input placeholder="param7" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="prepaidApiMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prepaid Api Method</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a prepaid api method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="GET">GET</SelectItem>
                        <SelectItem value="POST">POST</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="prepaidApi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>prepaid Api</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dthApiMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prepaid DTH Method</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a DTH api method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="GET">GET</SelectItem>
                        <SelectItem value="POST">POST</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dthApi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>DTH Api</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="balanceApiMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Balance Check Method</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a DTH api method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="GET">GET</SelectItem>
                        <SelectItem value="POST">POST</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="balanceApi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Balance Check Api</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="rounded-md space-y-3 border p-4 py-6">
                <p className="text-md font-medium">Balance Check Response</p>
                <div className="grid grid-cols-4 gap-5 ">
                  <FormField
                    control={form.control}
                    name="balancecheckResponse"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>balance_field</FormLabel>
                        <FormControl>
                          <Input placeholder="balance_field" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="RcResponseMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recharge Response Method</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Recharge Response Method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="JSON">JSON</SelectItem>
                        <SelectItem value="XML">XML</SelectItem>
                        <SelectItem value="CSV">CSV</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="rounded-md space-y-3 border p-4 py-6">
                <p className="text-md font-medium">Recharge Response</p>
                <div className="grid grid-cols-4 gap-5 ">
                  <FormField
                    control={form.control}
                    name="RcResponseStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status field</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="RcResponseOpid"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Operator txn id field</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="RcResponseApirefid"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>apirefid field</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="RcResponsebalance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Balance field</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="RcResponseSuccess"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Success Key</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="RcResponseFailure"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Failure Key</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="RcResponsePending"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pending Key</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="RcResponseRemark"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Remarks Key</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

            {/*callback response*/}
            <div className="rounded-md space-y-3 border p-4 py-6">
                <p className="text-md font-medium">Callback Response</p>
                <div className="grid grid-cols-4 gap-5 ">
                  <FormField
                    control={form.control}
                    name="CbResponseReqid"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ReqId field</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="CbResponseStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status field</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="CbResponseOpid"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Operator txn id field</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="CbResponseApirefid"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>apirefid field</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="CbResponsebalance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Balance field</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="CbResponseSuccess"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Success Key</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="CbResponseFailure"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Failure Key</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="CbResponsePending"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pending Key</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="CbResponseRemark"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Remarks Key</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="overflow-auto lg:flex flex-col gap-2 rounded-md border px-4 py-6">
                <table className="table-fixed">
                  <thead>
                    <tr className="border bg-slate-100 text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50">
                      <th className="px-4 py-2">Operator</th>
                      <th className="px-4 py-2">OPPARAM1</th>
                      <th className="px-4 py-2">OPPARAM2</th>
                      <th className="px-4 py-2">OPPARAM3</th>
                      <th className="px-4 py-2">OPPARAM4</th>
                      <th className="px-4 py-2">OPPARAM5</th>
                      <th className="px-4 py-2">LIMIT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fields.map((value, index) => {
                      return (
                        <tr key={index}>
                          <td
                            className="px-4 py-2 border text-center"
                            key={`operator.${index}.opcode`}
                          >
                            <FormField
                              control={form.control}
                              name={`operator.${index}.opcode`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>{value.opname}</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="hidden" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </td>
                          <td
                            className="px-4 py-2 border text-center"
                            key={`operator.${index}.opparam1`}
                          >
                            <FormField
                              control={form.control}
                              name={`operator.${index}.opparam1`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input placeholder="" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </td>
                          <td
                            className="px-4 py-2 border text-center"
                            key={`operator.${index}.opparam2`}
                          >
                            <FormField
                              control={form.control}
                              name={`operator.${index}.opparam2`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input placeholder="" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </td>
                          <td
                            className="px-4 py-2 border text-center"
                            key={`operator.${index}.opparam3`}
                          >
                            <FormField
                              control={form.control}
                              name={`operator.${index}.opparam3`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input placeholder="" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </td>
                          <td
                            className="px-4 py-2 border text-center"
                            key={`operator.${index}.opparam4`}
                          >
                            <FormField
                              control={form.control}
                              name={`operator.${index}.opparam4`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input placeholder="" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </td>
                          <td
                            className="px-4 py-2 border text-center"
                            key={`operator.${index}.opparam5`}
                          >
                            <FormField
                              control={form.control}
                              name={`operator.${index}.opparam5`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input placeholder="" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </td>
                          <td
                            className="px-4 py-2 border text-center"
                            key={`operator.${index}.limit`}
                          >
                            <FormField
                              control={form.control}
                              name={`operator.${index}.limit`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input placeholder="" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
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

export default AddApiForm;
