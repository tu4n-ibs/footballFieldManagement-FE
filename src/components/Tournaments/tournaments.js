import Sidebar from "../sidebar/sidebar";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export default function Tournaments() {
    return (
        <div className="d-flex">
            <Sidebar />
            <Container fluid className="ms-sm-auto" style={{marginTop:'3.5rem'}}>
                <Row className="g-3">
                    <Col xs={12}>
                        <h5 className="mb-3">Giải đấu</h5>
                    </Col>
                    <Col xs={12} md={4} className="mt-1">
                        <Card>
                            <Card.Img variant="top" src="https://d82bjlqmetw03.cloudfront.net/uploads/production/season_league/cover/2/medium_47b5be04-0431-4bd9-b03c-65be7f4a3c91.jpeg?updatedAt=1717505135" />
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                    This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                                </Card.Text>
                                <Button variant="primary">Xem Thêm</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
