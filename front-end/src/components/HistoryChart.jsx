import React, { useState, useEffect, useRef } from "react";
import {
  Thermometer,
  Droplets,
  CloudRain,
  Calendar,
  TrendingUp,
} from "lucide-react";
import Chart from "chart.js/auto";

const HistoryChart = () => {
  const [selectedMetric, setSelectedMetric] = useState("temperature");
  const [selectedPeriod, setSelectedPeriod] = useState(7);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Dummy weather data for the last 30 days
  const generateWeatherData = () => {
    const data = [];
    const today = new Date();

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      data.push({
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        temperature: Math.floor(Math.random() * 15) + 20, // 20-35°C
        humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
        precipitation: Math.floor(Math.random() * 25), // 0-25mm
      });
    }

    return data;
  };

  const weatherData = generateWeatherData();

  const getMetricConfig = (metric) => {
    switch (metric) {
      case "temperature":
        return {
          label: "Temperature (°C)",
          icon: <Thermometer className="w-5 h-5" />,
          color: "#6366F1",
          unit: "°C",
          gradient: "from-indigo-500 to-purple-600",
        };
      case "humidity":
        return {
          label: "Humidity (%)",
          icon: <Droplets className="w-5 h-5" />,
          color: "#3B82F6",
          unit: "%",
          gradient: "from-blue-500 to-cyan-600",
        };
      case "precipitation":
        return {
          label: "Precipitation (mm)",
          icon: <CloudRain className="w-5 h-5" />,
          color: "#10B981",
          unit: "mm",
          gradient: "from-emerald-500 to-teal-600",
        };
      default:
        return {
          label: "Temperature (°C)",
          icon: <Thermometer className="w-5 h-5" />,
          color: "#6366F1",
          unit: "°C",
          gradient: "from-indigo-500 to-purple-600",
        };
    }
  };

  const createChart = () => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    const config = getMetricConfig(selectedMetric);
    const filteredData = weatherData.slice(-selectedPeriod);

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, config.color + "40");
    gradient.addColorStop(1, config.color + "00");

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: filteredData.map((item) => item.date),
        datasets: [
          {
            label: config.label,
            data: filteredData.map((item) => item[selectedMetric]),
            borderColor: config.color,
            backgroundColor: gradient,
            borderWidth: 3,
            fill: true,
            tension: 0.3,
            pointBackgroundColor: config.color,
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: config.color,
            pointHoverBorderColor: "#ffffff",
            pointHoverBorderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "#e7e5e4",
            titleColor: "#374151",
            bodyColor: "#4b5563",
            borderColor: "#374151",
            borderWidth: 0.2,
            cornerRadius: 8,
            displayColors: false,
            callbacks: {
              label: function (context) {
                return `${context.parsed.y}${config.unit}`;
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
              drawBorder: false,
            },
            ticks: {
              color: "#4b5563",
              font: {
                size: 12,
              },
            },
          },
          y: {
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
              drawBorder: false,
            },
            ticks: {
              color: "#4b5563",
              font: {
                size: 12,
              },
              callback: function (value) {
                return value + config.unit;
              },
            },
          },
        },
        elements: {
          point: {
            hoverRadius: 8,
          },
        },
      },
    });
  };

  useEffect(() => {
    createChart();
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [selectedMetric, selectedPeriod]);

  const metrics = [
    {
      key: "temperature",
      label: "Temperature",
      icon: <Thermometer className="w-4 h-4" />,
    },
    {
      key: "humidity",
      label: "Humidity",
      icon: <Droplets className="w-4 h-4" />,
    },
    {
      key: "precipitation",
      label: "Precipitation",
      icon: <CloudRain className="w-4 h-4" />,
    },
  ];

  const periods = [
    { value: 7, label: "7 Days" },
    { value: 30, label: "30 Days" },
  ];

  const currentConfig = getMetricConfig(selectedMetric);

  return (
    <div className="w-full p-12 bg-[#E7E5E4] text-[#374151]">
      <div className="w-full bg-white rounded-3xl shadow-lg p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg bg-gradient-to-r ${currentConfig.gradient}`}
            >
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold">
                Weather History
              </h2>
              <p className="text-sm text-[#6B7280]">
                Track weather patterns over time
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#e7e5e4] p-1 rounded-lg">
            <Calendar className="w-4 h-4 text-[#374151]" />
            {periods.map((period) => (
              <button
                key={period.value}
                onClick={() => setSelectedPeriod(period.value)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                  selectedPeriod === period.value
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        {/* Metric Toggles */}
        <div className="flex flex-wrap gap-2 mb-6">
          {metrics.map((metric) => (
            <button
              key={metric.key}
              onClick={() => setSelectedMetric(metric.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                selectedMetric === metric.key
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-gray-100  hover:bg-gray-200"
              }`}
            >
              {metric.icon}
              {metric.label}
            </button>
          ))}
        </div>

        {/* Chart Container */}
        <div className="relative h-80 sm:h-96 md:h-[400px] bg-[#f2f2f19b] rounded-lg p-4">
          <canvas ref={chartRef} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold">25°</div>
            <div className="text-sm text-gray-500">Average</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">29°</div>
            <div className="text-sm text-gray-500">Maximum</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">24°</div>
            <div className="text-sm text-gray-500">Maximum</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryChart;
