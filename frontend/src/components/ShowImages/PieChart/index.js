import { PieChart } from "@mui/x-charts/PieChart";

export default function BasicPie({ datavalues }) {
  if (!datavalues || datavalues.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <PieChart
      series={[
        {
          data: datavalues,
          arcLabel: (item) => `${item.value}`,
          arcLabelMinAngle: 5,
          arcLabelStyle: {
            fontSize: 18,
            fontWeight: 700,
            fill: "#ffffff"
          }
        }
      ]}
      width={250}
      height={250}
      slotProps={{
        legend: {
          sx: {
            color: "#ffffff",
            fontSize: "14px",
          }
        }
      }}
    />
  );
}
