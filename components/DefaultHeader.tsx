'use client';

import { useTheme } from "@contexts/themeContext";
import { Header } from "@organisms/Header";
import { useAuth } from "@hooks/auth/useAuth";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

type DefaultHeaderProps = {
	onMenuClick: () => void;
};

export const DefaultHeader = ({ onMenuClick }: DefaultHeaderProps) => {
	const { isDark } = useTheme();
	const { user, isLoading } = useAuth();
	const [incidentCount, setIncidentCount] = useState(0);

	useEffect(() => {
		const socket: Socket = io("http://localhost:9200/notifications", {
			transports: ["websocket"],
		});

		socket.on("incidents_count", (data) => {
			console.log("Recibido recuento de incidentes:", data);
			setIncidentCount(data.count || 0);
		});

		socket.on("connect_error", (error) => {
			console.error("Error al conectar con el WebSocket:", error);
		});

		return () => {
			socket.disconnect();
		};
	}, []);

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

