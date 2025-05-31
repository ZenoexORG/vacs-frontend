'use client';

import { useTheme } from "@contexts/themeContext";
import { Header } from "@organisms/Header";
import { useAuth } from "@hooks/auth/useAuth";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const DefaultHeader = ({ onMenuClick }) => {
	const { isDark } = useTheme();
	const { user, isLoading } = useAuth();
	const [incidentCount, setIncidentCount] = useState(0);

	useEffect(() => {
		// Obtener el recuento inicial de incidentes (opcional)
		// Podrías hacer una llamada API inicial aquí

		// Conectar al WebSocket
		const socket: Socket = io("http://localhost:9200/notifications", {
			transports: ["websocket"],
		});

		// Escuchar actualizaciones de recuento de incidentes
		socket.on("incidents_count", (data) => {
			console.log("Recibido recuento de incidentes:", data);
			setIncidentCount(data.count || 0);
		});

		// Manejar errores de conexión
		socket.on("connect_error", (error) => {
			console.error("Error al conectar con el WebSocket:", error);
		});

		// Limpiar la conexión cuando el componente se desmonte
		return () => {
			socket.disconnect();
		};
	}, []);

	// Si está cargando, puedes mostrar un placeholder o un skeleton
	if (isLoading) {
		return <div className="h-17 w-full bg-gray-200 animate-pulse"></div>;
	}

	const token = getCookie('token');
	console.log('Token:', token);

	return (
		<Header
			isDark={isDark}
			number={incidentCount}
			fullname={user?.fullname || 'Guest'}
			role={user?.role || 'User'}
			onMenuClick={onMenuClick}
		/>
	);
};
