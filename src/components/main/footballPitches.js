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
    const [valueSearch, setValueSearch] = useState('');
    const [typeFields, setTypeFields] = useState('');


    useEffect(() => {
        const getAllData = async () => {
            const res = await axios.get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json');
            setCities(res.data);
        }
        getAllData();
    }, []);

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
            const response = await axios.get('http://localhost:8080/users/getAllOwner',);
            setOwner(response.data);
        } catch (error) {
            console.error('There was an error creating the field!', error);
        }
    };

    useEffect(() => {
        getAllOwner();
    }, []);

    const getAllFields = async () => {
        try {
            const response = await axios.get('http://localhost:8080/users/getAllFields', {
                headers: {
                    'Authorization': `Bearer ${user.data.token}`
                }
            });
            setFields(response.data);
        } catch (error) {
            console.error('There was an error creating the field!', error);
        }
    };

    useEffect(() => {
        getAllFields();
    }, []);

    const navigate = useNavigate();

    const handleCardClick = (ownerId) => {
        navigate(`/${ownerId}/detail-football`);
    };

    const handleSearch = (e) => {
        setValueSearch(e.target.value);
    }

    const handleSubmitSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8080/users/search?name=${e.target.value}&location=${selectedCity}&typeFields=${typeFields}`);
            console.log(response.data)
            setValueSearch(response.data);
        } catch (error) {
            console.error('Error search results:', error);
        }
    };

    const handleSelect = (e) => {
        setSelectedCity(e.target.value);
        handleSubmiSelect(e.target.value);
    }

    const handleSubmiSelect = async (locationSelect, event) => {
        setSelectedCity(event.target.value);
        setSelectedDistrict('');
        setSelectedWard('');
        const selectedCity = cities.find((city) => city.Name === event.target.value);
        setDistricts(selectedCity?.Districts || []);
        try {
            const response = await axios.get(`http://localhost:8080/users/search?name=${valueSearch}&location=${locationSelect}&typeFields=${typeFields}`);
            console.log(response.data)
            setSelectedCity(response.data);
        } catch (error) {
            console.error('Error search results:', error);
        }
    };

    return (
        <>
            <div className="d-flex">
                <Sidebar />
                <div className="container-fluid">
                    <div style={{ marginTop: '3.5rem' }}>
                        <h5 className="mt-3 mb-0">Sân bóng</h5>
                        <div className="mb-2 mt-2">
                            <form onSubmit={handleSubmitSearch}>
                                <input className="form-control" list="datalistOptions"
                                    id="exampleDataList" placeholder="Nhập tên..."
                                    value={valueSearch}
                                    onChange={handleSearch}
                                />
                                <datalist id="datalistOptions">
                                    {name.map((item) => (
                                        <option key={item.title} value={item.title} />
                                    ))}
                                </datalist>
                            </form>
                        </div>
                        <div className="row g-3">
                            <div className="col-12 col-md-6">
                                <select className="form-select" aria-label="Default select example" onChange={handleSelect} value={selectedCity} placeholder="city">
                                    <option>Chọn tỉnh / thành phố</option>
                                    {cities.map((item, index) => (
                                        <option key={index} value={item.Name}>{item.Name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-12 col-md-3">
                                <select className="form-select" aria-label="Default select example" onChange={handleDistrictChange} value={selectedDistrict}>
                                    <option>Chọn quận / huyện</option>
                                    {districts.map((item) => (
                                        <option key={item.Name} value={item.Name}>{item.Name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-12 col-md-3">
                                <select className="form-select" aria-label="Default select example" onChange={handleWardChange} value={selectedWard}>
                                    <option>Chọn xã</option>
                                    {wards.map((item) => (
                                        <option key={item.Name} value={item.Name}>{item.Name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row row-cols-1 row-cols-md-3 g-3 pt-3">
                        {owner.map((item) => {
                            if (item.status) {
                                return (
                                    <div className="col" key={item.id}>
                                        <div className="card" style={{ maxWidth: "100%", minHeight: "400px", cursor: 'pointer' }} onClick={() => handleCardClick(item.id)}>
                                            <img src="https://www.sporta.vn/assets/default_venue_0-4c8b68154138176321e0c2cc01611084f2dbc3a9ce303946fdf68a58ef3f9acb.jpg" className="card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h5 className="card-title">{item.name}</h5>
                                                <p className="card-text">{item.location}</p>
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
                                                <button type="button" className="btn btn-primary mt-2 pt-1 pb-1">
                                                    Thông tin
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
