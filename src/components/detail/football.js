import Sidebar from "../sidebar/sidebar";
import "../../components/detail/football.css"
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
            const response = await axios.get(`http://localhost:8080/users/${idOwner.id}/getOwner`, {
                headers: {
                    'Authorization': `Bearer ${user.data.token}`
                }
            });
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
            const response = await axios.get(`http://localhost:8080/users/${id}/time`, {
                headers: {
                    'Authorization': `Bearer ${user.data.token}`
                }
            })
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

    const handleClose = () => {
        setSelectedTime([]);
        setTotalPrice(0);
    };

    const getAllOwner = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/users/${idOwner.id}/getAllFields`, {
                headers: {
                    'Authorization': `Bearer ${user.data.token}`
                }
            })
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
            const response = await axios.get(`http://localhost:8080/users/${id}/getField`, {
                headers: {
                    'Authorization': `Bearer ${user.data.token}`
                }
            })
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

    return (
        <>
            <div>
                <div className="sidebar">
                    <Sidebar />
                </div>
                <div className="container row g-3">
                    <h5 className="mt">Thông tin sân bóng</h5>
                    <div className="infor">
                        <img src="https://www.sporta.vn/assets/default_venue_0-4c8b68154138176321e0c2cc01611084f2dbc3a9ce303946fdf68a58ef3f9acb.jpg" class="img" alt="..." />
                        <div className="ms-4" style={{ display: 'flex', float: 'left' }}>
                            <div>
                                <h4 className="mb-0">{fields.name}</h4>
                                <div class="stars mb-0">
                                    <input className="star star-1" id="star-1" type="radio" name="star" />
                                    <label className="star star-1 m-0" for="star-1"></label>
                                    <input className="star star-2" id="star-2" type="radio" name="star" />
                                    <label className="star star-2" for="star-2"></label>
                                    <input className="star star-3" id="star-3" type="radio" name="star" />
                                    <label className="star star-3" for="star-3"></label>
                                    <input className="star star-4" id="star-4" type="radio" name="star" />
                                    <label className="star star-4" for="star-4"></label>
                                    <input className="star star-5" id="star-5" type="radio" name="star" />
                                    <label className="star star-5" for="star-5"></label>
                                </div>
                                <p className="mb-0 mt-0">{fields.location}</p>
                                <p className="mb-0 mt-0 pt-0">{fields.email}</p>
                                <p className="mt-0">{fields.phone}</p>

                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <hr />
                    </div>
                    <div className="mt-1">
                        <h4 className="mt-0">Sân bóng</h4>
                        <div className="row row-cols-1 row-cols-md-3 g-3">
                            {owner.map((item) => {
                                if (item.status) {
                                    return (
                                        <div className="col" key={item.id}>
                                            <div className="card" style={{ maxWidth: "410px", minHeight: "400px" }}>
                                                <img src="https://www.sporta.vn/assets/default_venue_0-4c8b68154138176321e0c2cc01611084f2dbc3a9ce303946fdf68a58ef3f9acb.jpg" className="card-img-top" alt="..." />
                                                <div className="card-body" style={{ maxWidth: "408px", minHeight: "120px" }}>
                                                    <h5 className="card-title">{item.name}</h5>
                                                    <div class="stars mb-0">
                                                        <input className="star star-1" id="star-1" type="radio" name="star" />
                                                        <label className="star star-1" for="star-1"></label>
                                                        <input className="star star-2" id="star-2" type="radio" name="star" />
                                                        <label className="star star-2" for="star-2"></label>
                                                        <input className="star star-3" id="star-3" type="radio" name="star" />
                                                        <label className="star star-3" for="star-3"></label>
                                                        <input className="star star-4" id="star-4" type="radio" name="star" />
                                                        <label className="star star-4" for="star-4"></label>
                                                        <input className="star star-5" id="star-5" type="radio" name="star" />
                                                        <label className="star star-5" for="star-5"></label>
                                                    </div>
                                                    <p className="card-text mb-1">{item.description}</p>
                                                    {isLoggedIn && (
                                                        <button type="button" class="btn btn-primary mt-2 pt-1 pb-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleBookClick(item.id, item.price)}>
                                                            Thuê sân
                                                        </button>
                                                    )}
                                                    <button type="button" class="btn btn-secondary mt-2 pt-1 pb-1 ms-5" style={{ float: 'right' }} data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={() => handleClick(item.id)}>
                                                        Xem Sân
                                                    </button>
                                                    <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                        <div class="modal-dialog">
                                                            <div class="modal-content">
                                                                <div class="modal-header">
                                                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Chi tiết sân bóng</h1>
                                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                                                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                        <div class="modal-dialog">
                                                            <div class="modal-content">
                                                                <div class="modal-header">
                                                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Thuê sân bóng</h1>
                                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                                                                        <input type="text" className="form-control mt-3" value={Currency(selectedFieldPrice) + ' đ'} disabled />
                                                                    </div>
                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button type="button" className="btn btn-secondary pt-1 pb-1" data-bs-dismiss="modal">Hủy</button>
                                                                    <button type="button" className="btn btn-primary pt-1 pb-1" onClick={rentFields}>Đặt sân</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}