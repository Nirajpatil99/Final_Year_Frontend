import test from "../test.json";
import dynamic from "next/dynamic";
import ChartHolder from "../components/ChartHolder";
import Charts from "../components/GetCharts";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const colors = ["#b71c1c", "#33691e", "#1a237e", "#3e2723"];

const getRandamColor = () => {
  return colors[Math.floor(Math.random() * (3 - 0 + 1) + 0)];
};

const MachineShopVisuals = ({ data }) => {
  // const data = test["FC - Machine Shop"];

  const CNCMachines = data["CNC Machines"];
  const CNCMachinesKeys = Object.keys(CNCMachines[0]);

  const ConventionalMachines = data["Conventional Machines"];
  const ConventionalMachinesKeys = Object.keys(ConventionalMachines[0]);

  const Months = data["months"];

  const monthSize = Months.length;

  // console.log(CNCMachines);

  let CNCTotalOperableHours = 0;
  CNCMachines.every((e) => (CNCTotalOperableHours += e[CNCMachinesKeys[0]][3]));

  let CNCTotalChangeoverTime = 0;
  CNCMachines.every(
    (e) => (CNCTotalChangeoverTime += e[CNCMachinesKeys[3]][0])
  );

  let CNCTotalBreakdown = 0;
  CNCMachines.every((e) => (CNCTotalBreakdown += e[CNCMachinesKeys[1]][3]));

  let CNCTotalProductiveHours = 0;
  CNCMachines.every(
    (e) =>
      (CNCTotalProductiveHours +=
        e[CNCMachinesKeys[0]][3] -
        (e[CNCMachinesKeys[1]][3] + e[CNCMachinesKeys[3]][3]))
  );

  let ConventionalTotalOperableHours = 0;
  ConventionalMachines.every(
    (e) => (ConventionalTotalOperableHours += e[ConventionalMachinesKeys[0]][3])
  );

  let ConventionalTotalChangeoverTime = 0;
  ConventionalMachines.every(
    (e) =>
      (ConventionalTotalChangeoverTime += e[ConventionalMachinesKeys[3]][0])
  );

  let ConventionalTotalBreakdown = 0;
  ConventionalMachines.every(
    (e) => (ConventionalTotalBreakdown += e[ConventionalMachinesKeys[1]][3])
  );

  let ConventionalTotalProductiveHours = 0;
  ConventionalMachines.every(
    (e) =>
      (ConventionalTotalProductiveHours +=
        e[ConventionalMachinesKeys[0]][3] -
        (e[ConventionalMachinesKeys[1]][3] + e[ConventionalMachinesKeys[3]][3]))
  );

  // let CNCTotalChangeoverTimeByMonth = CNCMachines.map(
  //   (e) => e[CNCMachinesKeys[3]][3]
  // );

  // let CNCTotalBreakdownByMonth = CNCMachines.map(
  //   (e) => e[CNCMachinesKeys[1]][3]
  // );

  // let CNCTotalProductiveHoursByMonth = CNCMachines.map(
  //   (e) =>
  //     e[CNCMachinesKeys[0]][3] -
  //     (e[CNCMachinesKeys[1]][3] + e[CNCMachinesKeys[3]][3])
  // );

  // console.log({
  // CNCTotalChangeoverTimeByMonth,
  // CNCTotalBreakdownByMonth,
  // CNCTotalProductiveHoursByMonth,
  // });

  //   const state = {
  //     series:,
  //   };
  return (
    <>
      <span className="text-accent text-center tracking-widest font-bold text-2xl">
        Machine Shop - CNC Machine
      </span>

      <div className="flex flex-row flex-wrap justify-center">
        <ChartHolder>
          <p className="text-2xl font-bold">Total Operable Hours</p>
          <p>
            {Months[0]} To {Months[monthSize - 1]}
          </p>
          <p className="mt-3 text-4xl text-green">
            {CNCTotalOperableHours.toFixed(1)}
          </p>
          <p className="mt-3">Hours</p>
        </ChartHolder>
        <ChartHolder>
          <p className="text-2xl font-bold">Total ChangeOver Time</p>
          <p>
            {Months[0]} To {Months[monthSize - 1]}
          </p>
          <p className="mt-3 text-4xl text-red">
            {CNCTotalChangeoverTime.toFixed(1)}
          </p>
          <p className="mt-3">Hours</p>
        </ChartHolder>
        <ChartHolder>
          <p className="text-2xl font-bold ">Total Breakdown Time</p>
          <p>
            {Months[0]} To {Months[monthSize - 1]}
          </p>
          <p className="mt-3">
            <span className="text-4xl text-red">
              {CNCTotalBreakdown.toFixed(1)}
            </span>
          </p>
          <p className="mt-3">Hours</p>
        </ChartHolder>
        <ChartHolder>
          <p className="text-2xl font-bold">Total Productive Hours</p>
          <p>
            {Months[0]} To {Months[monthSize - 1]}
          </p>
          <p className="mt-3 text-4xl text-green">
            {CNCTotalProductiveHours.toFixed(1)}
          </p>
          <p className="mt-3">Hours</p>
        </ChartHolder>
      </div>

      <ChartHolder>
        <Charts
          type="bar"
          stacked={true}
          convert={false}
          data={[
            {
              name: "Total Productive Hours",
              data: CNCMachines.map(
                (e) =>
                  e[CNCMachinesKeys[0]][3] -
                  (e[CNCMachinesKeys[1]][3] + e[CNCMachinesKeys[3]][3])
              ),
            },
            {
              name: "Total Breakdown Hours",
              data: CNCMachines.map((e) => e[CNCMachinesKeys[1]][3]),
            },
            {
              name: "Total Changeover Hours",
              data: CNCMachines.map((e) => e[CNCMachinesKeys[3]][3]),
            },
          ]}
          categories={Months}
          xTitle="Months"
          yTitle="Hours"
        />
      </ChartHolder>

      <span className="text-accent text-center tracking-widest font-bold text-2xl">
        Machine Shop - Conventional
      </span>

      <div className="flex flex-row flex-wrap justify-center">
        <ChartHolder>
          <p className="text-2xl font-bold">Total Operable Hours</p>
          <p>
            {Months[0]} To {Months[monthSize - 1]}
          </p>
          <p className="mt-3 text-4xl text-green">
            {ConventionalTotalOperableHours.toFixed(1)}
          </p>
          <p className="mt-3">Hours</p>
        </ChartHolder>
        <ChartHolder>
          <p className="text-2xl font-bold">Total ChangeOver Time</p>
          <p>
            {Months[0]} To {Months[monthSize - 1]}
          </p>
          <p className="mt-3 text-4xl text-red">
            {ConventionalTotalChangeoverTime.toFixed(1)}
          </p>
          <p className="mt-3">Hours</p>
        </ChartHolder>
        <ChartHolder>
          <p className="text-2xl font-bold ">Total Breakdown Time</p>
          <p>
            {Months[0]} To {Months[monthSize - 1]}
          </p>
          <p className="mt-3">
            <span className="text-4xl text-red">
              {ConventionalTotalBreakdown.toFixed(1)}
            </span>
          </p>
          <p className="mt-3">Hours</p>
        </ChartHolder>
        <ChartHolder>
          <p className="text-2xl font-bold">Total Productive Hours</p>
          <p>
            {Months[0]} To {Months[monthSize - 1]}
          </p>
          <p className="mt-3 text-4xl text-green">
            {CNCTotalProductiveHours.toFixed(1)}
          </p>
          <p className="mt-3">Hours</p>
        </ChartHolder>
      </div>

      <ChartHolder>
        <Charts
          type="bar"
          stacked={true}
          convert={false}
          data={[
            {
              name: "Total Productive Hours",
              data: ConventionalMachines.map(
                (e) =>
                  e[ConventionalMachinesKeys[0]][3] -
                  (e[ConventionalMachinesKeys[1]][3] +
                    e[ConventionalMachinesKeys[3]][3])
              ),
            },
            {
              name: "Total Breakdown Hours",
              data: ConventionalMachines.map(
                (e) => e[ConventionalMachinesKeys[1]][3]
              ),
            },
            {
              name: "Total Changeover Hours",
              data: ConventionalMachines.map(
                (e) => e[ConventionalMachinesKeys[3]][3]
              ),
            },
          ]}
          categories={Months}
          xTitle="Months"
          yTitle="Hours"
        />
      </ChartHolder>

      {/* <div className="flex flex-row flex-wrap justify-center text-center">
        {CNCMachinesKeys.map((key, idx) => {
          return (
            <ChartHolder className="w-4/5 xl:w-2/5">
              <p className="font-bold text-xl text-accent tracking-widest">
                {key}
              </p>
              <ApexCharts
                options={{
                  grid: {
                    padding: {
                      top: 30,
                      right: 30,
                      bottom: 30,
                      left: 30,
                    },
                  },
                  chart: {
                    toolbar: {
                      show: false,
                    },
                  },
                  xaxis: {
                    categories: Months,
                    labels: {
                      style: {
                        fontSize: "13px",
                        fontWeight: 700,
                      },
                      // formatter: function (val) {
                      //   return val.toFixed(2);
                      // },
                    },
                  },
                  dataLabels: {
                    enabled: true,
                    style: {
                      fontSize: "13px",
                      fontWeight: 700,
                    },
                    formatter: function (val) {
                      return val.toFixed(2);
                    },
                  },
                  yaxis: {
                    width: "24px",
                    maxWidth: "48px",
                    labels: {
                      style: {
                        fontSize: "13px",
                        fontWeight: 700,
                      },
                      formatter: function (val) {
                        return val.toFixed(2);
                      },
                    },
                  },
                  colors: [getRandamColor()],
                }}
                series={[
                  {
                    data: CNCMachines.map((e) => e[key][3]),
                  },
                ]}
                type="line"
                //   key={idx}
                width={450}
                height={400}
              />
            </ChartHolder>
          );
        })}
        {ConventionalMachinesKeys.map((key, idx) => {
          return (
            <ChartHolder className="w-4/5 xl:w-2/5" key={idx}>
              <p className="font-bold text-xl text-accent tracking-widest">
                {key}
              </p>
              <ApexCharts
                key={idx}
                options={{
                  grid: {
                    padding: {
                      top: 30,
                      right: 30,
                      bottom: 30,
                      left: 30,
                    },
                  },
                  chart: {
                    toolbar: {
                      show: false,
                    },
                  },
                  xaxis: {
                    categories: Months,
                    labels: {
                      style: {
                        fontSize: "13px",
                        fontWeight: 700,
                      },
                      // formatter: function (val) {
                      //   return val.toFixed(2);
                      // },
                    },
                  },
                  dataLabels: {
                    enabled: true,
                    style: {
                      fontSize: "13px",
                      fontWeight: 700,
                    },
                    formatter: function (val) {
                      return val.toFixed(2);
                    },
                  },
                  yaxis: {
                    width: "24px",
                    maxWidth: "48px",
                    labels: {
                      style: {
                        fontSize: "13px",
                        fontWeight: 700,
                      },
                      formatter: function (val) {
                        return val.toFixed(2);
                      },
                    },
                  },
                  colors: [getRandamColor()],
                }}
                series={[
                  {
                    data: ConventionalMachines.map((e) => e[key][3]),
                  },
                ]}
                type="line"
                //   key={idx}
                // width={"40%"}
                // height={"30%"}
              />
            </ChartHolder>
          );
        })}
      </div> */}
    </>
  );
};

export default MachineShopVisuals;
