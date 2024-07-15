
import { useEffect, useState } from "react";
import "../../components/main/footballPitches.css";
import Sidebar from "../sidebar/sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FootballPitches() {
    const name = [
        { title: 'Cộng đồng' },
        { title: 'Cáp kèo - Tìm đối' },
        { title: 'Giải đấu' },
        { title: 'Sân bóng' }
    ];

    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [wards, setWards] = useState([]);
    const [selectedWard, setSelectedWard] = useState('');
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const [fields, setFields] = useState([]);
    const [time, setTime] = useState([]);
    const [selectedTime, setSelectedTime] = useState([]);
    const [selectedId, setSelectId] = useState(null);

    useEffect(() => {
        const getAllData = async () => {
            const res = await axios.get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json');
            setCities(res.data);

        }
        getAllData();
    }, [])

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
        setSelectedDistrict('');
        setSelectedWard('');
        const selectedCity = cities.find((city) => city.Name === event.target.value);
        setDistricts(selectedCity?.Districts || []);
    };

    const handleDistrictChange = (event) => {
        setSelectedDistrict(event.target.value);
        setSelectedWard('');
        const selectedDistrict = districts.find((district) => district.Name === event.target.value);
        setWards(selectedDistrict?.Wards || []);
    };

    const handleWardChange = (event) => {
        setSelectedWard(event.target.value);
    };

    const [owner, setOwner] = useState([]);

    const getAllOwner = async () => {
        try {
            const response = await axios.get('http://localhost:8080/users/getAllOwner', {
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

    const getAllFields = async () => {
        try {
            const response = await axios.get('http://localhost:8080/users/getAllFields', {
                headers: {
                    'Authorization': `Bearer ${user.data.token}`
                }
            })
            setFields(response.data);
        } catch (error) {
            console.error('There was an error creating the field!', error);
        }
    }

    useEffect(() => {
        getAllFields();
    }, [])

    const Currency = (value) => {
        value = value.toString().replace(/[^0-9]/g, '');
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    // const getTime = async (id) => {
    //     try {
    //         const response = await axios.get(`http://localhost:8080/users/${id}/time`, {
    //             headers: {
    //                 'Authorization': `Bearer ${user.data.token}`
    //             }
    //         })
    //         setTime(response.data);
    //         console.log(response.data);
    //     } catch (error) {
    //         console.error('There was an error creating the field!', error);
    //     }

    // }

    // const handleBookClick = (fieldId, filedsPrice) => {
    //     setSelectId(fieldId);
    //     getTime(fieldId);
    //     setTotalPrice(filedsPrice);
    //     setSelectedFieldPrice(filedsPrice);
    // };

    // useEffect(() => {
    //     getTime();
    // }, [])

    const handleTimeChange = (id) => {
        setSelectedTime((prevSelectedTimes) => {
            if (prevSelectedTimes.includes(id)) {
                return prevSelectedTimes.filter(timeId => timeId !== id);
            } else {
                return [...prevSelectedTimes, id];
            }
        });
    };

    const [totalPrice, setTotalPrice] = useState('');
    const [selectedFieldPrice, setSelectedFieldPrice] = useState(0);

    const handleClose = () => {
        setSelectedTime([]);
        setTotalPrice(0);
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

    const navigate = useNavigate();

    const handleCardClick = (ownerId) => {
        navigate(`/${ownerId}/detail-football`);
    };

    return (
        <>
            <div>
                <div className="sidebar">
                    <Sidebar />
                </div>
                <div className="container row g-3">
                    <div>
                        <h5 className="mt">Sân bóng</h5>
                        <div className="me-4 pe-4 col-md-12">
                            <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Nhập tên hay địa chỉ..."></input>
                            <datalist id="datalistOptions">
                                {name.map((item) => (
                                    <option value={item.title} />
                                ))}
                            </datalist>
                        </div>
                        <div className="row row-cols-1 row-cols-md-3 g-5">
                            <div className="col-md-6 mt">
                                <select className="form-select w" aria-label="Default select example" onChange={handleCityChange} value={selectedCity} placeholder="city">
                                    <option>Chọn tỉnh / thành phố</option>
                                    {cities.map((item, index) => (
                                        <option key={index} value={item.id}>{item.Name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-3 mt">
                                <select className="form-select" aria-label="Default select example" onChange={handleDistrictChange} value={selectedDistrict}>
                                    <option>Chọn quận / huyện</option>
                                    {districts.map((item) => (
                                        <option value={item.id}>{item.Name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-3 mt pd-45">
                                <select className="form-select" aria-label="Default select example" onChange={handleWardChange} value={selectedWard}>
                                    <option>Chọn xã</option>
                                    {wards.map((item) => (
                                        <option value={item.id}>{item.Name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row row-cols-1 row-cols-md-3 g-3">
                        {owner.map((item) => {
                            if (item.status) {
                                return (
                                    <div className="col" key={item.id}>
                                        <div className="card" style={{ maxWidth: "410px", minHeight: "400px", cursor: 'pointer' }} onClick={() => handleCardClick(item.id)}>
                                            <img src="https://www.sporta.vn/assets/default_venue_0-4c8b68154138176321e0c2cc01611084f2dbc3a9ce303946fdf68a58ef3f9acb.jpg" className="card-img-top" alt="..." />
                                            <div className="card-body" style={{ maxWidth: "380px", minHeight: "180px" }}>
                                                <h5 className="card-title">{item.name}</h5>
                                                <p className="card-text mb-0">{item.location}</p>
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
                                                <button type="button" class="btn btn-primary mt-0 pt-1 pb-1">
                                                    Thông tin
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}