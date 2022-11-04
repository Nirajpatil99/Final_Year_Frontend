import test from "../test.json";
import dynamic from "next/dynamic";
import ChartHolder from "../components/ChartHolder";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
import Charts from "../components/GetCharts";

const colors = ["#b71c1c", "#33691e", "#1a237e", "#3e2723"];

const getRandamColor = () => {
  return colors[Math.floor(Math.random() * (3 - 0 + 1) + 0)];
};

const OpInHouseProdVisuals = ({ data }) => {
  // const data = test["FC - Operations - In House Prod"];

  const Months = data["months"];
  const monthSize = Months.length;

  const AssemblyMonitoring = data["Assembly Monitoring"];
  const AssemblyMonitoringKeys = Object.keys(AssemblyMonitoring[0]);
  let TotalDomesticProd = 0;
  AssemblyMonitoring.every(
    (e) => (TotalDomesticProd += e[AssemblyMonitoringKeys[0]][3])
  );
  let TotalExportProd = 0;
  AssemblyMonitoring.every(
    (e) => (TotalExportProd += e[AssemblyMonitoringKeys[1]][3])
  );
  let TotalRailwayProd = 0;
  AssemblyMonitoring.every(
    (e) => (TotalRailwayProd += e[AssemblyMonitoringKeys[2]][3])
  );

  const IHPClampsFlangs = data["In House Production : Clamps/Flanges"];
  const IHPClampsFlangsKeys = Object.keys(IHPClampsFlangs[0]);
  let TotalWeldPlateProd = 0;
  IHPClampsFlangs.forEach(
    (e) => (TotalWeldPlateProd += e[IHPClampsFlangsKeys[5]][3])
  );

  let TotalTopPlateProd = 0;
  IHPClampsFlangs.forEach(
    (e) => (TotalTopPlateProd += e[IHPClampsFlangsKeys[4]][3])
  );
  let TotalIntermediatePlateProd = 0;
  IHPClampsFlangs.forEach(
    (e) => (TotalIntermediatePlateProd += e[IHPClampsFlangsKeys[3]][3])
  );
  let TotalIntermediateBoltProd = 0;
  IHPClampsFlangs.forEach(
    (e) => (TotalIntermediateBoltProd += e[IHPClampsFlangsKeys[2]][3])
  );
  let TotalDrillingBoringProd = 0;
  IHPClampsFlangs.forEach(
    (e) => (TotalDrillingBoringProd += e[IHPClampsFlangsKeys[1]][3])
  );
  let TotalFlangSleevesProd = 0;
  IHPClampsFlangs.forEach(
    (e) => (TotalFlangSleevesProd += e[IHPClampsFlangsKeys[0]][3])
  );

  const IHPValves = data["In House Production : Valves"];
  const IHPValvesKeys = Object.keys(IHPValves[0]);
  let TotalNeedleValveBodiesProd = 0;
  IHPValves.forEach(
    (e) => (TotalNeedleValveBodiesProd += e[IHPValvesKeys[2]][3])
  );
  let TotalBallValvesProd = 0;
  IHPValves.forEach((e) => (TotalBallValvesProd += e[IHPValvesKeys[0]][3]));
  let TotalCheckValvesProd = 0;
  IHPValves.forEach((e) => (TotalCheckValvesProd += e[IHPValvesKeys[1]][3]));

  const IHPFittings = data["In House Production : Fittings"];
  const IHPFittingsKeys = Object.keys(IHPFittings[0]);
  let TotalBodiesProd = 0;
  IHPFittings.forEach((e) => (TotalBodiesProd += e[IHPFittingsKeys[1]][3]));
  let TotalNutsInHouseProd = 0;
  IHPFittings.forEach(
    (e) => (TotalNutsInHouseProd += e[IHPFittingsKeys[4]][3])
  );
  let TotalFrontFerrulesProd = 0;
  IHPFittings.forEach(
    (e) => (TotalFrontFerrulesProd += e[IHPFittingsKeys[2]][3])
  );
  let TotalBackFerrulesProd = 0;
  IHPFittings.forEach(
    (e) => (TotalBackFerrulesProd += e[IHPFittingsKeys[0]][3])
  );
  let TotalNutBlanksProd = 0;
  IHPFittings.forEach((e) => (TotalNutBlanksProd += e[IHPFittingsKeys[3]][3]));

  return (
    <>
      <span className="text-accent text-center tracking-widest font-bold text-2xl">
        Assembly Monitoring
      </span>
      <div className="flex flex-row flex-wrap justify-center">
        <ChartHolder>
          <p className="text-2xl font-bold">Total Domestic Production</p>
          <p>
            {Months[0]} To {Months[monthSize - 1]}
          </p>
          <p className="mt-3 text-4xl text-green">{TotalDomesticProd}</p>
          <p className="mt-3">Units</p>
        </ChartHolder>
        <ChartHolder>
          <p className="text-2xl font-bold">Total Export Production</p>
          <p>
            {Months[0]} To {Months[monthSize - 1]}
          </p>
          <p className="mt-3 text-4xl text-green">{TotalExportProd}</p>
          <p className="mt-3">Units</p>
        </ChartHolder>
        <ChartHolder>
          <p className="text-2xl font-bold">Total Railway Production</p>
          <p>
            {Months[0]} To {Months[monthSize - 1]}
          </p>
          <p className="mt-3 text-4xl text-green">{TotalRailwayProd}</p>
          <p className="mt-3">Units</p>
        </ChartHolder>
      </div>
      <ChartHolder>
        <Charts
          type="bar"
          stacked={true}
          convert={false}
          data={[
            {
              name: "Total Domestic Production",
              data: AssemblyMonitoring.map(
                (e) => e[AssemblyMonitoringKeys[0]][3]
              ),
            },
            {
              name: "Total Export Production",
              data: AssemblyMonitoring.map(
                (e) => e[AssemblyMonitoringKeys[1]][3]
              ),
            },
            {
              name: "Total Railway Production",
              data: AssemblyMonitoring.map(
                (e) => e[AssemblyMonitoringKeys[2]][3]
              ),
            },
          ]}
          categories={Months}
          xTitle="Months"
          yTitle="Units"
        />
      </ChartHolder>
      <span className="text-accent text-center tracking-widest font-bold text-2xl">
        In House Production - Clams And Flangs
      </span>
      <div className="flex flex-row flex-wrap justify-center">
        <ChartHolder>
          <p className="text-2xl font-bold">Total Plates</p>
          {TotalWeldPlateProd === 0 ? (
            <p className={"mt-3 text-red"}>
              There Were No Plates Produced <br /> During {Months[0]} To{" "}
              {Months[monthSize - 1]}
            </p>
          ) : (
            <>
              <p>
                {Months[0]} To {Months[monthSize - 1]}
              </p>
              <p className={"mt-3 text-4xl text-green"}>{TotalWeldPlateProd}</p>
              <p className="mt-3">Units</p>
            </>
          )}
        </ChartHolder>
        <ChartHolder>
          <p className="text-2xl font-bold">Total Plates</p>
          {TotalTopPlateProd === 0 ? (
            <p className={"mt-3  text-red"}>
              There Were No Top Plates Produced <br /> During {Months[0]} To{" "}
              {Months[monthSize - 1]}
            </p>
          ) : (
            <>
              <p>
                {Months[0]} To {Months[monthSize - 1]}
              </p>
              <p className={"mt-3 text-4xl text-green"}>{TotalTopPlateProd}</p>
              <p className="mt-3">Units</p>
            </>
          )}
        </ChartHolder>
        <ChartHolder>
          <p className="text-2xl font-bold">Total Plates</p>
          {TotalIntermediatePlateProd === 0 ? (
            <p className={"mt-3  text-red"}>
              There Were No Intermediate Plates Produced <br /> During{" "}
              {Months[0]} To {Months[monthSize - 1]}
            </p>
          ) : (
            <>
              <p>
                {Months[0]} To {Months[monthSize - 1]}
              </p>
              <p className={"mt-3 text-4xl text-green"}>
                {TotalIntermediatePlateProd}
              </p>
              <p className="mt-3">Units</p>
            </>
          )}
        </ChartHolder>
        <ChartHolder>
          <p className="text-2xl font-bold">Total Bolt</p>
          {TotalIntermediateBoltProd === 0 ? (
            <p className={"mt-3  text-red"}>
              There Were No Intermediate Bolt Produced <br /> During {Months[0]}{" "}
              To {Months[monthSize - 1]}
            </p>
          ) : (
            <>
              <p>
                {Months[0]} To {Months[monthSize - 1]}
              </p>
              <p className={"mt-3 text-4xl text-green"}>
                {TotalIntermediateBoltProd}
              </p>
              <p className="mt-3">Units</p>
            </>
          )}
        </ChartHolder>
        <ChartHolder>
          <p className="text-2xl font-bold">
            Total Drilling / boring - PP and Alum Clamps Produced
          </p>
          {TotalDrillingBoringProd === 0 ? (
            <p className={"mt-3 text-red"}>
              There Were No Drilling / boring - PP and Alum Clamps Produced{" "}
              <br /> During {Months[0]} To {Months[monthSize - 1]}
            </p>
          ) : (
            <>
              <p>
                {Months[0]} To {Months[monthSize - 1]}
              </p>
              <p className={"mt-3 text-4xl text-green"}>
                {TotalDrillingBoringProd}
              </p>
              <p className="mt-3">Units</p>
            </>
          )}
        </ChartHolder>
        <ChartHolder>
          <p className="text-2xl font-bold">Total Flanges / Sleeves Produced</p>
          {TotalFlangSleevesProd === 0 ? (
            <p className={"mt-3 text-red"}>
              There Were No Flanges / Sleeves Produced <br /> During {Months[0]}{" "}
              To {Months[monthSize - 1]}
            </p>
          ) : (
            <>
              <p>
                {Months[0]} To {Months[monthSize - 1]}
              </p>
              <p className={"mt-3 text-4xl text-green"}>
                {TotalFlangSleevesProd}
              </p>
              <p className="mt-3">Units</p>
            </>
          )}
        </ChartHolder>
      </div>
      <ChartHolder>
        <Charts
          type="bar"
          stacked={true}
          convert={false}
          data={[
            {
              name: "Total Weld Plates Production",
              data: IHPClampsFlangs.map((e) => e[IHPClampsFlangsKeys[5]][3]),
            },
            {
              name: "Total Top Plates Production",
              data: IHPClampsFlangs.map((e) => e[IHPClampsFlangsKeys[4]][3]),
            },
            {
              name: "Total Intermediate Plates Production",
              data: IHPClampsFlangs.map((e) => e[IHPClampsFlangsKeys[3]][3]),
            },
            {
              name: "Total Intermediate Bolt Production",
              data: IHPClampsFlangs.map((e) => e[IHPClampsFlangsKeys[2]][3]),
            },
            {
              name: "Total Drilling / boring - PP and Alum Clamps Production",
              data: IHPClampsFlangs.map((e) => e[IHPClampsFlangsKeys[1]][3]),
            },
            {
              name: "Total Flanges / Sleeves Production",
              data: IHPClampsFlangs.map((e) => e[IHPClampsFlangsKeys[0]][3]),
            },
          ]}
          categories={Months}
          xTitle="Months"
          yTitle="Units"
        />
      </ChartHolder>
      <span className="text-accent text-center tracking-widest font-bold text-2xl">
        In House Production - Valves
      </span>
      <div className="flex flex-row flex-wrap justify-center">
        <ChartHolder>
          <p className="text-2xl font-bold">
            Total Needle Valve Bodies Produced
          </p>
          {TotalNeedleValveBodiesProd === 0 ? (
            <p className={"mt-3 text-red"}>
              There Were No Needle Valve Bodies Produced <br /> During{" "}
              {Months[0]} To {Months[monthSize - 1]}
            </p>
          ) : (
            <>
              <p>
                {Months[0]} To {Months[monthSize - 1]}
              </p>
              <p className={"mt-3 text-4xl text-green"}>
                {TotalNeedleValveBodiesProd}
              </p>
              <p className="mt-3">Units</p>
            </>
          )}
        </ChartHolder>
        <ChartHolder>
          <p className="text-2xl font-bold">
            Total Ball Valves Bodies/EC'S Produced
          </p>
          {TotalBallValvesProd === 0 ? (
            <p className={"mt-3 text-red"}>
              There Were No Ball Valves Bodies/EC'S Produced <br /> During{" "}
              {Months[0]} To {Months[monthSize - 1]}
            </p>
          ) : (
            <>
              <p>
                {Months[0]} To {Months[monthSize - 1]}
              </p>
              <p className={"mt-3 text-4xl text-green"}>
                {TotalBallValvesProd}
              </p>
              <p className="mt-3">Units</p>
            </>
          )}
        </ChartHolder>
        <ChartHolder>
          <p className="text-2xl font-bold">
            Total Check Valve Bodies Produced
          </p>
          {TotalCheckValvesProd === 0 ? (
            <p className={"mt-3 text-red"}>
              There Were No Check Valve Bodies Produced <br /> During{" "}
              {Months[0]} To {Months[monthSize - 1]}
            </p>
          ) : (
            <>
              <p>
                {Months[0]} To {Months[monthSize - 1]}
              </p>
              <p className={"mt-3 text-4xl text-green"}>
                {TotalCheckValvesProd}
              </p>
              <p className="mt-3">Units</p>
            </>
          )}
        </ChartHolder>
      </div>
      <ChartHolder>
        <Charts
          type="bar"
          stacked={true}
          convert={false}
          data={[
            {
              name: "Total Needle Valve Bodies Produced",
              data: IHPValves.map((e) => e[IHPValvesKeys[2]][3]),
            },
            {
              name: "Total Ball Valves Bodies/EC'S Produced",
              data: IHPValves.map((e) => e[IHPValvesKeys[0]][3]),
            },
            {
              name: "Total Check Valve Bodies Produced",
              data: IHPValves.map((e) => e[IHPValvesKeys[1]][3]),
            },
          ]}
          categories={Months}
          xTitle="Months"
          yTitle="Units"
        />
      </ChartHolder>
      <span className="text-accent text-center tracking-widest font-bold text-2xl">
        In House Production - Fittings
      </span>
      <div className="flex flex-row flex-wrap justify-center">
        <ChartHolder>
          <p className="text-2xl font-bold">Total Bodies Produced</p>
          {TotalBodiesProd === 0 ? (
            <p className={"mt-3 text-red"}>
              There Were No Bodies Produced <br /> During {Months[0]} To{" "}
              {Months[monthSize - 1]}
            </p>
          ) : (
            <>
              <p>
                {Months[0]} To {Months[monthSize - 1]}
              </p>
              <p className={"mt-3 text-4xl text-green"}>{TotalBodiesProd}</p>
              <p className="mt-3">Units</p>
            </>
          )}
        </ChartHolder>
        <ChartHolder>
          <p className="text-2xl font-bold">Total Nuts in-house Produced</p>
          {TotalNutsInHouseProd === 0 ? (
            <p className={"mt-3 text-red"}>
              There Were No Nuts in-house Produced <br /> During {Months[0]} To{" "}
              {Months[monthSize - 1]}
            </p>
          ) : (
            <>
              <p>
                {Months[0]} To {Months[monthSize - 1]}
              </p>
              <p className={"mt-3 text-4xl text-green"}>
                {TotalNutsInHouseProd}
              </p>
              <p className="mt-3">Units</p>
            </>
          )}
        </ChartHolder>
        <ChartHolder>
          <p className="text-2xl font-bold">Total Front Ferrules Produced</p>
          {TotalFrontFerrulesProd === 0 ? (
            <p className={"mt-3 text-red"}>
              There Were No Front Ferrules Produced <br /> During {Months[0]} To{" "}
              {Months[monthSize - 1]}
            </p>
          ) : (
            <>
              <p>
                {Months[0]} To {Months[monthSize - 1]}
              </p>
              <p className={"mt-3 text-4xl text-green"}>
                {TotalFrontFerrulesProd}
              </p>
              <p className="mt-3">Units</p>
            </>
          )}
        </ChartHolder>
        <ChartHolder>
          <p className="text-2xl font-bold">Total Back Ferrules Produced</p>
          {TotalBackFerrulesProd === 0 ? (
            <p className={"mt-3 text-red"}>
              There Were No Back Ferrules Produced <br /> During {Months[0]} To{" "}
              {Months[monthSize - 1]}
            </p>
          ) : (
            <>
              <p>
                {Months[0]} To {Months[monthSize - 1]}
              </p>
              <p className={"mt-3 text-4xl text-green"}>
                {TotalBackFerrulesProd}
              </p>
              <p className="mt-3">Units</p>
            </>
          )}
        </ChartHolder>
        <ChartHolder>
          <p className="text-2xl font-bold">
            Total Nut blanks on Traub/Bandsaw Produced
          </p>
          {TotalNutBlanksProd === 0 ? (
            <p className={"mt-3 text-red"}>
              There Were No Nut blanks on Traub/Bandsaw Produced <br /> During{" "}
              {Months[0]} To {Months[monthSize - 1]}
            </p>
          ) : (
            <>
              <p>
                {Months[0]} To {Months[monthSize - 1]}
              </p>
              <p className={"mt-3 text-4xl text-green"}>{TotalNutBlanksProd}</p>
              <p className="mt-3">Units</p>
            </>
          )}
        </ChartHolder>
      </div>
      <ChartHolder>
        <Charts
          type="bar"
          stacked={true}
          convert={false}
          data={[
            {
              name: "Total Bodies Produced",
              data: IHPFittings.map((e) => e[IHPFittingsKeys[1]][3]),
            },
            {
              name: "Total Nuts in-house Produced",
              data: IHPFittings.map((e) => e[IHPFittingsKeys[4]][3]),
            },
            {
              name: "Total Front Ferrules Produced",
              data: IHPFittings.map((e) => e[IHPFittingsKeys[2]][3]),
            },
            {
              name: "Total Back Ferrules Produced",
              data: IHPFittings.map((e) => e[IHPFittingsKeys[0]][3]),
            },
            {
              name: "Total Nut blanks on Traub/Bandsaw Produced",
              data: IHPFittings.map((e) => e[IHPFittingsKeys[3]][3]),
            },
          ]}
          categories={Months}
          xTitle="Months"
          yTitle="Units"
        />
      </ChartHolder>
    </>
  );
};

export default OpInHouseProdVisuals;
