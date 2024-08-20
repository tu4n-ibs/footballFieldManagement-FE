import { Link } from "react-router-dom";
import header from '../header/header.css';
import { HeroSection } from "../section/Section";
export function Header() {
    return (
        <>
            <header className="header">
                <div className="logo">
                    <Link to={"/"}>
                    <img src="https://www.sporta.vn/assets/logo_cam-704c8f886d8a8fe0ac8c33efadb66891118c0d429807d16607589868a5482d1d.svg" alt="Logo" />
                    </Link>
                </div>
                <nav className="navigation">
                    <ul>
                        <li><a href="/cong-dong">Cộng đồng</a></li>
                        <li><a href="/bang-xep-hang">Bảng xếp hạng</a></li>
                        <li><a href="/giai-dau">Giải đấu</a></li>
                        <li><a href="/login-management">Dành cho chủ sân</a></li>
                        <li><a href="/san-bong">Địa điểm sân bóng</a></li>
                    </ul>
                </nav>
                <div className="app-download">
                    <a href="#download">Tải ứng dụng →</a>
                </div>
            </header>
        </>
    );
}