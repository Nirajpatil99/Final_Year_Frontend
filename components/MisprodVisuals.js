import MachineShopVisuals from "./MachineShopVisuals";
import OpInHouseProdVisuals from "./OpInHouseProdVisuals";

const MisprodVisuals = ({ data }) => {
  return (
    <div className="text-center">
      <MachineShopVisuals data={data["FC - Machine Shop"]} />
      <OpInHouseProdVisuals data={data["FC - Operations - In House Prod"]} />
    </div>
  );
};

export default MisprodVisuals;
