import styled from 'styled-components';

const StyledParagraph = styled.div`
	font-size: 2.4rem;
	/* align-self: center; */
`;

function Empty({ resourceName }) {
	return (
		<StyledParagraph>
			<p>🚫 No {resourceName} could be found.</p>
		</StyledParagraph>
	);
}

export default Empty;
