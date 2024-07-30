import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IoPencil } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import Sidebar from './homeOwner';
import '../../components/owner/ManageFields.css';
export default function ManageFileds() {

    const items = [
        { text: 'Dashboard', path: '/home-owner' },
        { text: 'Thông tin', path: '/thong-tin' },
        { text: 'Lịch đặt', path: '/lich-dat' },
        { text: 'Quản lý sân bóng', path: '/quan-ly-san-bong' }
    ];

    const location = useLocation();
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [wards, setWards] = useState([]);
    const [selectedWard, setSelectedWard] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [typeFields, setTypeFields] = useState('');
    const [openTime, setOpenTime] = useState('');
    const [closeTime, setCloseTime] = useState('');
    const [description, setDescription] = useState('');
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const [show, setShow] = useState(true);
    const [content, setContent] = useState([]);
    const [time, setTime] = useState([]);
    const [selectedTimes, setSelectedTimes] = useState([]);
    // console.log(user);
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
    const formattedPrice = price.replace(/[^0-9]/g, '');

    const handleTimeChange = (timeId) => {
        setSelectedTimes(prevSelectedTimes => {
            if (prevSelectedTimes.includes(timeId)) {
                return prevSelectedTimes.filter(id => id !== timeId);
            } else {
                return [...prevSelectedTimes, timeId];
            }
        });
    };

    const handleSubmit = async () => {
        const data = {
            name,
            price: formattedPrice,
            typeFields,
            openTime,
            closeTime,
            description,
            location: `${selectedCity}, ${selectedDistrict}, ${selectedWard}`,
            user: {
                id: user.data.id
            },
            timeFields: selectedTimes.map(id => ({ id }))
        };
        try {
            const response = await axios.post('http://localhost:8080/owner/createFields', data, {
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
        setShow(false);
    };

    const getAll = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/owner/${user.data.id}/getAllFields`, {
                headers: {
                    'Authorization': `Bearer ${user.data.token}`
                }
            });
            setContent(response.data);
            console.log(content);
        } catch (error) {
            console.error('There was an error creating the field!', error);
        }
    };

    useEffect(() => {
        getAll();
    }, []);

    const getAllTimeFields = async () => {
        try {
            const response = await axios.get('http://localhost:8080/owner/time', {
                headers: {
                    'Authorization': `Bearer ${user.data.token}`
                }
            })
            setTime(response.data);
        } catch (error) {
            console.error('There was an error creating the field!', error);
        }
    }

    useEffect(() => {
        getAllTimeFields();
    }, [])

    const handleStatusChange = async (id) => {
        const updatedContent = content.map((item) =>
            item.id === id ? { ...item, status: !item.status } : item
        );
        setContent(updatedContent);
        try {
            const field = content.find(item => item.id === id);
            if (field) {
                const newStatus = !field.status;
                await axios.put(`http://localhost:8080/owner/${id}/status?status=${newStatus}`, {

                }, {
                    headers: {
                        'Authorization': `Bearer ${user.data.token}`
                    }
                });
                setContent(updatedContent);
            }
        } catch (error) {
            console.error('There was an error updating the field status!', error);
        }
    };

    const formatCurrency = (value) => {
        value = value.replace(/[^0-9]/g, '');
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    const handlePriceChange = (e) => {
        const formattedPrice = formatCurrency(e.target.value);
        setPrice(formattedPrice);
    }
    const Currency = (value) => {
        value = value.toString().replace(/[^0-9]/g, '');
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    return (
        <>
            <div className='d-flex'>
                <Sidebar />
                <div className='container'>
                    <div className='mt-5' style={{ float: "left" }}>
                        <h3>Quản lý sân bóng</h3>
                    </div>
                    <div className='content' style={{ float: "right" }}>
                        <div>
                            <button type="button" class="btn btn-primary mt-0" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Thêm sân bóng
                            </button>
                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" show={show} onHide={handleClose}>
                                <form onSubmit={handleSubmit}>
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm sân bóng đá</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="row">
                                                    <div class="col">
                                                        <input type="text" class="form-control"
                                                            placeholder="Tên sân bóng" aria-label="ten san"
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}
                                                        />
                                                    </div>
                                                    <div class="col">
                                                        <input type="text" class="form-control"
                                                            placeholder="Giá sân" aria-label="gia san"
                                                            value={price ? `${price}` : ""}
                                                            onChange={handlePriceChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div class="row mt-3">
                                                    <div class="col">
                                                        <select class="form-select" aria-label="Default select example"
                                                            value={typeFields} onChange={(e) => setTypeFields(e.target.value)}>
                                                            <option selected>Loại sân</option>
                                                            <option value="5">Sân 5</option>
                                                            <option value="7">Sân 7</option>
                                                            <option value="11">Sân 11</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="row mt-3">
                                                    <div class="col">
                                                        <div class="input-group mb-3">
                                                            <span class="input-group-text" id="inputGroup-sizing-default">Giờ mở cửa</span>
                                                            <input type="time" class="form-control" aria-label="Sizing example input"
                                                                aria-describedby="inputGroup-sizing-default"
                                                                value={openTime}
                                                                onChange={(e) => setOpenTime(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="col">
                                                        <div class="input-group mb-3">
                                                            <span class="input-group-text" id="inputGroup-sizing-default">Giờ đóng cửa</span>
                                                            <input type="time" class="form-control" aria-label="Sizing example input"
                                                                aria-describedby="inputGroup-sizing-default"
                                                                value={closeTime}
                                                                onChange={(e) => setCloseTime(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col">
                                                        <select class="form-select" aria-label="Default select example" value={selectedCity} onChange={handleCityChange}>
                                                            <option selected>Thành phố</option>
                                                            {cities.map((item, index) => (
                                                                <option key={index} value={item.id}>{item.Name}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div class="col">
                                                        <select class="form-select" aria-label="Default select example" value={selectedDistrict} onChange={handleDistrictChange}>
                                                            <option selected>Huyện</option>
                                                            {districts.map((item, index) => (
                                                                <option key={index} value={item.id}>{item.Name}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div class="col">
                                                        <select class="form-select" aria-label="Default select example" value={selectedWard} onChange={handleWardChange}>
                                                            <option selected>Xã</option>
                                                            {wards.map((item, index) => (
                                                                <option key={index} value={item.id}>{item.Name}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="row mt-2">
                                                    <label>Chọn khung giờ của sân</label>
                                                    {time.map((timeSlot) => {
                                                        return (
                                                            <div className="col" key={timeSlot.id}>
                                                                <div className="form-check">
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="checkbox"
                                                                        id={`flexCheckDefault${timeSlot.id}`}
                                                                        value={timeSlot.id}
                                                                        onChange={() => handleTimeChange(timeSlot.id)}
                                                                    />
                                                                    <label className="form-check-label" htmlFor={`flexCheckDefault${timeSlot.id}`}>
                                                                        {timeSlot.time}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                <div class="row mt-3">
                                                    <div class="col">
                                                        <textarea type="text" class="form-control" placeholder="Mô tả sân..."
                                                            aria-label="mo ta"
                                                            value={description}
                                                            onChange={(e) => setDescription(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                                                <button type="button" class="btn btn-primary" onClick={handleSubmit}>Thêm sân</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                    <table class="table table-striped table-centered mb-0">
                        <thead>
                            <tr>
                                <th>Tên sân</th>
                                <th>Giá tiền</th>
                                <th>Loại sân</th>
                                <th>Hành động</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {content.map((item) => {
                                return (
                                    <>
                                        <tr>
                                            <td class="table-user">
                                                {/* <img src="" alt="table-user" class="me-2 rounded-circle" /> */}
                                                {item.name}
                                            </td>
                                            <td>{Currency(item.price)} đ</td>
                                            <td>Sân {item.typeFields}</td>
                                            <td class="table-action" style={{ justifyContent: 'center' }}>
                                                <Link className='me-1' style={{ cursor: 'pointer', color: 'black' }}>
                                                    <IoPencil />
                                                </Link>
                                                <Link style={{ cursor: 'pointer', color: 'blue' }}>
                                                    <FaEye />
                                                </Link>
                                            </td>
                                            <td>
                                                <div className="form-check form-switch">
                                                    <input
                                                        className="form-check-input"
                                                        style={{ cursor: 'pointer' }}
                                                        type="checkbox"
                                                        role="switch"
                                                        id={`flexSwitchCheckChecked-${item.id}`}
                                                        checked={item.status}
                                                        onChange={() => handleStatusChange(item.id)}
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor={`flexSwitchCheckChecked-${item.id}`}
                                                        data-on-label="Yes"
                                                        data-off-label="No"
                                                    ></label>
                                                </div>
                                            </td>
                                        </tr>
                                    </>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}