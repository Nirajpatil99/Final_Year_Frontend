import dynamic from "next/dynamic";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const colors = ["#b71c1c", "#33691e", "#1a237e", "#3e2723"];

const getRandamColor = () => {
  return colors[Math.floor(Math.random() * (3 - 0 + 1) + 0)];
};

const Charts = ({
  type = "line",
  data = [],
  xTitle = "",
  yTitle = "",
  categories = [],
  convert = true,
  stacked = false,
}) => {
  // console.log(data);
  if (type === "line") {
    // console.log(data);
    const options = {
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
        categories: categories,
        labels: {
          style: {
            fontSize: "13px",
            fontWeight: 700,
          },
        },
        title: {
          text: xTitle,
          position: "bottom",
          style: {
            fontSize: "14px",
            // fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 600,
            // cssClass: "apexcharts-xaxis-title",
          },
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "13px",
          fontWeight: 700,
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
        },
        title: {
          text: yTitle,
          offsetY: 0,
          style: {
            fontSize: "14px",
            // fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 600,
            // cssClass: "apexcharts-xaxis-title",
          },
        },
      },
      colors: [getRandamColor()],
    };

    const series = [{ name: yTitle, data }];

    let isSame = true;
    series[0].data.every((e) => (isSame = series[0].data[0] == e));

    return isSame ? (
      <></>
    ) : (
      <ApexCharts options={options} series={series} type={type} />
    );
  }

  if (type === "pie") {
    // console.log(categories);
    const options = {
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
      labels: categories,
      xaxis: {
        labels: {
          style: {
            fontSize: "13px",
            fontWeight: 700,
          },
        },
        title: {
          text: xTitle,
          position: "bottom",
          style: {
            fontSize: "14px",
            // fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 600,
            // cssClass: "apexcharts-xaxis-title",
          },
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "13px",
          fontWeight: 700,
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
        },
        title: {
          text: yTitle,
          offsetY: 0,
          style: {
            fontSize: "14px",
            // fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 600,
            // cssClass: "apexcharts-xaxis-title",
          },
        },
      },
      //   colors: [getRandamColor()],
    };

    const series = data;

    return <ApexCharts options={options} series={data} type={type} />;
  }

  if (type === "donut") {
    // console.log(categories);
    const options = {
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
      labels: categories,
      xaxis: {
        labels: {
          style: {
            fontSize: "13px",
            fontWeight: 700,
          },
        },
        title: {
          text: xTitle,
          position: "bottom",
          style: {
            fontSize: "14px",
            // fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 600,
            // cssClass: "apexcharts-xaxis-title",
          },
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "13px",
          fontWeight: 700,
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
        },
        title: {
          text: yTitle,
          offsetY: 0,
          style: {
            fontSize: "14px",
            // fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 600,
            // cssClass: "apexcharts-xaxis-title",
          },
        },
      },
      //   colors: [getRandamColor()],
    };

    const series = data;

    return <ApexCharts options={options} series={data} type={type} />;
  }

  if (type === "bar") {
    const options = {
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            enabled: false,
            total: {
              enabled: true,
              style: {
                fontSize: "13px",
                fontWeight: 900,
              },
            },
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
          return val.toFixed(1);
        },
        style: {
          colors: ["#333"],
        },
      },

      chart: {
        stacked,
        toolbar: {
          show: false,
        },
        type: "bar",
      },
      xaxis: {
        categories: categories,
        title: {
          text: xTitle,
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
          text: yTitle,
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
            return val.toFixed(1);
          },
          style: {
            fontSize: "13px",
            fontWeight: 700,
          },
        },
      },
      legend: { position: "top" },
    };

    const series = convert ? [{ name: yTitle, data }] : data;

    // console.log(series);
    // console.log();

    return (
      <ApexCharts options={options} series={series} type="bar" height={400} />
    );
  }

  return <div></div>;
};

export default Charts;
