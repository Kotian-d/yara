import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteOperator } from "@/app/actions/actions";

const Confirmdailog = ({ isconfirm, setisconfirm, id }) => {

  async function Submitdelete(formData){
    await deleteOperator(formData);
    setisconfirm(false);
  }

  return (
    <Dialog open={isconfirm} onOpenChange={setisconfirm}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-semibold font-sans m-2">Are you absolutely sure?</DialogTitle>
          <DialogDescription className="font-sans font-xl">
            This action cannot be undone. Are you sure you want to permanently
            delete?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <form action={Submitdelete} className="flex gap-4">
            <input type="hidden" value={id} name="id" />
            <Button type="button" onClick={()=>{setisconfirm(false)}}>Cancel</Button>
            <Button type="submit" className={"bg-red-700"}>Confirm</Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Confirmdailog;
