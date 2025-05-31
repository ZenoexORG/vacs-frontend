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

interface StatItem {
  title: string;
  value: string;
  percent: [string, 'up' | 'down'];
  color: string;
  icon: string;
}

export default function Page() {
  const { isDark } = useTheme();
  const { t } = useT('dashboard');

  const [data, setData] = useState([]);
  const [stats, setStats] = useState<StatItem[]>([]);

  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingChart, setLoadingChart] = useState(true);

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

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

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const [showMonthSelector, setShowMonthSelector] = useState(false);

  const handleMonthChange = (selectedMonth) => {
    setMonth(selectedMonth + 1); // +1 because array is 0-based but our API expects 1-12
    fetchData(selectedMonth + 1, year);
    fetchStats(selectedMonth + 1);
    setShowMonthSelector(false);
  };

  useEffect(() => {
    fetchData(month, year);
    fetchStats(month);
  }, []);

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <Title size="3xl" isDark={isDark} className="text-xl md:text-2xl lg:text-3xl">
        {t('dashboard')}
      </Title>

      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {loadingStats
          ? Array(2).fill(0).map((_, index) => (
            <Card key={index} isDark={isDark} className="min-h-[100px]">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-300 rounded w-3/4" />
                <div className="h-6 bg-gray-400 rounded w-1/2" />
              </div>
            </Card>
          ))
          : stats.map((stat, index) => (
            <Card key={index} isDark={isDark} className="min-h-[100px]">
              <div className="flex justify-between items-center">
                <div>
                  <Text size="medium" isDark={isDark} className="text-sm md:text-base">
                    {stat.title}
                  </Text>
                  <Title size="2xl" isDark={isDark} className="text-lg md:text-xl lg:text-2xl">
                    {stat.value}
                  </Title>
                </div>

                <Icon isDark={isDark} color={stat.color} icon={stat.icon} />
              </div>

              <Title
                size="small"
                isDark={isDark}
                className="text-xs md:text-sm flex items-center flex-wrap"
              >
                <span className={`flex items-center ${stat.percent[1] === 'up' ? 'text-action-success' : 'text-action-error'}`}>
                  {stat.percent[1] === 'up'
                    ? <TrendingUp fontSize="small" />
                    : <TrendingDown fontSize="small" />
                  } {stat.percent[0]}
                </span>
                <span className="ml-1">{t('from_last_month')}</span>
              </Title>
            </Card>
          ))}
      </div>

      {/* Chart Card */}
      <Card isDark={isDark} space={6} className="p-3 md:p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <Title
            size="largest"
            isDark={isDark}
            className="text-base md:text-lg lg:text-xl"
          >
            {t('monthly_traffic')}
          </Title>

          {/* Month selector with dropdown */}
          <div className="relative">
            <Button
              size="small"
              isDark={isDark}
              isOutline
              onClick={() => setShowMonthSelector(!showMonthSelector)}
              className="text-xs md:text-sm"
            >
              <p>{months[month - 1]}</p>
              <KeyboardArrowDown />
            </Button>

            {showMonthSelector && (
              <div className={`absolute right-0 mt-1 w-40 py-2 ${isDark ? 'bg-dark-800' : 'bg-white'} shadow-lg rounded-md z-10 max-h-48 overflow-y-auto`}>
                {months.map((monthName, idx) => (
                  <button
                    key={idx}
                    className={`block w-full text-left px-4 py-2 text-sm hover:${isDark ? 'bg-dark-700' : 'bg-gray-100'} ${month === idx + 1 ? (isDark ? 'bg-dark-600' : 'bg-gray-200') : ''}`}
                    onClick={() => handleMonthChange(idx)}
                  >
                    {monthName}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {loadingChart ? (
          <div className="h-40 sm:h-60 w-full flex items-center justify-center">
            <div className="animate-pulse h-32 sm:h-40 w-full bg-gray-300 rounded" />
          </div>
        ) : (
          <div className="h-40 sm:h-60 w-full overflow-hidden">
            <AreaChart
              className="h-full w-full"
              data={data}
              dataKey="day"
              series={[{ name: 'total', color: 'indigo.6' }]}
              curveType="bump"
              withLegend={false}
              tickLine="y"
              yAxisProps={{
                width: 60,
                allowDecimals: false,
              }}
              xAxisProps={{ tickMargin: 10, height: 40 }}
            />
          </div>
        )}
      </Card>
    </div>
  );
}
