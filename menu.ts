export const headerPageMenu = {
	dashboard: {
		id: 'dashboard',
		text: 'Dashboard',
		path: '/',
		icon: 'DashboardOutlined',
	},

	accessLog: {
		id: 'accessLog',
		text: 'Access Log',
		path: '/access-log',
		icon: 'FormatListNumberedOutlined',
	},
}

export const PageMenu = {
	security: {
		id: 'security',
		text: 'Security',
		path: '/security',
		icon: 'SecurityOutlined',
		subMenu: {
			incident: {
				id: 'incident',
				text: 'Incidents',
				path: '/security/incident',
				icon: 'QuestionAnswerOutlined',
			},
		},
	},

	configuration: {
		id: 'configuration',
		text: 'Configuration',
		path: '/configuration',
		icon: 'SettingsOutlined',
		subMenu: {
			employee: {
				id: 'employee',
				text: 'Employees',
				path: '/configuration/employee',
				icon: 'BadgeOutlined',
			},

			user: {
				id: 'user',
				text: 'Users',
				path: '/configuration/user',
				icon: 'PersonOutlineOutlined',
			},

			vehicle: {
				id: 'vehicle',
				text: 'Vehicles',
				path: '/configuration/vehicle',
				icon: 'DriveEtaOutlined',
			},

			role: {
				id: 'role',
				text: 'Roles',
				path: '/configuration/role',
				icon: 'AccountTreeOutlined',
			},
		},
	},
}

export const footerPageMenu = {
	about: {
		id: 'about',
		text: 'About',
		path: '/about',
		icon: 'InfoOutlined',
	},

	logout: {
		id: 'logout',
		text: 'Logout',
		path: '/logout',
		icon: 'ExitToAppOutlined',
	},
}
