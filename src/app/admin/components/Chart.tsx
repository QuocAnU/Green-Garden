'use client';

import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Select } from "antd";

const { Option } = Select;

// Define the structure of the data for each year
type DataItem = { name: string; uv: number };

// Define the structure of the entire data object
type Data = {
  [year: number]: DataItem[];
};

// Your data object
const data: Data = {
  2023: [
    { name: "Jan", uv: 4000 },
    { name: "Feb", uv: 3000 },
    { name: "Mar", uv: 2000 },
    { name: "Apr", uv: 2780 },
    { name: "May", uv: 1890 },
    { name: "Jun", uv: 2390 },
    { name: "Jul", uv: 3490 },
    { name: "Aug", uv: 2000 },
    { name: "Sep", uv: 2180 },
    { name: "Oct", uv: 2500 },
    { name: "Nov", uv: 3000 },
    { name: "Dec", uv: 4000 },
  ],
  2022: [
    { name: "Jan", uv: 5000 },
    { name: "Feb", uv: 4200 },
    { name: "Mar", uv: 3800 },
    { name: "Apr", uv: 3300 },
    { name: "May", uv: 2800 },
    { name: "Jun", uv: 3500 },
    { name: "Jul", uv: 4000 },
    { name: "Aug", uv: 3600 },
    { name: "Sep", uv: 3300 },
    { name: "Oct", uv: 4000 },
    { name: "Nov", uv: 4600 },
    { name: "Dec", uv: 5000 },
  ],
  2021: [
    { name: "Jan", uv: 4200 },
    { name: "Feb", uv: 3200 },
    { name: "Mar", uv: 2700 },
    { name: "Apr", uv: 3100 },
    { name: "May", uv: 2200 },
    { name: "Jun", uv: 2900 },
    { name: "Jul", uv: 3600 },
    { name: "Aug", uv: 3000 },
    { name: "Sep", uv: 3200 },
    { name: "Oct", uv: 3700 },
    { name: "Nov", uv: 4500 },
    { name: "Dec", uv: 4800 },
  ],
};

export default function Chart() {
  const [selectedYear, setSelectedYear] = useState<number>(2023); // Default year is 2023

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  return (
    <div>
      {/* Year Selector */}
      <div className="mb-4">
        <Select value={selectedYear} onChange={handleYearChange} style={{ width: 120 }}>
          <Option value={2023}>2023</Option>
          <Option value={2022}>2022</Option>
          <Option value={2021}>2021</Option>
        </Select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data[selectedYear]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
