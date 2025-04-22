import React, { useEffect, useState } from 'react';
import API from '../services/api';
import StatForm from '../components/StatForm';
import ChartComponent from '../components/ChartComponent';


const DashboardPage = () => {
  const [stats, setStats] = useState([]);

  const fetchStats = async () => {
    const res = await API.get('/stats');
    setStats(res.data);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <StatForm onCreate={fetchStats} />
      <ChartComponent stats={stats} />
    </div>
  );
};

export default DashboardPage;
