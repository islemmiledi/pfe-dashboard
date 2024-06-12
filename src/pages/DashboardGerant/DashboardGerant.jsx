import React from "react";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

const DashboardGerant = () => {
  const lineData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Abonnements",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const doughnutData = {
    labels: ["Active", "Inactive", "Pending"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
        hoverBackgroundColor: ["#388e3c", "#f57c00", "#d32f2f"],
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-semibold text-gray-900 mb-8">
          Tableau de Bord
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-sm font-medium text-gray-500">
              Total Utilisateurs
            </h3>
            <div className="mt-4 text-3xl font-semibold text-gray-900">
              1,200
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-sm font-medium text-gray-500">
              Nouveaux Abonnements
            </h3>
            <div className="mt-4 text-3xl font-semibold text-gray-900">345</div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-sm font-medium text-gray-500">Revenus</h3>
            <div className="mt-4 text-3xl font-semibold text-gray-900">
              $24,300
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-sm font-medium text-gray-500">Feedbacks</h3>
            <div className="mt-4 text-3xl font-semibold text-gray-900">87</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl leading-none font-semibold text-gray-900 mb-6">
              Statistiques Mensuelles
            </h3>
            <Line data={lineData} options={options} />
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl leading-none font-semibold text-gray-900 mb-6">
              Statut des Utilisateurs
            </h3>
            <Doughnut data={doughnutData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardGerant;
