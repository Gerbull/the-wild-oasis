import { useEffect, useRef } from 'react';

export function useOutsideClick(handler, listenCapturing = true) {
	const ref = useRef();

	useEffect(
		function () {
			function handleClick(e) {
				if (ref.current && !ref.current.contains(e.target)) handler();
			}
			document.addEventListener('click', handleClick, listenCapturing); // true here means that event will be handled in the capturing phase not on the bubbling phse(when the event moves up), as the event moves down the event tree

			return () =>
				document.removeEventListener('click', handleClick, listenCapturing);
		},
		[handler, listenCapturing]
	);
	return ref;
}
