"use client";
import { useState } from "react";
import { FilePenLine, Trash2, Pencil } from "lucide-react";
import { updateRoute } from "../../../actions/actions";
import Operatordailog from "./operatordailog";
import Updaterouteform from "./updateform";
import Confirmdailog from "./confirmdailog";
import Link from "next/link";
import Image from "next/image";
import Editoperatordailog from "./editoperatordailog";

const RoutingTable = ({
  operatordata,
  apidata,
  apiroutecount,
  providerTypes,
}) => {
  const [isopen, setisopen] = useState(false);
  const [isconfirm, setisconfirm] = useState(false);
  const [iseditable, setisEditable] = useState(false);
  const [editrow, setEditRow] = useState(null);
  const [selectedId, setselectedId] = useState(null);
  const [iseditdailog, setiseditdailog] = useState(false);
  const [editItem, seteditItem] = useState(null);

  async function SendRouteUpdate(params) {
    await updateRoute(params);
    setisEditable(false);
    setEditRow(null);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end items-center">
        <button
          className="p-2 px-3 bg-primary text-white rounded-md tracking-wide text-sm text-nowrap"
          onClick={() => {
            setisopen(true);
          }}
        >
          + ADD Operator
        </button>
      </div>
      <div className="overflow-auto mostly-customized-scrollbar">
        <form action={SendRouteUpdate}>
          <table className="table-auto w-full">
            <thead>
              <tr className="border bg-primary/75 text-primary-foreground font-thin font-sans text-sm text-nowrap">
                <th className="px-4 py-2 text-center">
                  <input type="checkbox" name="check" />
                </th>
                <th className="px-4 py-2 text-center">Logo</th>
                <th className="px-2 py-2 text-center">OP Code</th>
                <th className="px-2 py-2 text-center">Operator</th>
                <th className="px-2 py-2 text-center">ProviderType</th>
                {new Array(Number(apiroutecount))
                  .fill("0")
                  .map((val, index) => {
                    return (
                      <th className="px-2 py-2 text-center" key={index}>
                        API {index + 1}
                      </th>
                    );
                  })}
                <th className="px-2 py-2 text-center">PlanApi</th>
                <th className="px-2 py-2 text-center w-fit">Is Active</th>
                <th className="px-2 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {operatordata.map((items, index) => {
                return (
                  <tr
                    key={index}
                    className="border odd:bg-primary/0 even:bg-primary/5 text-sm text-nowrap"
                  >
                    {iseditable ? (
                      editrow !== index ? (
                        <>
                          <td className="border font-medium px-4 py-2 text-center">
                            <input
                              type="checkbox"
                              name="check"
                              value={items.opcode}
                            />
                          </td>

                          <td className="border font-medium text-center">
                            <div className="w-full flex justify-center p-2">
                              <Image
                                alt="logo"
                                src={
                                  items.logo
                                    ? items.logo
                                    : "/uploads/thumbnail.png"
                                }
                                width={45}
                                height={45}
                              />
                            </div>
                          </td>

                          <td className="border font-medium px-4 py-2 text-center">
                            {items?.opcode}
                          </td>

                          {/** Provider Type */}
                          <td className="border font-medium px-4 py-2 text-center">
                            {items?.name}
                          </td>

                          {/** Provider Type */}
                          <td className="border font-medium px-4 py-2 text-center">
                            {items?.providertype?.name}
                          </td>

                          {new Array(Number(apiroutecount))
                            .fill("0")
                            .map((val, index) => {
                              return (
                                <td
                                  className="border font-medium px-4 py-2 text-center"
                                  key={index}
                                >
                                  {eval(`items.api${index + 1}`)
                                    ? eval(`items.api${index + 1}.name`)
                                    : "STOPRECHARGE"}
                                </td>
                              );
                            })}

                          <td className="border font-medium px-4 py-2 text-center">
                            {items?.planapi?.name}
                          </td>

                          <td className="border font-medium py-2 text-center">
                            {items.isenabled ? (
                              <span className="bg-green-300 text-green-800 text-xs rounded-full py-1 px-2">
                                Active
                              </span>
                            ) : (
                              <span className="bg-red-300 text-xs text-green-800 w-fit rounded-full py-1 px-2">
                                InActive
                              </span>
                            )}
                          </td>

                          <td className="text-center gap-4 flex justify-center items-center py-2 w-full">
                            <FilePenLine
                              onClick={() => {
                                setisEditable(true);
                                setEditRow(index);
                              }}
                              className="cursor-pointer h-full"
                            />

                            <Pencil
                              className="cursor-pointer h-full"
                              onClick={() => {
                                seteditItem(items);
                                setiseditdailog(true);
                              }}
                            />

                            <button
                              type="button"
                              disabled={true}
                              onClick={() => {
                                setDelete_id(items._id);
                                setisconfirm(true);
                              }}
                            >
                              <Trash2 className="cursor-not-allowed" />
                            </button>
                          </td>
                        </>
                      ) : (
                        <Updaterouteform
                          items={items}
                          index={index}
                          apidata={apidata}
                          setEditRow={setEditRow}
                          setisEditable={setisEditable}
                          apiroutecount={apiroutecount}
                        />
                      )
                    ) : (
                      <>
                        <td className="border font-medium px-4 py-2 text-center">
                          <input
                            type="checkbox"
                            name="check"
                            value={items.opcode}
                          />
                        </td>

                        <td className="border font-medium text-center">
                          <div className="w-full flex justify-center p-2">
                            <Image
                              alt="logo"
                              src={
                                items.logo
                                  ? items.logo
                                  : "/uploads/thumbnail.png"
                              }
                              width={45}
                              height={45}
                            />
                          </div>
                        </td>

                        <td className="border font-medium px-4 py-2 text-center">
                          {items.opcode}
                        </td>

                        {/** Provider Type */}
                        <td className="border font-medium px-4 py-2 text-center">
                          {items.name}
                        </td>

                        {/** Provider Type */}
                        <td className="border font-medium px-4 py-2 text-center">
                          {items?.providertype?.name}
                        </td>

                        {new Array(Number(apiroutecount))
                          .fill("0")
                          .map((val, index) => {
                            return (
                              <td
                                className="border font-medium px-4 py-2 text-center"
                                key={index}
                              >
                                {eval(`items.api${index + 1}`)
                                  ? eval(`items.api${index + 1}?.name`)
                                  : "STOPRECHARGE"}
                              </td>
                            );
                          })}

                        <td className="border font-medium px-4 py-2 text-center">
                          {items?.planapi?.name}
                        </td>

                        <td className="border font-medium py-2 text-center">
                          {items.isenabled ? (
                            <span className="bg-green-300 text-green-800 text-xs rounded-full py-1 px-2">
                              Active
                            </span>
                          ) : (
                            <span className="bg-red-300 text-xs text-green-800 w-fit rounded-full py-1 px-2">
                              InActive
                            </span>
                          )}
                        </td>

                        <td className="text-center gap-4 flex justify-center items-center py-4 w-full">
                          <FilePenLine
                            onClick={() => {
                              setisEditable(true);
                              setEditRow(index);
                            }}
                            className="cursor-pointer h-full"
                          />

                          <Pencil
                            className="cursor-pointer h-full"
                            onClick={() => {
                              seteditItem(items);
                              setiseditdailog(true);
                            }}
                          />

                          <button
                            type="button"
                            onClick={() => {
                              setselectedId(items._id);
                              setisconfirm(true);
                            }}
                          >
                            <Trash2 className="cursor-pointer" />
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </form>
        <Operatordailog
          isopen={isopen}
          setisopen={setisopen}
          apidata={apidata}
          providerTypes={providerTypes}
        />
        {iseditdailog && (
          <Editoperatordailog
            iseditoperator={iseditdailog}
            setiseditoperator={setiseditdailog}
            editItem={editItem}
            apidata={apidata}
            providerTypes={providerTypes}
          />
        )}

        <Confirmdailog
          isconfirm={isconfirm}
          setisconfirm={setisconfirm}
          id={selectedId}
        />
      </div>
    </div>
  );
};

export default RoutingTable;
