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
import { fetchBill } from "@/app/actions/actions";

const FetchBill = ({operator, setbillfetched}) => {
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

  async function onBillFetch(values) {
    const data = await fetchBill(values)
    toast.success(data);
    setbillfetched(true)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onBillFetch)} className="space-y-8">
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

        {isSubmitting ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Fetching Bill.....
          </Button>
        ) : (
          <Button type="submit" className="cursor-pointer">
            View Bill
          </Button>
        )}
      </form>
    </Form>
  );
};

export default FetchBill;
