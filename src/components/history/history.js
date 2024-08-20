import Sidebar from "../sidebar/sidebar";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HistoryUser() {

    const list = [
        { id: 1, nane: 'san bong thanh do', price: '500.000', type: '7', time: '19:00:00' },
        { id: 2, nane: 'san bong thanh do2', price: '500.000', type: '7', time: '19:00:00' },
        { id: 3, nane: 'san bong thanh do3', price: '500.000', type: '7', time: '19:00:00' },
        { id: 4, nane: 'san bong thanh do4', price: '500.000', type: '7', time: '19:00:00' },
        { id: 5, nane: 'san bong thanh do5', price: '500.000', type: '7', time: '19:00:00' }
    ]
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const [showErr, setShowErr] = useState(false);
    const [booking, setBooking] = useState([]);
    useEffect(() => {
        const getBookingUser = async () => {
            const response = await axios.get(`http://localhost:8080/users/${user.data.id}/getBooking`);
            setBooking(response.data);
            if (response.data === null) {
                setShowErr(true);
            } else {
                setShowErr(false);
            }
        }
        getBookingUser();
    }, [])

    return (
        <>
            <div className="d-flex">
                <Sidebar />
                <div className="container-fluid">
                    <div style={{ marginTop: '3.5rem' }}>
                        <h5 className="mt-3 mb-0">Lịch sử đặt sân</h5>


                    </div>

                    <div className="col row row-cols-1 row-cols-md-3 g-3 pt-3" >
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Tên sân</th>
                                    <th scope="col">Giá</th>
                                    <th scope="col">Thể loại</th>
                                    <th scope="col">Giờ đặt</th>
                                </tr>
                            </thead>
                            <tbody>
                                {booking.map((item => {
                                    return (
                                        <tr>
                                            <th scope="row">{item.id}</th>
                                            <td>{item.footballFields.name}</td>
                                            <td>{item.totalPrice} đ</td>
                                            <td>Sân {item.footballFields.typeFields}</td>
                                            <td>{item.bookingTime}</td>
                                        </tr>
                                    )
                                }))}
                                {showErr && <p>no content</p>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}