import "../../components/aboutweb/content.css";
import { useEffect, useState } from "react";

export default function Content() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkAuth = () => {
        return !!localStorage.getItem('currentUser');
    };

    useEffect(() => {
        setIsLoggedIn(checkAuth());
    }, []);

    return (
        <div class="container-fluid containerContent d-flex justify-content-center align-items-center">
        <div class="row content w-75 align-items-center">
            <div class="col-md-6 content-right">
                <h2 class="text-title mb-3">Nền tảng số 1 cho người chơi bóng đá</h2>
                <p class="text-content mb-4">
                    Nâng tỉ lệ lấp đầy sân mùa nắng cũng như mùa mưa. Thoải mái quản lý sân từ bất kỳ nơi nào
                </p>
                {!isLoggedIn && (
                    <a href="/login" class="btn btn-primary">Tham gia ngay</a>
                )}
            </div>
            <div class="col-md-6 content-images d-flex justify-content-end">
                <img class="img-content me-3" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaZWCpvR7Bt1KrtD9R7llmwAtmrhx5j-xHcF0Y5hFfP_lZX8u8bcX8KAQX1P-6wgNgmvA&usqp=CAU" alt="Soccer player kicking a ball" />
                <img class="img-content2" src="https://thuviendohoa.vn/upload/images/items/hinh-anh-cau-thu-bong-da-sut-vo-le-png-448.webp" alt="Football scene at night match" />
            </div>
        </div>
    </div>
    );
}
