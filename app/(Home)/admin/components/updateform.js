import { Save, CircleX } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import Image from "next/image";

const Updaterouteform = ({
  items,
  apidata,
  setEditRow,
  setisEditable,
  apiroutecount,
}) => {
  const [isenabled, setisenabled] = useState(items.isenabled);

  return (
    <>
      <td className="border font-medium px-2 py-2 text-center"></td>

      <td className="border font-medium text-center">
        <div className="w-full flex justify-center p-2">
          <Image
          alt="logo"
            src={items.logo ? items.logo : "/uploads/thumbnail.png"}
            width={45}
            height={45}
          />
        </div>
      </td>
      <td className="border font-medium px-2 py-2 text-center">
        <input type="hidden" value={items._id} name="id" />
        <input type="hidden" value={items.opcode} name="opcode" />
        {items.opcode}
      </td>

      <td className="border font-medium px-2 py-2 text-center">{items.name}</td>

      <td className="border font-medium px-2 py-2 text-center">
        {items.providertype?.name}
      </td>

      {new Array(Number(apiroutecount)).fill("0").map((val, index) => {
        return (
          <td className="border font-medium px-2 py-2 text-center" key={index}>
            <select
              name={`api${index + 1}`}
              defaultValue={eval(`items.api${index + 1}?.id`)}
              className="bg-transparent border rounded-md h-8 px-5"
            >
              {apidata.map((api, index) => {
                if(!api.isPlanApi){
                  return (
                    <option
                      key={index}
                      value={api.id}
                      className="text-center bg-transparent"
                    >
                      {api.name}
                    </option>
                  );
                }
              })}
            </select>
          </td>
        );
      })}

      <td className="border font-medium px-2 py-2 text-center">
        <select
          name="planapi"
          defaultValue={items.planapi?.id}
          className="bg-transparent border rounded-md h-8 px-5"
        >
          {apidata.map((api, index) => {
            if(api.isPlanApi){
              return (
                <option
                  key={index}
                  value={api.id}
                  className="text-center bg-transparent"
                >
                  {api.name}
                </option>
              );
            }
            
          })}
        </select>
      </td>

      <td className="border font-medium py-2 text-center">
        <Switch
          checked={isenabled}
          name={"isActive"}
          onCheckedChange={(value) => setisenabled(value)}
        />
      </td>

      <td className="text-center gap-8 flex justify-center items-center py-4 w-full">
        <button type="submit">
          <Save className="cursor-pointer" />
        </button>

        <CircleX
          onClick={() => {
            setisEditable(false);
            setEditRow(null);
          }}
          className="cursor-pointer"
        />
      </td>
    </>
  );
};

export default Updaterouteform;
