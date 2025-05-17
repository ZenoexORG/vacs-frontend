import { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';

export const useAuth = () => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);

		const fullname = localStorage.getItem('fullname');
		const role = localStorage.getItem('role');

		setUser({
			fullname: fullname,
			role: role,
		});

		setIsLoading(false);
	}, []);

	return { user, isLoading };
};
