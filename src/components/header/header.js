import "../../components/header/header.css";    
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
export default function Header() {
    return (
        <>
            <nav className="flex">
                <div className="logo me-5 pe-5">
                    <Link to={"/"}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM_3TfYToHgKq8riyh-_jv5n8LPbGiyIRIJg&s" className="img-header pe-5 me-5 ms-1"></img>
                    </Link>
                </div>
                <div className="menu">
                    <Link to={"/"} className="text-header me-5 ms-5 ps-5">Bảng xếp hạng</Link>
                    <Link to={"/giai-dau"} className="text-header me-5">Giải đấu</Link>
                    <Link to={"/login-management"} className="text-header me-5">Dành cho chủ sân</Link>
                    <Link to={"/san-bong"} className="text-header me-5">Địa điểm sân bóng</Link>
                </div>
                <div></div>
            </nav>
        </>
    )
}