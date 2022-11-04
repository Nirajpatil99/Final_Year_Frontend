import Button from "./Button";
import Link from "next/link";

const VisualListItem = ({ name, onClick }) => {
  return (
    <div className="shadow-sm bg-grey-color w-full lg:w-4/6 mx-auto mt-3 mb-10 p-5 flex flex-row flex-wrap justify-around lg:justify-between rounded-lg items-center">
      <span>{name}</span>
      <Button className="hover:scale-105" type="normal" onClick={onClick}>
        Visualize
      </Button>
    </div>
  );
};

export default VisualListItem;
