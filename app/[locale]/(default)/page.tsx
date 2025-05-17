'use client';

import { Button } from "@atoms/Button";
import { Card } from "@atoms/Card";
import { Icon } from "@atoms/Icon";
import { Text } from "@atoms/Text";
import { Title } from "@atoms/Title";
import { useTheme } from "@contexts/themeContext";
import { AreaChart } from "@mantine/charts";
import { KeyboardArrowDown, TrendingDown, TrendingUp } from "@mui/icons-material";
import { useT } from "../../i18n/useT";
import { useEffect, useState } from "react";
import DashboardAPI from "@hooks/dashboard/dashboard";

export default function Dashboard() {
  const { isDark } = useTheme();
  const { t } = useT('dashboard');

  const [data, setData] = useState([]);
  const [stats, setStats] = useState([]);

  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingChart, setLoadingChart] = useState(true);

  const [month, setMonth] = useState(10);
  const year = new Date().getFullYear();

  const fetchData = async (month: number, year: number) => {
    setLoadingChart(true);

    try {
      const response = await DashboardAPI.vehicleEntries(month, year);
      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingChart(false);
    }
  };

  const fetchStats = async (month: number) => {
    setLoadingStats(true);

    try {
      const response = await DashboardAPI.stats(month, year);
      const rawStats = response.data;

      const formattedStats = [
        {
          title: t('total_vehicles'),
          value: rawStats.entries.value.toLocaleString(),
          percent: [`${rawStats.entries.percent[0]}%`, rawStats.entries.percent[1]],
          color: '#6226EF',
          icon: 'DirectionsCar',
        },
        {
          title: t('total_incidents'),
          value: rawStats.incidents.value.toLocaleString(),
          percent: [`${rawStats.incidents.percent[0]}%`, rawStats.incidents.percent[1]],
          color: '#FFA756',
          icon: 'Error',
        },
      ];

      setStats(formattedStats);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingStats(false);
    }
  };

  const statsa = [
    {
      title: t('total_vehicles'),
      value: '1,200',
      percent: ['8.5%', 'up'],
      color: '#6226EF',
      icon: 'DirectionsCar',
    },
    {
      title: t('total_incidents'),
      value: '200',
      percent: ['4.3%', 'down'],
      color: '#FFA756',
      icon: 'Error',
    },
  ];

  useEffect(() => {
    fetchData(month, year);
    fetchStats(month);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <Title size="3xl" isDark={isDark}>
        {t('dashboard')}
      </Title>

      <div className="grid grid-cols-4 gap-6">
        {loadingStats
          ? Array(2).fill(0).map((_, index) => (
            <Card key={index} isDark={isDark}>
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-300 rounded w-3/4" />
                <div className="h-6 bg-gray-400 rounded w-1/2" />
              </div>
            </Card>
          ))
          : stats.map((stat, index) => (
            <Card key={index} isDark={isDark}>
              <div className="flex justify-between items-center">
                <div>
                  <Text size="medium" isDark={isDark}>{stat.title}</Text>
                  <Title size="2xl" isDark={isDark}>{stat.value}</Title>
                </div>

                <Icon isDark={isDark} color={stat.color} icon={stat.icon} />
              </div>

              <Title size="small" isDark={isDark}>
                <span className={stat.percent[1] === 'up' ? 'text-action-success' : 'text-action-error'}>
                  {stat.percent[1] === 'up'
                    ? <TrendingUp fontSize="small" />
                    : <TrendingDown fontSize="small" />
                  } {stat.percent[0]}
                </span> {t('from_last_month')}
              </Title>
            </Card>
          ))}
      </div>

      <Card isDark={isDark} space={6}>
        <div className="flex justify-between items-center">
          <Title size="largest" isDark={isDark}>
            {t('monthly_traffic')}
          </Title>

          <Button size="small" isDark={isDark} isOutline>
            <p>October</p>
            <KeyboardArrowDown />
          </Button>
        </div>

        {loadingChart ? (
          <div className="h-60 w-full flex items-center justify-center">
            <div className="animate-pulse h-40 w-full bg-gray-300 rounded" />
          </div>
        ) : (
          <AreaChart
            className="h-60 w-full"
            data={data}
            dataKey="date"
            series={[{ name: 'Apples', color: 'indigo.6' }]}
            curveType="bump"
          />
        )}
      </Card>
    </div>
  );
}
