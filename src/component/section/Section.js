import Section from '../section/Section.css';
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Link } from 'react-router-dom';
export function HeroSection() {

    return (
        <>
            <section className="hero">
                <div className="hero-content">
                    <h1>Nền tảng #1 cho người chơi bóng đá</h1>
                    <p>Lập đội tìm đối thủ, kết nối cộng đồng. Tranh hạng dễ dàng, nhận quà hấp dẫn!</p>
                    <div className="hero-buttons">
                        <Link to={'/login'} className="btn primary">Tham gia thôi</Link>
                        <a href="#learn-more" className="btn secondary">Tìm hiểu thêm →</a>
                    </div>
                </div>
                <div className="hero-image">
                    <img src="https://www.sporta.vn/assets/newui/home-bf5a4da5d10a8b2b0dc4ec93327be0e7669be12e7d87b6a778399a4c216a049f.jpeg" alt="Game information on mobile" />
                </div>
            </section>
            <section className="hero-1">
                <div className="hero-image">
                    <img src="https://www.sporta.vn/assets/app/pic1-b502033399ca0118a0ab404d2aa5566eb89f39bba692a8900cd24b482211a813.png" alt="Game information on mobile" />
                </div>
                <div className="hero-content">
                    <p className='text-warning'>Chơi bóng vui hơn</p>
                    <h1 className='content'>Một cộng đồng lành mạnh</h1>
                    <p>Kết nối với cộng đồng người chơi bóng, sân bóng quanh bạn chưa bao giờ dễ dàng và an toàn đến thế</p>
                    <p>Trang câu lạc bộ Logo, độ tuổi, xếp hạng, đánh giá uy tín cùng với lịch sử thi đấu cùng thống kê thành tích rõ ràng. Nâng cao độ chuyên nghiệp!</p>
                    <p>Cập nhật diễn biến trận đấu Ghi lại khoảng khắc cùng lịch sử ghi bàn, kiến tạo, phạm lỗi. Bình chọn cầu thủ hay nhất trận!</p>
                    <p>Giải đấu cộng đồng Giải đấu cộng đồng vì cộng đồng cho cộng đồng do cộng đồng. Tổ chức thường xuyên!</p>
                    <div className="hero-buttons">
                        <button className="btn primary">Kết nối với anh em</button>
                    </div>
                </div>
            </section>
            <footer class="text-center bg-body-tertiary">
                <div class="container pt-4">
                    <section class="mb-4">
                        <a
                            data-mdb-ripple-init
                            class="btn btn-link btn-floating btn-lg text-body m-1"
                            href="#!"
                            role="button"
                            data-mdb-ripple-color="dark"
                        ><FaFacebook /></a>

                        <a
                            data-mdb-ripple-init
                            class="btn btn-link btn-floating btn-lg text-body m-1"
                            href="#!"
                            role="button"
                            data-mdb-ripple-color="dark"
                        ><FaTwitter /></a>

                        <a
                            data-mdb-ripple-init
                            class="btn btn-link btn-floating btn-lg text-body m-1"
                            href="#!"
                            role="button"
                            data-mdb-ripple-color="dark"
                        ><FaGoogle /></a>

                        <a
                            data-mdb-ripple-init
                            class="btn btn-link btn-floating btn-lg text-body m-1"
                            href="#!"
                            role="button"
                            data-mdb-ripple-color="dark"
                        ><FaInstagramSquare /></a>

                        <a
                            data-mdb-ripple-init
                            class="btn btn-link btn-floating btn-lg text-body m-1"
                            href="#!"
                            role="button"
                            data-mdb-ripple-color="dark"
                        ><FaLinkedin /></a>
                        <a
                            data-mdb-ripple-init
                            class="btn btn-link btn-floating btn-lg text-body m-1"
                            href="#!"
                            role="button"
                            data-mdb-ripple-color="dark"
                        ><FaGithub /></a>
                    </section>
                </div>

                <div class="text-center p-3">
                    © 2020 Copyright:
                    <a class="text-body" href="/">sport</a>
                </div>
            </footer>
        </>
    );
}