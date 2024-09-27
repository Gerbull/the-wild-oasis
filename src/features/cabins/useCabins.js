import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';

export function useCabins() {
	const {
		isLoading,
		data: cabins,
		error,
	} = useQuery({
		queryKey: ['cabins'], // Will uniqly identify the data here - should be an array or complex array
		queryFn: getCabins, // Needs to be async function, so  it will return a promise. It's responsible for fetching the data from the API - we can use our API services, created earlier
	});

	return { isLoading, error, cabins };
}
