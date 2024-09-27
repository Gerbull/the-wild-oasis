import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useBookings() {
	const queryClient = useQueryClient();
	const [searchParams] = useSearchParams();

	// FILTERING
	const filterValue = searchParams.get('status');
	const filter =
		!filterValue || filterValue === 'all'
			? null
			: { field: 'status', value: filterValue };
	// : { field: 'totalPrice', value: 5000, method: 'gte' };

	// SORTING
	const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
	const [field, direction] = sortByRaw.split('-');
	const sortBy = { field, direction };

	// PAGINATION
	const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

	// QUERY
	const {
		isLoading,
		data: { data: bookings, count } = {},
		error,
	} = useQuery({
		queryKey: ['bookings', filter, sortBy, page], // Will uniqly identify the data here - should be an array or complex array
		queryFn: () => getBookings({ filter, sortBy, page }), // Needs to be async function, so  it will return a promise. It's responsible for fetching the data from the API - we can use our API services, created earlier
	});

	// PRE-FETCHING
	const pageCount = Math.ceil(count / PAGE_SIZE);
	if (page < pageCount)
		queryClient.prefetchQuery({
			queryKey: ['bookings', filter, sortBy, page + 1],
			queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
		});

	if (page > 1)
		queryClient.prefetchQuery({
			queryKey: ['bookings', filter, sortBy, page - 1],
			queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
		});

	return { isLoading, error, bookings, count };
}
