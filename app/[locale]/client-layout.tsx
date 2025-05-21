'use client';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/charts/styles.css';
import './globals.css';

import React, { useState } from 'react';
import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ThemeProvider } from '@contexts/themeContext';
import { DefaultAside } from '@components/DefaultAside';
import { DefaultHeader } from '@components/DefaultHeader';
import { usePathname } from 'next/navigation';
import { AuthCheck } from '@components/AuthCheck';

const theme = createTheme({});

export default function ClientLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const isAuthPage = pathname.includes('/auth');
	const lng = pathname.split('/')[1];
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<html lang={lng}>
			<body>
				<ThemeProvider>
					<MantineProvider theme={theme}>
						<Notifications />
						<AuthCheck>
							{isAuthPage ? (
								<main>{children}</main>
							) : (
								<main className="flex flex-col md:flex-row items-start">
									<DefaultAside
										isOpen={isSidebarOpen}
										onClose={() => setIsSidebarOpen(false)}
										className="md:relative fixed z-20"
									/>
									<div className="h-screen w-full flex flex-col">
										<DefaultHeader onMenuClick={toggleSidebar} />
										<div className="p-3 md:p-6 h-0 flex-grow overflow-auto no-scrollbar">{children}</div>
									</div>
								</main>
							)}
						</AuthCheck>
					</MantineProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
