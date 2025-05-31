'use client';

import { Title } from "@atoms/Title";
import { useTheme } from "@contexts/themeContext";
import { useT } from "../../../i18n/useT";
import { useEffect, useState } from "react";
import IncidentsAPI from "@hooks/incidents/incidents";
import { DefaultTicketSidebar } from "@components/DefaultTicketSidebar";
import { IncidentTable } from "@organisms/IncidentList";
import { Chat } from "@organisms/Chat";

export default function Page() {
  const { isDark } = useTheme();
  const { t } = useT('incident');

  const [data, setData] = useState([]);
  const [open, setOpen] = useState(0);
  const [closed, setClosed] = useState(0);

  const [status, setStatus] = useState('open');
  const [priority, setPriority] = useState('high');

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [selectedIncident, setSelectedIncident] = useState(null);

  const fetchData = async (pageToFetch = 1) => {
    setLoading(true);
    try {
      const response = await IncidentsAPI.advancedList(pageToFetch, 6, status, priority);
      setData(response.data);
      setOpen(response.meta.open);
      setClosed(response.meta.closed);
      setPage(response.meta.page);
      setTotalPages(response.meta.total_pages);
    } catch (error) {
      console.error('Error fetching access log', error);
    } finally {
      setLoading(false);
    }
  };

  const addMessage = async (incidentId: any, message: string) => {
    setLoading(true);

    try {
      const response = await IncidentsAPI.addMessage(incidentId, message);
      console.log('Message added:', response);
    } catch (error) {
      console.error('Error adding message', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setPage(1);
    fetchData(1);
  }, [status, priority]);

  useEffect(() => {
    if (page > 1) {
      fetchData(page);
    }
  }, [page]);

  const handleIncidentClick = (incident: any) => {
    setSelectedIncident(incident);
  };

  const handleBackFromChat = () => {
    setSelectedIncident(null);
  };

  const handleStatusChange = (newStatus: any) => {
    setLoading(true);
    setStatus(newStatus);
  };

  const handlePriorityChange = (newPriority: any) => {
    setLoading(true);
    setPriority(newPriority);
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <Title size="3xl" isDark={isDark}>
        {t('incidents')}
      </Title>

      {selectedIncident ? (
        <Chat
          isDark={isDark}
          chatData={selectedIncident}
          addMessage={addMessage}
          onBack={handleBackFromChat}
          className="h-full"
        />
      ) : (
        <div className="flex gap-6 h-full">
          <DefaultTicketSidebar
            open={open}
            closed={closed}
            status={status}
            setStatus={handleStatusChange}
            priority={priority}
            setPriority={handlePriorityChange}
            loading={loading}
          />

          <IncidentTable
            data={data}
            meta={{
              page,
              total_pages: totalPages,
              open,
              closed,
            }}
            isLoading={loading}
            isDark={isDark}
            onPageChange={setPage}
            onSearch={(query) => {
              console.log(query);
            }}
            onIncidentClick={handleIncidentClick}
          />
        </div>
      )}
    </div>
  );
}
