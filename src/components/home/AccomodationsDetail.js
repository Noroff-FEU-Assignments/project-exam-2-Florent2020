import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Heading from "../layout/Heading";
// import SubHeading from "../layout/SubHeading";
import Spinner from 'react-bootstrap/Spinner';
import axios from "axios";
import { BASE_URL } from "../../constants/api";
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'

export default function AccommodationDetail() {
	const [accommodation, setAccommodation] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	let { id } = useParams();


	const url = BASE_URL + `/hotels/${id}`;



	useEffect(
		function () {
			async function getDetail() {

				try {
					const response = await axios.get(url);
					console.log("response", response.data);
					setAccommodation(response.data);
				} catch (error) {
					console.log(error);
					setError(error.toString());
				} finally {
					setLoading(false);
				}

			}
			getDetail();

		},
		// eslint-disable-next-line
		[]
	);

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };


	if (loading) return <div>
		<Spinner animation="border" role="status" variant="success">
			<span className="sr-only">Loading...</span>
		</Spinner>
	</div>;

	if (error) return <div>{}</div>;

	return (
		<div className="detail--page">
            <div className="banner__detail--page">
                <Heading content="… where the soul finds peace!" />
                <div className="shadow"></div>
                <Carousel activeIndex={index} onSelect={handleSelect}>
                    <Carousel.Item>
                        <img
                            className="d-flex justify-content-top w-100"
                            src={accommodation.image_url}
                            alt={accommodation.name}
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-flex justify-content-top w-100"
                            src={accommodation.image_url2}
                            // alt={accommodation.image.alternativeText}
                            alt={accommodation.name}
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-flex justify-content-top w-100"
                            src={accommodation.image_url3}
                            // alt={accommodation.image.alternativeText}
                            alt={accommodation.name}
                        />
                    </Carousel.Item>
                    </Carousel>
            </div>

            <Container>
                <div className="details--info">
                    <h2>{accommodation.name}</h2>
                    <Card.Text  className="location"><i className="fas fa-map-marker-alt"></i>{accommodation.location}</Card.Text>
                    <Card.Text className="description">{accommodation.description}</Card.Text>
                    <Row>
                        <Col xs={12} md={6}>
                            <Card.Text className="breakfast"><i className="fas fa-utensils"></i>{accommodation.breakfast}</Card.Text>
                            <Card.Text className="wifi"><i className="fas fa-wifi"></i>{accommodation.wifi}</Card.Text>
                            <Card.Text className="parking"><i className="fas fa-parking"></i>{accommodation.parking}</Card.Text>
                            <Card.Text className="fitness"><i className="fas fa-dumbbell"></i>{accommodation.fitness}</Card.Text>
                            <Card.Text className="stay">{accommodation.stay}</Card.Text>
                            <Card.Text className="price">NOK {accommodation.price}</Card.Text>
                            <Link to={`/hotel/booking/${accommodation.id}`} className="accommodation--button" ><Button variant="primary">Book Now!</Button></Link>
                        </Col>
                        <Col xs={12} md={6}>
                           MAP
                        </Col>
                    </Row>
                </div>
            </Container>
		</div>
	);
}
