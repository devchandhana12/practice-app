import axios from "axios";
import React from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { AuthContext } from "../../contexts/AuthContext";
const Graph = () => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      await axios
        .get("https://api.coincap.io/v2/assets/?limit=10")
        .then((res) => setData(res.data.data))
        .catch((err) => console.log(err));
    })();
    console.log(AuthContext);
  }, []);
  console.log(data);
  return (
    <div>
      <ResponsiveContainer
        style={{ backgroundColor: "black", marginTop: 50 }}
        width={"70%"}
        height={500}
      >
        <BarChart data={data}>
          {/* <CartesianGrid strokeDasharray={"2 3"} /> */}
          <XAxis dataKey={"name"} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={"priceUsd"} fill="purple" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default Graph;
