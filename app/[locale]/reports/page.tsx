'use client';

import { useState } from "react";
import { Title } from "@atoms/Title";
import { useTheme } from "@contexts/themeContext";
import { useT } from "../../i18n/useT";
import ReportAPI from "@hooks/report/report";

export default function AccessLog() {
  const { isDark } = useTheme();
  const { t } = useT('reports');

  const [reportType, setReportType] = useState('date'); // 'date' o 'range'
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
    <div className="flex flex-col gap-6">
      <Title size="3xl" isDark={isDark}>
        {t('reports')}
      </Title>

      <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="mb-4">
          <h2 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            {t('downloadReports')}
          </h2>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {t('reportsDescription')}
          </p>
        </div>

        <div className="mb-6">
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setReportType('date')}
              className={`px-4 py-2 rounded ${reportType === 'date'
                ? (isDark ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                : (isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700')}`}
            >
              {t('singleDateReport')}
            </button>
            <button
              onClick={() => setReportType('range')}
              className={`px-4 py-2 rounded ${reportType === 'range'
                ? (isDark ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                : (isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700')}`}
            >
              {t('dateRangeReport')}
            </button>
          </div>

          {reportType === 'date' ? (
            <div className="mb-4">
              <label className={`block mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('selectDate')}
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`w-full p-2 border rounded ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className={`block mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t('startDate')}
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className={`w-full p-2 border rounded ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                />
              </div>
              <div>
                <label className={`block mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t('endDate')}
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className={`w-full p-2 border rounded ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                />
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleDownload}
              disabled={loading}
              className={`px-4 py-2 rounded ${isDark ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white disabled:opacity-50`}
            >
              {loading ? t('downloading') : t('downloadReport')}
            </button>

            {reportType === 'date' && (
              <button
                onClick={handleGenerate}
                disabled={loading}
                className={`px-4 py-2 rounded ${isDark ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-yellow-500 hover:bg-yellow-600'} text-white disabled:opacity-50`}
              >
                {loading ? t('generating') : t('generateReport')}
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded bg-red-100 border border-red-300 text-red-800">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="p-3 mb-4 rounded bg-green-100 border border-green-300 text-green-800">
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
}
