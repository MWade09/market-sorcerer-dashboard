
import React from "react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip
} from "recharts";

// Mock data for the radar chart
const data = [
  {
    metric: "Volatility",
    "RSI Strategy": 65,
    "MA Crossover": 50,
    "Bollinger": 90,
    "ML Strategy": 70,
    "DCA": 20,
  },
  {
    metric: "Sharpe",
    "RSI Strategy": 45,
    "MA Crossover": 70,
    "Bollinger": 35,
    "ML Strategy": 60,
    "DCA": 80,
  },
  {
    metric: "Max Drawdown",
    "RSI Strategy": 55,
    "MA Crossover": 65,
    "Bollinger": 85,
    "ML Strategy": 40,
    "DCA": 30,
  },
  {
    metric: "Beta",
    "RSI Strategy": 75,
    "MA Crossover": 60,
    "Bollinger": 45,
    "ML Strategy": 80,
    "DCA": 20,
  },
  {
    metric: "VaR",
    "RSI Strategy": 60,
    "MA Crossover": 40,
    "Bollinger": 75,
    "ML Strategy": 55,
    "DCA": 25,
  },
];

// Custom tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 border rounded-md shadow-sm p-2 text-xs">
        <p className="font-medium">{payload[0].payload.metric}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const RiskMetricsDisplay: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid stroke="#374151" />
        <PolarAngleAxis 
          dataKey="metric" 
          tick={{ fill: '#6b7280', fontSize: 11 }}
        />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#6b7280', fontSize: 10 }} />
        <Radar
          name="RSI Strategy"
          dataKey="RSI Strategy"
          stroke="#3b82f6"
          fill="#3b82f6"
          fillOpacity={0.2}
        />
        <Radar
          name="MA Crossover"
          dataKey="MA Crossover"
          stroke="#10b981"
          fill="#10b981"
          fillOpacity={0.2}
        />
        <Radar
          name="Bollinger"
          dataKey="Bollinger"
          stroke="#ef4444"
          fill="#ef4444"
          fillOpacity={0.2}
        />
        <Radar
          name="ML Strategy"
          dataKey="ML Strategy"
          stroke="#8b5cf6"
          fill="#8b5cf6"
          fillOpacity={0.2}
        />
        <Radar
          name="DCA"
          dataKey="DCA"
          stroke="#f59e0b"
          fill="#f59e0b"
          fillOpacity={0.2}
        />
        <Legend />
        <Tooltip content={<CustomTooltip />} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default RiskMetricsDisplay;
