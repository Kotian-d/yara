import { FilePenLine, Trash2 } from "lucide-react";
import Link from "next/link";
import { getApiData } from "@/app/queries/apiquery";
import { deleteApi } from "@/app/actions/actions";

const Apis = async() => {
  const apis = await getApiData();
  return (
    <div className="w-full p-3 bg-background">
      <div className="flex flex-col justify-between py-5">
        <h1 className="font-semibold tracking-wide text-xl font-sans">
          Api Master
        </h1>
        <div className="flex flex-col gap-4">
          <div className="flex justify-end items-center">
            <Link
              className="p-2 px-3 bg-primary text-white rounded-md tracking-wide text-sm text-nowrap"
              href={"/admin/apimaster/add"}
            >
              + ADD API
            </Link>
          </div>
          <div className="overflow-auto">
            <table className="table-auto w-full">
              <thead>
                <tr className="border bg-primary/75 text-primary-foreground font-thin font-sans text-sm text-nowrap">
                  <th className="px-4 py-2 text-center">SI</th>
                  <th className="px-4 py-2 text-center">Id</th>
                  <th className="px-4 py-2 text-center">Name</th>
                  <th className="px-4 py-2 text-center">isActive</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {apis.map((api, index) => {
                  return (
                    <tr
                      key={api.id}
                      className="border odd:bg-primary/0 even:bg-primary/5 text-sm text-nowrap"
                    >
                      <td className="px-4 py-2 text-center">{index + 1}</td>
                      <td className="px-4 py-2 text-center">{api.id}</td>
                      <td className="px-4 py-2 text-center">{api.name}</td>
                      <td className="px-4 py-2 text-center">
                        {api.isActive ? (
                          <span className="bg-green-300 text-green-800 text-xs rounded-full py-1 px-2">
                            Active
                          </span>
                        ) : (
                          <span className="bg-red-300 text-xs text-green-800 w-fit rounded-full py-1 px-2">
                            InActive
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2 text-center flex justify-center items-center gap-3">
                        <Link href={`/admin/apimaster/${api.id}`}>
                          <FilePenLine />
                        </Link>
                        <form action={deleteApi} className="flex items-center">
                          <input type="hidden" name="id" value={api.id} />
                          <button type="submit">
                            <Trash2 className="cursor-pointer" />
                          </button>
                        </form>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apis;
