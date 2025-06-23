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
import { useForm, useFormState } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { payBill } from "@/app/actions/actions";

const PayBill = ({operator}) => {
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
    const data = await payBill(values)
    toast.success(JSON.stringify(data));
    
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="mobile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Consumer Number/ Account ID</FormLabel>
              <FormControl>
                <Input
                  placeholder="Consumer Number"
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[50rem]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={null}>Select</SelectItem>
                  {operator.map((op, index) => {
                    if (op.providertype === "electricity") {
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
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Payment
            Processing.....
          </Button>
        ) : (
          <Button type="submit" className="cursor-pointer">
            Pay
          </Button>
        )}
      </form>
    </Form>
  );
};

export default PayBill;
