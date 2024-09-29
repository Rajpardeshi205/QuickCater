import { Button, Dialog, DialogBody, Input } from "@material-tailwind/react";
import { useState } from "react";

const BuyNowModal = ({ addressInfo, setAddressInfo, buyNowFunction }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  return (
    <>
      <Button
        type="button"
        onClick={handleOpen}
        className="w-full px-4 py-3 text-center text-gray-100 bg-red-500 border border-transparent dark:border-red-700 hover:border-red-500 hover:text-red-700 hover:bg-red-100 rounded-xl"
      >
        Buy now
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        className="login_Form bg-gray-200 backdrop-blur-2xl rounded-[45px] shadow-[20px_20px_15px_10px_rgba(0,0,0,0.7)] transition-transform duration-300 hover:shadow-[10px_10px_15px_5px_rgba(0,0,0,0.5)] hover:translate-y-[-5px] px-8 py-6 border border-black  w-96"
      >
        <DialogBody className="">
          <div className="mb-3">
            <Input
              type="text"
              value={addressInfo.name}
              onChange={(e) => {
                setAddressInfo({
                  ...addressInfo,
                  name: e.target.value,
                });
              }}
              label="Full Name"
              color="red"
            />
          </div>
          <div className="mb-3">
            <Input
              type="text"
              value={addressInfo.address}
              onChange={(e) => {
                setAddressInfo({
                  ...addressInfo,
                  address: e.target.value,
                });
              }}
              label="Your Address"
              color="red"
            />
          </div>

          <div className="mb-3">
            <Input
              type="number"
              value={addressInfo.pincode}
              onChange={(e) => {
                setAddressInfo({
                  ...addressInfo,
                  pincode: e.target.value,
                });
              }}
              label="Your Pincode"
              color="red"
            />
          </div>

          <div className="mb-3">
            <Input
              type="number"
              value={addressInfo.mobileNumber}
              onChange={(e) => {
                setAddressInfo({
                  ...addressInfo,
                  mobileNumber: e.target.value,
                });
              }}
              label="Your Mobile Number"
              color="red"
            />
          </div>

          <div className="">
            <Button
              type="button"
              onClick={() => {
                handleOpen();
                buyNowFunction();
              }}
              className="w-full px-4 py-3 text-center text-gray-100 bg-red-600 border border-transparent dark:border-gray-700 rounded-lg"
            >
              Buy now
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default BuyNowModal;
