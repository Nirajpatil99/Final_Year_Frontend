import dynamic from "next/dynamic";
import ChartHolder from "../components/ChartHolder";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

import Charts from "../components/GetCharts";

const colors = ["#b71c1c", "#33691e", "#1a237e", "#3e2723"];

const getRandamColor = () => {
  return colors[Math.floor(Math.random() * (3 - 0 + 1) + 0)];
};

import data from "../test2.json";

const MisProdVisuals = ({ dayTitle }) => {
  // console.log(Object.keys(jsonData).map((e) => console.log(jsonData[e])));
  // console.log(data);
  const dayData = data["13-09-2022"];
  const rows = dayData.rows;
  const majors = dayData.majors;
  const majorTitles = dayData.majorTitles;
  const majorKeys = majors.map((m) => Object.keys(m)[0]);

  console.log(majorKeys);

  let totalLoss = 0;
  rows.every((e) => (totalLoss += e.loss_qty));

  let totalQuantityRequired = 0;
  rows.every((e) => (totalQuantityRequired += e.qty_req));

  let totalQuantityAchieved = 0;
  rows.every((e) => (totalQuantityAchieved += e.qty_achieved));

  let totalProductionPerHr = 0;
  rows.every((e) => (totalProductionPerHr += e.prod_per_hr));

  let totalActualProductionTime = 0;
  rows.every((e) => (totalActualProductionTime += e.actual_prod_time));

  let totalCycleTime = 0;
  rows.every((e) => (totalCycleTime += e.cy_time));

  let totalPartRunningTime = 0;
  rows.every((e) => (totalPartRunningTime += e.part_running));

  const totalPartsProduced = new Set(rows.map((e) => e.partname)).size;

  return (
    <>
      {/* <div className="h-full"> */}
      <br />
      <>
        <div className="flex flex-row flex-wrap justify-center">
          <ChartHolder>
            <p className="text-2xl font-bold">Total Parts Produced</p>
            <p className="mt-3 text-4xl text-green">
              {totalPartsProduced.toFixed(0)}
            </p>
          </ChartHolder>
          <ChartHolder>
            <p className="text-2xl font-bold">Total Quantity Required</p>
            <p className="mt-3 text-4xl text-green">
              {totalQuantityRequired.toFixed(2)}
            </p>
            <p className="mt-3">Units</p>
          </ChartHolder>
          <ChartHolder>
            <p className="text-2xl font-bold">Total Quantity Achieved</p>
            <p className="mt-3">
              <span className="text-4xl text-green">
                {totalQuantityAchieved.toFixed(2)}
              </span>
              <span className="text-red pl-2">
                -{(totalQuantityRequired - totalQuantityAchieved).toFixed(2)}
              </span>
            </p>
            <p className="mt-3">Units</p>
          </ChartHolder>
          <ChartHolder>
            <p className="text-2xl font-bold">Total Production Per Hours</p>
            <p className="mt-3 text-4xl text-green">
              {totalProductionPerHr.toFixed(2)}
            </p>
            <p className="mt-3">Units</p>
          </ChartHolder>
          <ChartHolder>
            <p className="text-2xl font-bold">Total Actual Production Time</p>
            <p className="mt-3 text-4xl text-green">
              {totalActualProductionTime.toFixed(2)}
            </p>
          </ChartHolder>
          <ChartHolder>
            <p className="text-2xl font-bold">Total Cycle Time</p>
            <p className="mt-3 text-4xl text-green">{totalCycleTime}</p>
          </ChartHolder>
          <ChartHolder>
            <p className="text-2xl font-bold">Total Part Running Time</p>
            <p className="mt-3 text-4xl text-green">{totalPartRunningTime}</p>
          </ChartHolder>
        </div>
        <ChartHolder>
          <p>
            <span className="font-bold">Partwise Quantity Calculations</span>
          </p>
          <p>
            <span className="font-bold">Date : {dayTitle}</span>
          </p>
          <br />
          <ApexCharts
            options={{
              plotOptions: {
                bar: {
                  horizontal: false,
                  dataLabels: {
                    enabled: false,
                  },
                },
              },
              dataLabels: {
                enabled: true,
                textAnchor: "middle",

                style: {
                  fontSize: "8px",
                  fontWeight: "bold",
                },
                formatter: function (val) {
                  return val.toFixed(0);
                },
                style: {
                  colors: ["#333"],
                },
              },

              chart: {
                // stacked: true,
                toolbar: {
                  show: false,
                },
              },
              xaxis: {
                categories: rows.map((el) => el.partname),
                title: {
                  text: "Part Name",
                  position: "bottom",
                  style: {
                    fontSize: "14px",
                    // fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: 600,
                    // cssClass: "apexcharts-xaxis-title",
                  },
                },
                labels: {
                  style: {
                    fontSize: "13px",
                    fontWeight: 700,
                  },
                },
              },
              yaxis: {
                title: {
                  text: "Quantity",
                  offsetY: 0,
                  style: {
                    fontSize: "14px",
                    // fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: 600,
                    // cssClass: "apexcharts-xaxis-title",
                  },
                },
                tickAmount: 7,
                labels: {
                  formatter: function (val) {
                    return val.toFixed(0);
                  },
                  style: {
                    fontSize: "13px",
                    fontWeight: 700,
                  },
                },
              },
              legend: { position: "top" },
            }}
            series={[
              {
                name: "Quantity Required",
                data: rows.map((el) => el.qty_req),
              },
              {
                name: "Quantity Achieved",
                data: rows.map((el) => el.qty_achieved),
              },
            ]}
            type="bar"
            height={500}
          />
          <br />
          <br />
        </ChartHolder>
        <div className="flex flex-row flex-wrap justify-center">
          <ChartHolder className="w-4/5 xl:w-2/5">
            <p className="font-bold text-xl text-accent tracking-widest">
              {majorTitles[0]}
            </p>
            <Charts
              type="pie"
              data={
                [
                  "least_loss_mc_hr",
                  "max_actual_prod_time",
                  "max_loss_mc_hr",
                  "max_lossqty",
                ].includes(majorKeys[0])
                  ? majors[0][majorKeys[0]].map((e) =>
                      Number(e[Object.keys(e)[0]])
                    )
                  : maj[majorKeys[0]].map((e) => Number(e[Object.keys(e)[1]]))
              }
              xTitle="Partname"
              yTitle="Quantity"
              categories={majors[0][majorKeys[0]].map((e) => e.partname)}
            />
            <p>
              Part{" "}
              <span className="font-bold">
                {majors[0][majorKeys[0]][0].partname}
              </span>{" "}
              has maximum loss with{" "}
              <span className="font-bold">
                {majors[0][majorKeys[0]][0].loss_qty} Units
              </span>{" "}
              loss among{" "}
              <span className="font-bold">{totalPartsProduced} Parts</span>{" "}
              Produced
            </p>
          </ChartHolder>
          {/* <ChartHolder className="w-4/5 xl:w-2/5">
            <p className="font-bold text-xl text-accent tracking-widest">
              {majorTitles[1]}
            </p>
            <Charts
              type="line"
              data={
                [
                  "least_loss_mc_hr",
                  "max_actual_prod_time",
                  "max_loss_mc_hr",
                  "max_lossqty",
                ].includes(majorKeys[1])
                  ? majors[1][majorKeys[1]].map((e) =>
                      Number(e[Object.keys(e)[0]])
                    )
                  : maj[majorKeys[1]].map((e) => Number(e[Object.keys(e)[1]]))
              }
              xTitle="Partname"
              yTitle="Quantity"
              categories={majors[1][majorKeys[1]].map((e) => e.partname)}
            />
            <p>
              Part{" "}
              <span className="font-bold">
                {majors[1][majorKeys[1]][1].partname}
              </span>{" "}
              has maximum loss with{" "}
              <span className="font-bold">
                {majors[1][majorKeys[1]][1].loss_qty} Units
              </span>{" "}
              loss among{" "}
              <span className="font-bold">{totalPartsProduced} Parts</span>{" "}
              Produced
            </p>
          </ChartHolder> */}
          <ChartHolder className="w-4/5 xl:w-2/5">
            <p className="font-bold text-xl text-accent tracking-widest">
              {majorTitles[2]}
            </p>
            <Charts
              type="pie"
              data={
                [
                  "least_loss_mc_hr",
                  "max_actual_prod_time",
                  "max_loss_mc_hr",
                  "max_lossqty",
                ].includes(majorKeys[2])
                  ? majors[2][majorKeys[2]].map((e) =>
                      Number(e[Object.keys(e)[0]])
                    )
                  : majors[2][majorKeys[2]].map((e) =>
                      Number(e[Object.keys(e)[1]])
                    )
              }
              xTitle="Partname"
              yTitle="Quantity"
              categories={majors[2][majorKeys[2]].map((e) => e.partname)}
            />
            <p>
              Part{" "}
              <span className="font-bold">
                {majors[2][majorKeys[2]][0].partname}
              </span>{" "}
              has maximum production per hour with{" "}
              <span className="font-bold">
                {majors[2][majorKeys[2]][0].prod_per_hr} Units
              </span>{" "}
              produced among{" "}
              <span className="font-bold">{totalPartsProduced} Parts</span>{" "}
              Produced
            </p>
          </ChartHolder>
          <ChartHolder className="w-4/5 xl:w-2/5">
            <p className="font-bold text-xl text-accent tracking-widest">
              {majorTitles[3]}
            </p>
            <Charts
              type="bar"
              data={
                [
                  "least_loss_mc_hr",
                  "max_actual_prod_time",
                  "max_loss_mc_hr",
                  "max_lossqty",
                ].includes(majorKeys[3])
                  ? majors[3][majorKeys[3]].map((e) =>
                      Number(e[Object.keys(e)[0]])
                    )
                  : majors[3][majorKeys[3]].map((e) =>
                      Number(e[Object.keys(e)[1]])
                    )
              }
              xTitle="Partname"
              yTitle="Quantity"
              categories={majors[3][majorKeys[3]].map((e) => e.partname)}
            />
            <p>
              Part{" "}
              <span className="font-bold">
                {majors[3][majorKeys[3]][0].partname}
              </span>{" "}
              has least production per hour with{" "}
              <span className="font-bold">
                {majors[3][majorKeys[3]][0].prod_per_hr} Units
              </span>{" "}
              produced among{" "}
              <span className="font-bold">{totalPartsProduced} Parts</span>{" "}
              Produced
            </p>
          </ChartHolder>
          <ChartHolder className="w-4/5 xl:w-2/5">
            <p className="font-bold text-xl text-accent tracking-widest">
              {majorTitles[4]}
            </p>
            <Charts
              type="pie"
              data={
                [
                  "least_loss_mc_hr",
                  "max_actual_prod_time",
                  "max_loss_mc_hr",
                  "max_lossqty",
                ].includes(majorKeys[4])
                  ? majors[4][majorKeys[4]].map((e) =>
                      Number(e[Object.keys(e)[0]])
                    )
                  : majors[4][majorKeys[4]].map((e) =>
                      Number(e[Object.keys(e)[1]])
                    )
              }
              xTitle="Partname"
              yTitle="Quantity"
              categories={majors[4][majorKeys[4]].map((e) => e.partname)}
            />
            <p>
              Part{" "}
              <span className="font-bold">
                {majors[4][majorKeys[4]][0].partname}
              </span>{" "}
              has maximum machine hours lost with{" "}
              <span className="font-bold">
                {majors[4][majorKeys[4]][0].loss_mc_hr} Hours
              </span>{" "}
              lost among{" "}
              <span className="font-bold">{totalPartsProduced} Parts</span>{" "}
              Produced
            </p>
          </ChartHolder>
          <ChartHolder className="w-4/5 xl:w-2/5">
            <p className="font-bold text-xl text-accent tracking-widest">
              {majorTitles[5]}
            </p>
            <Charts
              type="bar"
              data={
                [
                  "least_loss_mc_hr",
                  "max_actual_prod_time",
                  "max_loss_mc_hr",
                  "max_lossqty",
                ].includes(majorKeys[5])
                  ? majors[5][majorKeys[5]].map((e) =>
                      Number(e[Object.keys(e)[0]])
                    )
                  : majors[5][majorKeys[5]].map((e) =>
                      Number(e[Object.keys(e)[1]])
                    )
              }
              xTitle="Partname"
              yTitle="Quantity"
              categories={majors[5][majorKeys[5]].map((e) => e.partname)}
            />
            <p>
              Part{" "}
              <span className="font-bold">
                {majors[5][majorKeys[5]][0].partname}
              </span>{" "}
              has maximum machine hours lost with{" "}
              <span className="font-bold">
                {majors[5][majorKeys[5]][0].loss_mc_hr} Hours
              </span>{" "}
              lost among{" "}
              <span className="font-bold">{totalPartsProduced} Parts</span>{" "}
              Produced
            </p>
          </ChartHolder>
          <ChartHolder className="w-4/5 xl:w-2/5">
            <p className="font-bold text-xl text-accent tracking-widest">
              {majorTitles[6]}
            </p>
            <Charts
              type="pie"
              data={
                [
                  "least_loss_mc_hr",
                  "max_actual_prod_time",
                  "max_loss_mc_hr",
                  "max_lossqty",
                ].includes(majorKeys[6])
                  ? majors[6][majorKeys[6]].map((e) =>
                      Number(e[Object.keys(e)[0]])
                    )
                  : majors[6][majorKeys[6]].map((e) =>
                      Number(e[Object.keys(e)[1]])
                    )
              }
              xTitle="Partname"
              yTitle="Quantity"
              categories={majors[6][majorKeys[6]].map((e) => e.partname)}
            />
            <p>
              Part{" "}
              <span className="font-bold">
                {majors[6][majorKeys[6]][0].partname}
              </span>{" "}
              has maximum quantity required with{" "}
              <span className="font-bold">
                {majors[6][majorKeys[6]][0].qty_req} units
              </span>{" "}
              required among{" "}
              <span className="font-bold">{totalPartsProduced} Parts</span>{" "}
              Produced
            </p>
          </ChartHolder>
          <ChartHolder className="w-4/5 xl:w-2/5">
            <p className="font-bold text-xl text-accent tracking-widest">
              {majorTitles[7]}
            </p>
            <Charts
              type="bar"
              data={
                [
                  "least_loss_mc_hr",
                  "max_actual_prod_time",
                  "max_loss_mc_hr",
                  "max_lossqty",
                ].includes(majorKeys[7])
                  ? majors[7][majorKeys[7]].map((e) =>
                      Number(e[Object.keys(e)[0]])
                    )
                  : majors[7][majorKeys[7]].map((e) =>
                      Number(e[Object.keys(e)[1]])
                    )
              }
              xTitle="Partname"
              yTitle="Quantity"
              categories={majors[7][majorKeys[7]].map((e) => e.partname)}
            />
            <p>
              Part{" "}
              <span className="font-bold">
                {majors[7][majorKeys[7]][0].partname}
              </span>{" "}
              has maximum quantity achieved with{" "}
              <span className="font-bold">
                {majors[7][majorKeys[7]][0].qty_achieved} units
              </span>{" "}
              achieved among{" "}
              <span className="font-bold">{totalPartsProduced} Parts</span>{" "}
              Produced
            </p>
          </ChartHolder>
        </div>
      </>

      {/* </div> */}
    </>
  );
};

export default MisProdVisuals;
