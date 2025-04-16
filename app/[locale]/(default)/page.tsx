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

const data = [
  {
    date: 'Mar 22',
    Apples: 110,
  },
  {
    date: 'Mar 23',
    Apples: 60,
  },
  {
    date: 'Mar 24',
    Apples: 80,
  },
  {
    date: 'Mar 25',
    Apples: null,
  },
  {
    date: 'Mar 26',
    Apples: null,
  },
  {
    date: 'Mar 27',
    Apples: 40,
  },
  {
    date: 'Mar 28',
    Apples: 120,
  },
  {
    date: 'Mar 29',
    Apples: 80,
  },
];

export default function Dashboard() {
  const { isDark } = useTheme();
  const { t } = useT('dashboard');

  const stats = [
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

  return (
    <div className="flex flex-col gap-6">
      <Title size="3xl" isDark={isDark}>
        {t('dashboard')}
      </Title>

      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat, index) => (
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

        <AreaChart
          className="h-60 w-full"
          data={data}
          dataKey="date"
          series={[{ name: 'Apples', color: 'indigo.6' }]}
          curveType="bump"
        />
      </Card>
    </div>
  );
}
