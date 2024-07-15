import { Link } from "react-router-dom";
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
        console.log(isLoggedIn);
    }, []);

    return (
        <>
            <div className="containerContent">
                <div className="content">
                    <div className="content-right">
                        <div>
                            <h2 className="text-title">Nền tảng số 1 cho người chơi bóng đá</h2>
                            <span className="text-content">Nâng tỉ lệ lấp đầy sân mùa nắng cũng như mùa mưa. Thoải mái quản lý sân từ bất kỳ nơi nào</span>
                        </div>
                        {!isLoggedIn && (
                            <Link to={"/login"} className="btn btn-primary">Tham gia ngay</Link>
                        )}
                    </div>
                    <div>
                        <img className="img-content" src="https://png.pngtree.com/background/20231124/original/pngtree-silhouette-of-a-caucasian-male-soccer-goalkeeper-kicking-a-ball-photo-picture-image_6551338.jpg" alt="Soccer player kicking a ball" />
                        <img className="img-content2" src="https://png.pngtree.com/png-vector/20240506/ourmid/pngtree-football-scene-at-night-match-with-player-kicking-the-ball-power-png-image_12374737.png" alt="Football scene at night match" />
                    </div>
                </div>
            </div>
        </>
    );
}