import providertype from "@/app/model/providertype";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit } from "lucide-react";

const ProviderTypes = async () => {
  const providerTypes = await providertype.find({});
  return (
    <div className="p-8">
        <h2 className="font-semibold p-2">Provider Types</h2>
      <Table className={"border"}>
        <TableCaption>A list of ProviderTypes.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="border text-center">Name</TableHead>
            <TableHead className="border text-center">isActive</TableHead>
            <TableHead className="border text-center">isfetchbill</TableHead>
            <TableHead className="border text-center">Success retry(in minutes)</TableHead>
            <TableHead className="border text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {providerTypes.map((providerType, index) => {
            return (
              <TableRow key={index}>
                <TableCell className="font-medium border text-center">
                  {providerType.name}
                </TableCell>
                <TableCell className="border text-center">
                  <Checkbox disabled
                    defaultChecked={providerType.isenabled}
                    className="cursor-pointer data-[state=checked]:border-blue-600 data-[state=checked]:bg-primary data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                  />
                </TableCell>
                <TableCell className="border text-center">
                  <Checkbox disabled
                    defaultChecked={providerType.isfetchbill}
                    className="cursor-pointer data-[state=checked]:border-blue-600 data-[state=checked]:bg-primary data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                  />
                </TableCell>
                 <TableCell className="font-medium border text-center">
                  {providerType.successretry}
                </TableCell>
                <TableCell className="font-medium border flex justify-center items-center border-none">
                  <Edit />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProviderTypes;
