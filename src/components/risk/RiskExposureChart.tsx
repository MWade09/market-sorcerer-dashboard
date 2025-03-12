
import React from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";

// Mock data for the chart
const data = [
  {
    name: "RSI Strategy",
    riskContribution: 25,
    valueAtRisk: 1200,
    currentExposure: 15000,
  },
  {
    name: "MA Crossover",
    riskContribution: 18,
    valueAtRisk: 850,
    currentExposure: 12000,
  },
  {
    name: "Bollinger",
    riskContribution: 22,
    valueAtRisk: 950,
    currentExposure: 9000,
  },
  {
    name: "DCA",
    riskContribution: 10,
    valueAtRisk: 350,
    currentExposure: 4000,
  },
  {
    name: "ML Strategy",
    riskContribution: 25,
    valueAtRisk: 1050,
    currentExposure: 8000,
  },
];

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 border rounded-md shadow-sm p-2 text-xs">
        <p className="font-medium">{label}</p>
        <p className="text-blue-500">
          Risk Contribution: {payload[0].value}%
        </p>
        <p className="text-green-500">
          Current Exposure: ${payload[1].value.toLocaleString()}
        </p>
        <p className="text-red-500">
          Value at Risk: ${payload[2].value.toLocaleString()}
        </p>
      </div>
    );
  }

  return null;
};

const RiskExposureChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" opacity={0.2} />
        <XAxis 
          dataKey="name" 
          fontSize={11} 
          tick={{ fill: '#6b7280' }}
          axisLine={{ stroke: '#374151', strokeWidth: 1 }}
        />
        <YAxis 
          yAxisId="left" 
          orientation="left" 
          stroke="#3b82f6" 
          fontSize={11}
          tick={{ fill: '#6b7280' }}
          axisLine={{ stroke: '#374151', strokeWidth: 1 }}
          label={{ 
            value: 'Risk Contribution (%)', 
            angle: -90, 
            position: 'insideLeft',
            fill: '#6b7280',
            fontSize: 11
          }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          stroke="#10b981"
          fontSize={11}
          tick={{ fill: '#6b7280' }}
          axisLine={{ stroke: '#374151', strokeWidth: 1 }}
          label={{ 
            value: 'Exposure ($)', 
            angle: -90, 
            position: 'insideRight',
            fill: '#6b7280',
            fontSize: 11
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar 
          yAxisId="left" 
          dataKey="riskContribution" 
          name="Risk Contribution (%)" 
          fill="#3b82f6"
          radius={[4, 4, 0, 0]}
        />
        <Bar 
          yAxisId="right" 
          dataKey="currentExposure" 
          name="Current Exposure ($)" 
          fill="#10b981"
          radius={[4, 4, 0, 0]}
        />
        <Bar 
          yAxisId="right" 
          dataKey="valueAtRisk" 
          name="Value at Risk ($)" 
          fill="#ef4444"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RiskExposureChart;
