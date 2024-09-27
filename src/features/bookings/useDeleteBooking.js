import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteBooking as deleteBookingApi } from '../../services/apiBookings';

export function useDeleteBooking() {
	const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
		mutationFn: deleteBookingApi, // The function which is called by React Query
		onSuccess: () => {
			toast.success('Booking successfully deleted');

			// refetch the data as soon as the deletion happens with the help of the query client
			queryClient.invalidateQueries({
				queryKey: ['bookings'],
			});
		},
		onError: (err) => toast.error(err.message),
	});

	return { isDeleting, deleteBooking };
}
