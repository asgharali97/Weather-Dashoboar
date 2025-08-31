import React, { useState, useEffect, useRef } from "react";
import { Thermometer, Droplets, TrendingUp, Wind } from "lucide-react";
import Chart from "chart.js/auto";
import { useWeatherContext } from "../context/WeatherContext.jsx";
import { useHistoryWeather } from "../hooks/reactQueryHooks.jsx";

const SkeletonLoader = () => {
  return (
    <div className="w-full p-12 bg-[#E7E5E4] text-[#374151]">
      <div className="w-full bg-white rounded-3xl shadow-lg p-6 sm:p-8">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            <div>
              <div className="h-6 bg-gray-200 rounded animate-pulse mb-2 w-40"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-48"></div>
            </div>
          </div>
        </div>

        {/* Metric Toggles Skeleton */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-10 bg-gray-200 rounded-lg animate-pulse w-28"
            ></div>
          ))}
        </div>

        {/* Chart Skeleton */}
        <div className="relative h-80 sm:h-96 md:h-[400px] bg-[#f2f2f19b] rounded-lg p-4">
          <div className="w-full h-full bg-gray-200 rounded animate-pulse flex items-center justify-center">
            <div className="text-gray-400">Loading chart...</div>
          </div>
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center">
              <div className="h-8 bg-gray-200 rounded animate-pulse mb-2 mx-auto w-12"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse mx-auto w-16"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const HistoryChart = () => {
  const [selectedMetric, setSelectedMetric] = useState("temperature");
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const { selectedCity } = useWeatherContext();
  const { data, isLoading, isError } = useHistoryWeather(selectedCity);

  // All hooks must be called before any early returns
  useEffect(() => {
    // Only create chart if data is available and not loading
    if (!isLoading && data && data.length > 0) {
      createChart();
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [selectedMetric, data, isLoading]);

  const getMetricConfig = (metric) => {
    switch (metric) {
      case "temperature":
        return {
          label: "Temperature (°C)",
          icon: <Thermometer className="w-5 h-5" />,
          color: "#6366f1",
          unit: "°C",
          gradient: "from-indigo-500 to-purple-600",
        };
      case "humidity":
        return {
          label: "Humidity (%)",
          icon: <Droplets className="w-5 h-5" />,
          color: "#63cbf1",
          unit: "%",
          gradient: "from-blue-500 to-cyan-600",
        };
      case "wind": // Fixed case to match button key
        return {
          label: "Wind (km/h)",
          icon: <Wind className="w-5 h-5" />,
          color: "#1059b9",
          unit: "km/h",
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
    if (!chartRef.current || !data || data.length === 0) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    const config = getMetricConfig(selectedMetric);

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, config.color + "40");
    gradient.addColorStop(1, config.color + "00");

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: data?.map((item) =>
          new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
          }).format(new Date(item.date))
        ),
        datasets: [
          {
            label: config.label,
            data: data?.map((item) => item[selectedMetric]),
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
      key: "wind",
      label: "Wind",
      icon: <Wind className="w-4 h-4" />,
    },
  ];

  const currentConfig = getMetricConfig(selectedMetric);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (isError) {
    return (
      <div className="w-full p-12 bg-[#E7E5E4] text-[#374151]">
        <div className="w-full bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center">
          <div className="text-[#bf1a1a] text-lg">
            Error loading weather history data
          </div>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full p-12 bg-[#E7E5E4] text-[#374151]">
        <div className="w-full bg-white rounded-3xl shadow-lg p-6 sm:p-8 text-center">
          <div className="text-lg">No weather history data available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-12 bg-[#E7E5E4] text-[#374151]">
      <div className="w-full bg-white rounded-3xl shadow-lg p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#6366f1]">
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
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {metrics.map((metric) => (
            <button
              key={metric.key}
              onClick={() => setSelectedMetric(metric.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                selectedMetric === metric.key
                  ? "bg-[#6366f1] text-white shadow-md"
                  : "bg-gray-100  hover:bg-gray-200"
              }`}
            >
              {metric.icon}
              {metric.label}
            </button>
          ))}
        </div>
        <div className="relative h-80 sm:h-96 md:h-[400px] bg-[#f2f2f19b] rounded-lg p-4">
          <canvas ref={chartRef} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold">
              {(
                data.reduce((acc, item) => acc + item[selectedMetric], 0) /
                data.length
              ).toFixed(1)}
              {selectedMetric === "temperature"
                ? "°"
                : selectedMetric === "wind"
                ? " km/h"
                : selectedMetric === "humidity"
                ? "%" 
                : ""}
            </div>
            <div className="text-sm text-gray-500">Average</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">
              {Math.max(...data.map((item) => item[selectedMetric]))}
              {selectedMetric === "temperature"
                ? "°"
                : selectedMetric === "wind"
                ? " km/h"
                : selectedMetric === "humidity"
                ? "%"
                : ""}
            </div>
            <div className="text-sm text-gray-500">Maximum</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">
              {data.length > 1 ? Math.min(...data.slice(0, -1).map((item) => item[selectedMetric])) : data[0][selectedMetric]}
                {selectedMetric === "temperature"
                ? "°"
                : selectedMetric === "wind"
                ? " km/h"
                : selectedMetric === "humidity"
                ? "%"
                : ""}
              </div>
            <div className="text-sm text-gray-500">Minimum</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryChart;
