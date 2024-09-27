import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';

export function useLogout() {
	const navigate = useNavigate();
	const quryClient = useQueryClient();

	const { mutate: logout, isLoading } = useMutation({
		mutationFn: logoutApi,
		onSuccess: () => {
			quryClient.removeQueries();
			navigate('/login', { replace: true });
		},
	});

	return { logout, isLoading };
}
