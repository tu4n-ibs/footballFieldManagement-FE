import Sidebar from "../sidebar/sidebar";
import "../../components/detail/football.css"
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle';
export default function Football() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const [fields, setFields] = useState('');
    const [time, setTime] = useState([]);
    const [selectedTime, setSelectedTime] = useState([]);
    const [selectedId, setSelectId] = useState(null);

    const idOwner = useParams();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkAuth = () => {
        return !!localStorage.getItem('currentUser');
    };

    useEffect(() => {
        setIsLoggedIn(checkAuth());
    }, []);

    console.log(isLoggedIn);
    console.log(user.data.id);

    const getAllFields = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/users/${idOwner.id}/getOwner`);
            setFields(response.data);
        } catch (error) {
            console.error('There was an error fetching the fields!', error);
        }
    };

    useEffect(() => {
        getAllFields();
    }, [idOwner]);

    const Currency = (value) => {
        if (value !== undefined && value !== null) {
            value = value.toString().replace(/[^0-9]/g, '');
            return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        } else {
            return '0';
        }
    };

    const getTime = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/users/${id}/time`)
            setTime(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('There was an error creating the field!', error);
        }

    }

    const handleBookClick = (fieldId, filedsPrice) => {
        setSelectId(fieldId);
        getTime(fieldId);
        setTotalPrice(filedsPrice);
        setSelectedFieldPrice(filedsPrice);
    };

    useEffect(() => {
        getTime();
    }, [])

    const handleTimeChange = (id) => {
        setSelectedTime((prevSelectedTimes) => {
            if (prevSelectedTimes.includes(id)) {
                return prevSelectedTimes.filter(timeId => timeId !== id);
            } else {
                return [...prevSelectedTimes, id];
            }
        });
    };
    const [owner, setOwner] = useState([]);
    const [totalPrice, setTotalPrice] = useState('');
    const [selectedFieldPrice, setSelectedFieldPrice] = useState(0);

    const getAllOwner = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/users/${idOwner.id}/getAllFields`);
            setOwner(response.data);
        } catch (error) {
            console.error('There was an error creating the field!', error);
        }
    }
    useEffect(() => {
        getAllOwner();
    }, [])

    const [byField, setByField] = useState('');

    const getFields = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/users/${id}/getField`);
            setByField(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('There was an error creating the field!', error);
        }
    }

    useEffect(() => {
        getFields();
    }, []);

    const handleClick = (fieldId) => {
        getFields(fieldId);
    };

    const rentFields = async () => {
        const data = {
            bookingTimes: selectedTime,
            totalPrice: totalPrice,
            user: {
                id: user.data.id
            },
            footballFields: {
                id: selectedId
            }
        };
        try {
            const response = await axios.post('http://localhost:8080/users/createBooking', data, {
                headers: {
                    'Authorization': `Bearer ${user.data.token}`
                }
            });
            console.log('Field created successfully', response.data);
            handleClose();
        } catch (error) {
            console.error('There was an error creating the field!', error);
        }
    };
    const handleClose = () => {
        const modalElement = document.getElementById('exampleModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
            modal.hide();
        } else {
            const newModal = new bootstrap.Modal(modalElement);
            newModal.hide();
        }
    };

    return (
        <>
            <div className="d-flex">
                <Sidebar />
                <Container style={{ marginTop: '3.5rem' }}>
                    <h5 className="mt">Thông tin sân bóng</h5>
                    <div className="infor d-flex">
                        <img src="https://www.sporta.vn/assets/default_venue_0-4c8b68154138176321e0c2cc01611084f2dbc3a9ce303946fdf68a58ef3f9acb.jpg" className="img" alt="..." />
                        <div className="v">
                            <h4 className="mb-0">{fields.name}</h4>
                            <div className="stars mb-0">
                                <div className="stars">
                                    <input className="star star-1" id="star-1" type="radio" name="star" />
                                    <label className="star star-1" htmlFor="star-1"></label>
                                    <input className="star star-2" id="star-2" type="radio" name="star" />
                                    <label className="star star-2" htmlFor="star-2"></label>
                                    <input className="star star-3" id="star-3" type="radio" name="star" />
                                    <label className="star star-3" htmlFor="star-3"></label>
                                    <input className="star star-4" id="star-4" type="radio" name="star" />
                                    <label className="star star-4" htmlFor="star-4"></label>
                                    <input className="star star-5" id="star-5" type="radio" name="star" />
                                    <label className="star star-5" htmlFor="star-5"></label>
                                </div>
                            </div>
                            <p className="mb-0">{fields.location}</p>
                            <p className="mb-0">{fields.email}</p>
                            <p className="mt-0">{fields.phone}</p>
                        </div>
                    </div>
                    <hr />
                    <h4 className="mt-3">Sân bóng</h4>
                    <Row className="row-cols-1 row-cols-md-3 g-3">
                        {owner.map((item) => (
                            item.status && (
                                <Col key={item.id}>
                                    <Card className="mb-3">
                                        <Card.Img variant="top" src="https://www.sporta.vn/assets/default_venue_0-4c8b68154138176321e0c2cc01611084f2dbc3a9ce303946fdf68a58ef3f9acb.jpg" />
                                        <Card.Body>
                                            <Card.Title>{item.name}</Card.Title>
                                            <div className="stars mb-0">
                                                <div className="stars">
                                                    <input className="star star-1" id="star-1" type="radio" name="star" />
                                                    <label className="star star-1" htmlFor="star-1"></label>
                                                    <input className="star star-2" id="star-2" type="radio" name="star" />
                                                    <label className="star star-2" htmlFor="star-2"></label>
                                                    <input className="star star-3" id="star-3" type="radio" name="star" />
                                                    <label className="star star-3" htmlFor="star-3"></label>
                                                    <input className="star star-4" id="star-4" type="radio" name="star" />
                                                    <label className="star star-4" htmlFor="star-4"></label>
                                                    <input className="star star-5" id="star-5" type="radio" name="star" />
                                                    <label className="star star-5" htmlFor="star-5"></label>
                                                </div>
                                            </div>
                                            <Card.Text>{item.description}</Card.Text>
                                            {isLoggedIn && (
                                                <Button className="mt-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleBookClick(item.id, item.price)}>
                                                    Thuê sân
                                                </Button>
                                            )}
                                            <Button className="mt-2 ms-2 btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={() => handleClick(item.id)}>
                                                Xem Sân
                                            </Button>
                                            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ marginTop: '3.5rem' }}>
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Chi tiết sân bóng</h1>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <div className="row">
                                                                <h3>{byField.name}</h3>
                                                                <h6>Giá sân: {Currency(byField.price) + ' đ'}</h6>
                                                                <h6>Thể loại sân: {byField.typeFields}</h6>
                                                                <h6>Mô tả sân: {byField.description}</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ marginTop: '3.5rem' }}>
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Thuê sân bóng</h1>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <div className="row">
                                                                <label>Chọn khung giờ:</label>
                                                                {time.map((timeSlot) => (
                                                                    <div className="col" key={timeSlot.id}>
                                                                        <div className="form-check">
                                                                            <input
                                                                                className="form-check-input"
                                                                                type="radio"
                                                                                name="timeSlot"
                                                                                id={`flexCheckDefault${timeSlot.id}`}
                                                                                value={timeSlot.timeFields}
                                                                                onChange={() => handleTimeChange(timeSlot.id)}
                                                                            />
                                                                            <label className="form-check-label" htmlFor={`flexCheckDefault${timeSlot.id}`}>
                                                                                {timeSlot.time}
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                                <input type="text" className="form-control mt-3" value={`${Currency(selectedFieldPrice)} đ`} disabled />
                                                            </div>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary pt-1 pb-1" data-bs-dismiss="modal">Hủy</button>
                                                            <button type="button" className="btn btn-primary pt-1 pb-1" onClick={rentFields}>Đặt sân</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        ))}
                    </Row>
                </Container>
            </div>
        </>
    );
}