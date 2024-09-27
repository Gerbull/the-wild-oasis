import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins';

export function useDeleteCabin() {
	const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
		mutationFn: deleteCabinApi, // The function which is called by React Query
		onSuccess: () => {
			toast.success('Cabin successfully deleted');

			// refetch the data as soon as the deletion happens with the help of the query client
			queryClient.invalidateQueries({
				queryKey: ['cabins'],
			});
		},
		onError: (err) => toast.error(err.message),
	});

	return { isDeleting, deleteCabin };
}
