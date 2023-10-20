import React from 'react';
import { URL } from '../../../constants/url';
import { Card } from "react-bootstrap";

const ServerErrorPage = (props) => {
	const { errorMessage } = props;
	const handleClickHomeButton = () => {
		window.location.href = `${URL.HOME}`;
	};

	return (
		
		<Card>
			<Card.Header>Server Error</Card.Header>
			<Card.Body>
				<Card.Title>장애가 발생하였습니다</Card.Title>
				<Card.Text>{ errorMessage }</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default ServerErrorPage;
