export const headerPageMenu = {
	dashboard: {
		id: 'dashboard',
		text: 'Dashboard',
		path: '/:locale',
		icon: 'DashboardOutlined',
	},

	accessLog: {
		id: 'accessLog',
		text: 'Access Log',
		path: '/:locale/access-log',
		icon: 'FormatListNumberedOutlined',
	},

	reports: {
		id: 'reports',
		text: 'Reports',
		path: '/:locale/reports',
		icon: 'DataSaverOff',
	},
}

export const PageMenu = {
	security: {
		id: 'security',
		text: 'Security',
		path: '/:locale/security',
		icon: 'SecurityOutlined',
		subMenu: {
			incident: {
				id: 'incident',
				text: 'Incidents',
				path: '/:locale/security/incident',
				icon: 'QuestionAnswerOutlined',
			},
		},
	},

	configuration: {
		id: 'configuration',
		text: 'Configuration',
		path: '/:locale/configuration',
		icon: 'SettingsOutlined',
		subMenu: {
			employee: {
				id: 'employee',
				text: 'Employees',
				path: '/:locale/configuration/employee',
				icon: 'BadgeOutlined',
			},

			user: {
				id: 'user',
				text: 'Users',
				path: '/:locale/configuration/user',
				icon: 'PersonOutlineOutlined',
			},

			vehicle: {
				id: 'vehicle',
				text: 'Vehicles',
				path: '/:locale/configuration/vehicle',
				icon: 'DriveEtaOutlined',
			},

			role: {
				id: 'role',
				text: 'Roles',
				path: '/:locale/configuration/role',
				icon: 'AccountTreeOutlined',
			},
		},
	},
}

export const footerPageMenu = {
	logout: {
		id: 'logout',
		text: 'Logout',
		path: '/:locale/auth',
		icon: 'ExitToAppOutlined',
	},
}
