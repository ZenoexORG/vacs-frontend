'use client';

import { useState } from "react";
import { Title } from "@atoms/Title";
import { Card } from "@atoms/Card";
import { Button } from "@atoms/Button";
import { Text } from "@atoms/Text";
import { useTheme } from "@contexts/themeContext";
import { useT } from "../../i18n/useT";
import ReportAPI from "@hooks/report/report";

export default function AccessLog() {
  const { isDark } = useTheme();
  const { t } = useT('reports');

  const [reportType, setReportType] = useState('date');
  const [date, setDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleDownload = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage('');

    try {
      let response;
      let filename;

      if (reportType === 'date') {
        if (!date) {
          throw new Error(t('selectDateError'));
        }
        response = await ReportAPI.datePDF(date);
        filename = `report-${date}.pdf`;
      } else {
        if (!startDate || !endDate) {
          throw new Error(t('selectDateRangeError'));
        }
        response = await ReportAPI.rangePDF(startDate, endDate);
        filename = `report-${startDate}-to-${endDate}.pdf`;
      }

      // Manejo de buffer binario
      if (response) {
        // Crear un Blob desde el buffer binario recibido
        const blob = new Blob([response], { type: 'application/pdf' });

        // Crear URL de objeto y descargar
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();

        // Limpiar recursos
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
          document.body.removeChild(link);
        }, 100);

        setSuccessMessage(t('downloadSuccess'));
      } else {
        setError(t('noReportAvailable'));
      }
    } catch (err) {
      console.error('Error downloading report:', err);
      setError(err.message || t('downloadError'));
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage('');

    try {
      if (!date) {
        throw new Error(t('selectDateError'));
      }

      await ReportAPI.generate(date);
      setSuccessMessage(t('generateSuccess'));
    } catch (err) {
      setError(err.message || t('generateError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <Title
        size="3xl"
        isDark={isDark}
        className="text-xl md:text-2xl lg:text-3xl mb-2"
      >
        {t('reports')}
      </Title>

      <Card isDark={isDark} size="medium" className="shadow-md">
        <div className="mb-4">
          <Title size="largest" isDark={isDark} className="mb-2">
            {t('downloadReports')}
          </Title>
          <Text isDark={isDark} size="medium">
            {t('reportsDescription')}
          </Text>
        </div>

        <div className="mb-6">
          {/* Report Type Selection - Stack on small screens */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4">
            <Button
              isDark={isDark}
              onClick={() => setReportType('date')}
              className={`${reportType === 'date'
                ? 'bg-primary-600 text-white-50'
                : isDark ? 'bg-dark-700' : 'bg-black-50'}`}
              size="small"
            >
              {t('singleDateReport')}
            </Button>
            <Button
              isDark={isDark}
              onClick={() => setReportType('range')}
              className={`${reportType === 'range'
                ? 'bg-primary-600 text-white-50'
                : isDark ? 'bg-dark-700' : 'bg-black-50'}`}
              size="small"
            >
              {t('dateRangeReport')}
            </Button>
          </div>

          {reportType === 'date' ? (
            <div className="mb-4">
              <Title size="small" isDark={isDark} className="mb-2">
                {t('selectDate')}
              </Title>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`w-full p-2 border rounded text-sm md:text-base ${isDark ? 'bg-dark-700 border-dark-600 text-white-50' : 'bg-white-50 border-white-200'}`}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <Title size="small" isDark={isDark} className="mb-2">
                  {t('startDate')}
                </Title>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className={`w-full p-2 border rounded text-sm md:text-base ${isDark ? 'bg-dark-700 border-dark-600 text-white-50' : 'bg-white-50 border-white-200'}`}
                />
              </div>
              <div>
                <Title size="small" isDark={isDark} className="mb-2">
                  {t('endDate')}
                </Title>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className={`w-full p-2 border rounded text-sm md:text-base ${isDark ? 'bg-dark-700 border-dark-600 text-white-50' : 'bg-white-50 border-white-200'}`}
                />
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Button
              isDark={isDark}
              isSubmit={true}
              onClick={handleDownload}
              className={`disabled:opacity-50 ${loading ? 'opacity-70' : ''}`}
            >
              {loading ? t('downloading') : t('downloadReport')}
            </Button>

            {reportType === 'date' && (
              <Button
                isDark={isDark}
                onClick={handleGenerate}
                className={`bg-action-warning text-white-50 hover:bg-action-warning/80 disabled:opacity-50 ${loading ? 'opacity-70' : ''}`}
              >
                {loading ? t('generating') : t('generateReport')}
              </Button>
            )}
          </div>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded text-sm md:text-base bg-action-error/20 border border-action-error text-action-error">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="p-3 mb-4 rounded text-sm md:text-base bg-action-success/20 border border-action-success text-action-success">
            {successMessage}
          </div>
        )}
      </Card>
    </div>
  );
}
