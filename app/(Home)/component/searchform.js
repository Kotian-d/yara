"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar as CalendarIcon,
  ChevronsUpDown,
  Check,
  Download,
  Search,
  Code,
  ReceiptText,
  RefreshCw,
  RotateCw,
  X,
  Loader2,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useForm, useFormState } from "react-hook-form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import CustTooltip from "./tooltip";
import { useEffect, useState } from "react";
import { getTransactionReport } from "@/app/actions/actions";
import toast from "react-hot-toast";
import Link from "next/link";
import { CustomAlert } from "./rcConfirm";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const status = ["success", "pending", "failed"];

const languages = [
  { label: "", value: "" },
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
];

const Searchform = ({
  operator,
  apidata,
  trans,
  successCount,
  failCount,
  pendingCount,
  totalSuccess,
  totalFail,
  totalPending,
  page,
  totalPages,
  limit,
  skip,
}) => {
  const [data, setdata] = useState(trans);
  const [successCountState, setsuccessCount] = useState(successCount);
  const [failCountState, setfailedCount] = useState(failCount);
  const [pendingCountState, setpendingCount] = useState(pendingCount);
  const [message, setmessage] = useState("");
  const [isconfirm, setisconfirm] = useState(false);
  const [Page, setPage] = useState(page);
  const [Limit, setLimit] = useState(limit);
  const [TotalPages, setTotalPages] = useState(totalPages);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const form = useForm({
    defaultValues: {
      date_range: {
        from: "",
        to: "",
      },
      mobile: "",
      operator: "",
      status: "",
      txnid: "",
      user: "",
      amount: "",
      api: "",
      parent: "",
    },
  });

  const { isSubmitting } = useFormState({
    control: form.control,
  });

  async function onSubmit(values) {
    try {
      const filterdata = await getTransactionReport(values, skip, limit);
      console.log(JSON.parse(filterdata));
      const { trans, successCount, failCount, pendingCount, totalItem } = JSON.parse(filterdata);
      setsuccessCount(successCount);
      setfailedCount(failCount);
      setpendingCount(pendingCount);
      setdata(trans);
      setTotalPages((Math.ceil(totalItem / Limit)));
      console.log(limit)
      console.log(totalItem)
      console.log(TotalPages)
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function handlePageChange(value) {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("page", value);
    }

    replace(`${pathname}?${params.toString()}`);
    try {
      const values = new FormData();
      const filterdata = await getTransactionReport(
        values,
        limit * (value -1),
        limit
      );
      console.log(JSON.parse(filterdata));
      const { trans, successCount, failCount, pendingCount } =
        JSON.parse(filterdata);
      setsuccessCount(successCount);
      setfailedCount(failCount);
      setpendingCount(pendingCount);
      setdata(trans);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <Card>
        <CardContent className="p-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <div className="flex gap-5 items-center flex-wrap">
                <FormField
                  control={form.control}
                  name="date_range"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-3">
                      <FormLabel>Select Date Range</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              id="date"
                              variant={"outline"}
                              className={cn(
                                "w-[300px] justify-start items-center text-left font-normal gap-2 m-0",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon />
                              {field.value?.from ? (
                                field.value.to ? (
                                  <>
                                    {format(field.value.from, "LLL dd, y")} -{" "}
                                    {format(field.value.to, "LLL dd, y")}
                                  </>
                                ) : (
                                  format(field.value.from, "LLL dd, y")
                                )
                              ) : (
                                new Date().toDateString()
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            initialFocus
                            mode="range"
                            //defaultMonth={field.value?.from}
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            numberOfMonths={1}
                          />
                        </PopoverContent>
                      </Popover>
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
                          <SelectTrigger className="w-[300px]">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={null}>Select</SelectItem>
                          {operator.map((op, index) => {
                            return (
                              <SelectItem key={index} value={op._id}>
                                {op.name}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>Mobile no.</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Mobile number"
                          {...field}
                          className="w-[300px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="user"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>User</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="User"
                          {...field}
                          className="w-[300px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="txnid"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>txnid</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="txnid"
                          {...field}
                          className="w-[300px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="api"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>select API</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[300px]">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={null}>Select</SelectItem>
                          {apidata.map((api, index) => {
                            return (
                              <SelectItem key={index} value={api._id}>
                                {api.name}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>select status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[300px]">
                            <SelectValue placeholder="All" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={"all"}>All</SelectItem>
                          {status.map((skey, index) => {
                            return (
                              <SelectItem key={index} value={skey}>
                                {skey}
                              </SelectItem>
                            );
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
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Amount"
                          {...field}
                          className="w-[300px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="parent"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-3">
                      <FormLabel>Parent</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-[300px] justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? languages.find(
                                    (language) => language.value === field.value
                                  )?.label
                                : "Select parent"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-0">
                          <Command>
                            <CommandInput placeholder="Search parent..." />
                            <CommandList>
                              <CommandEmpty>No language found.</CommandEmpty>
                              <CommandGroup>
                                {languages.map((language) => (
                                  <CommandItem
                                    value={language.label}
                                    key={language.value}
                                    onSelect={() => {
                                      form.setValue("parent", language.value);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        language.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {language.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                {isSubmitting ? (
                  <Button className="w-fit self-end cursor-pointer">
                    Searching....
                    <Loader2 />
                  </Button>
                ) : (
                  <Button className="w-fit self-end cursor-pointer">
                    Search
                    <Search />
                  </Button>
                )}

                <Button className="w-fit self-end cursor-pointer">
                  Export
                  <Download />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

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

          <div className="flex gap-5 m-2 font-semibold">
            <span>Count:</span>
            <span className="text-green-800">Success: {successCountState}</span>
            <span className="text-yellow-600">
              Pending: {pendingCountState}
            </span>
            <span className="text-red-800">Failed: {failCountState}</span>
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
            {data.map((invoice, index) => (
              <TableRow key={index} className={"py-5"}>
                <TableCell className="font-medium text-center border border-gray-300">
                  {index + 1}
                </TableCell>
                <TableCell className="font-medium text-center border border-gray-300">
                  <Link href={`?user=${invoice.userId?.mobile}`}>
                    {invoice.userId?.name} - {invoice.userId?.mobile}
                  </Link>
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
                      trigger={
                        <Check
                          className="cursor-pointer"
                          onClick={() => {
                            setmessage(
                              `Are you sure want to success request for ${invoice.operator?.name}, Mobile: ${invoice.number} of Rs.${invoice.amount} ?`
                            );
                            setisconfirm(true);
                          }}
                        />
                      }
                      content={"Success"}
                    />
                    <CustTooltip
                      trigger={
                        <X
                          className="cursor-pointer"
                          onClick={() => {
                            setmessage(
                              `Are you sure want to refund request for ${invoice.operator?.name}, Mobile: ${invoice.number} of Rs.${invoice.amount} ?`
                            );
                            setisconfirm(true);
                          }}
                        />
                      }
                      content={"Refund"}
                    />
                    <CustTooltip
                      trigger={
                        <RefreshCw
                          className="cursor-pointer"
                          onClick={() => alert("status")}
                        />
                      }
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
        <div className="flex justify-end gap-5 p-3">
          {page > 1 ? (
            <Button
              onClick={() => handlePageChange(Number(page) - 1)}
              className={"text-white cursor-pointer"}
            >
              Previous
            </Button>
          ) : (
            <Button disabled={true}>Previous</Button>
          )}
          {page === TotalPages ? (
             <Button disabled={true}>Next</Button>
          ) : (
            <Button
              onClick={() => handlePageChange(Number(page) + 1)}
              className={"text-white cursor-pointer"}
            >
              Next
            </Button>
          )}
        </div>
      </div>
      <CustomAlert
        isconfirm={isconfirm}
        setisconfirm={setisconfirm}
        message={message}
        id={"jk"}
      />
    </>
  );
};

export default Searchform;
