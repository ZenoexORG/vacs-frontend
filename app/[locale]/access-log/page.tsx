'use client';

import { Title } from "@atoms/Title";
import { useTheme } from "@contexts/themeContext";
import { Table } from "@organisms/Table";
import { useT } from "../../i18n/useT";
import { useEffect, useState } from "react";
import AccessLogAPI from "@hooks/access-log/accessLog";
import { io, Socket } from "socket.io-client";

export default function AccessLog() {
  const { isDark } = useTheme();
  const { t } = useT('access_log');

  const [data, setData] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);

  const limit = 6;

  const columns = [
    { key: 'id', label: t('id') },
    { key: 'entry_date', label: t('entry_date') },
    { key: 'exit_date', label: t('exit_date') },
    { key: 'vehicle_id', label: t('vehicle_id') },
    {
      key: 'vehicle_type',
      label: t('type'),
      type: 'badge',
      badgeColorMap: {
        'authorized': '#00B69B',
        'private': '#EF3826',
        'visitor': '#FFA756',
        'provider': '#6226EF',
        'unregistered': '#C1009E',
      }
    },
    { key: 'owner_id', label: t('user_id') },
  ];

  const fetchData = async (pageToFetch = 1) => {
    setLoading(true);

    try {
      const response = await AccessLogAPI.list(pageToFetch, 6);
      setData(response.data);
      setPage(response.meta.page);
      setTotalPages(response.meta.total_pages);
    } catch (error) {
      console.error('Error fetching access log', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const socket: Socket = io("http://localhost:9200/notifications", {
      transports: ["websocket"],
    });

    socket.on("access_logs", (newLog) => {
      setData((prevData) => {
        let updatedData;
        const existingLogIndex = prevData.findIndex(log => log.id === newLog.data.id);

        if (existingLogIndex >= 0) {
          updatedData = [...prevData];
          updatedData[existingLogIndex] = { ...prevData[existingLogIndex], ...newLog.data };
        } else {
          updatedData = [newLog.data, ...prevData];
        }

        return updatedData.slice(0, limit);
      });
    });

    socket.on("connect_error", (error) => {
      console.error("Error al conectar con el WebSocket:", error);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <Title size="3xl" isDark={isDark}>
        {t('access_log')}
      </Title>

      {loading ? (
        <div className="flex items-center justify-center w-full h-96">
          <p className="text-gray-500">{t('loading')}</p>
        </div>
      ) : (
        <Table
          data={data}
          columns={columns}
          page={page}
          total={totalPages}
          isDark={isDark}
          onPageChange={(newPage: number) => {
            if (newPage < 1 || newPage > totalPages) return;
            fetchData(newPage);
          }}
        />
      )}
    </div>
  );
}
