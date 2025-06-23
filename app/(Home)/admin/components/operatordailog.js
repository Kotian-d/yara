import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { operator } from "../../../zodschema/operatorSchema";
import { Button } from "@/components/ui/button";
import { addOperator } from "@/app/actions/actions";

const Operatordailog = ({ isopen, setisopen, apidata, providerTypes }) => {
  const form = useForm({
    resolver: zodResolver(operator),
    defaultValues: {
      logo: null,
      name: "",
      opcode: "",
      isfetchbill: false,
      mobilelabel: "",
      mobilelength: "",
      amountlabel: "",
      amountlength: "",
      providertype: "",
      api1: "",
      api2: "",
      planapi: "",
      isactive: true,
      denomination: "",
    },
  });

  async function onSubmit(params) {
    const formData = new FormData();
    formData.append("logo", params.logo);
    formData.append("name", params.name);
    formData.append("opcode", params.opcode);
    formData.append("isfetchbill", params.isfetchbill);
    formData.append("mobilelabel", params.mobilelabel);
    formData.append("mobilelength", params.mobilelength);
    formData.append("amountlabel", params.amountlabel);
    formData.append("amountlength", params.amountlength);
    formData.append("providertype", params.providertype);
    formData.append("api1", params.api1);
    formData.append("api2", params.api2);
    formData.append("planapi", params.planapi);
    formData.append("isactive", params.isactive);
    formData.append("denomination", params.denomination);
    await addOperator(formData);
    form.reset();
    setisopen(false);
  }

  return (
    <Dialog open={isopen} onOpenChange={setisopen} className="p-5">
      <DialogContent className="lg:max-w-[30%] overflow-y-scroll max-h-[85%] mostly-customized-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-center p-3">Add operator</DialogTitle>
          <DialogDescription className="text-center">
            Fill the below form to add operator
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            method="POST"
            encType="multipart/form-data"
            className="space-y-8 h-full"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="logo"
              render={({ field: { ref, name, onBlur, onChange } }) => (
                <FormItem>
                  <FormLabel>Operator Logo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="logo"
                      type="file"
                      ref={ref}
                      accept="image/*"
                      name={name}
                      onBlur={onBlur}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        onChange(file ? file : undefined);
                      }}
                      className="file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Operator Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="opcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opcode</FormLabel>
                  <FormControl>
                    <Input placeholder="Opcode" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mobilelabel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile number Label Text</FormLabel>
                  <FormControl>
                    <Input placeholder="Mobile number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mobilelength"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile number length</FormLabel>
                  <FormControl>
                    <Input placeholder="Min-Max Length" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amountlabel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount Label</FormLabel>
                  <FormControl>
                    <Input placeholder="Amount" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amountlength"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min and Max Amount length</FormLabel>
                  <FormControl>
                    <Input placeholder="10-10000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="providertype"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ProviderType</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className={"w-full"}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select ProviderType" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {providerTypes.map((types, index) => {
                        return (
                          <SelectItem value={types._id} key={index}>
                            {types.name}
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
              name="api1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API 1</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className={"w-full"}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {apidata.map((api, index) => {
                        if (!api.isPlanApi) {
                          return (
                            <SelectItem key={index} value={api.id}>
                              {api.name}
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
              className="w-full"
              control={form.control}
              name="api2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API 2</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className={"w-full"}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {apidata.map((api, index) => {
                        if (!api.isPlanApi) {
                          return (
                            <SelectItem key={index} value={api.id}>
                              {api.name}
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
              name="planapi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plan Api</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className={"w-full"}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {apidata.map((api, index) => {
                        if (api.isPlanApi) {
                          return (
                            <SelectItem key={index} value={api.id}>
                              {api.name}
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
              name="isactive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">IsActive</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="denomination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blocked denomination</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the Denomination to Block in comma separated format Example: 199,299"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Operatordailog;
