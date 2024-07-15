import Sidebar from "../sidebar/sidebar";
export default function Tournaments() {
    return (
        <>
            <div>
                <div className="sidebar">
                    <Sidebar />
                </div>

                <div className="container row g-3">
                    <h5 className="mt mb-0">Giải đấu</h5>
                    <div className="row row-cols-1 row-cols-md-3 g-3 mt-0">
                        <div className="col">
                            <div className="card">
                                <img src="https://d82bjlqmetw03.cloudfront.net/uploads/production/season_league/cover/2/medium_47b5be04-0431-4bd9-b03c-65be7f4a3c91.jpeg?updatedAt=1717505135" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                </div>
                                <p className="card-text mb-1">
                                    <button className="btn btn-primary pt-1 mt-0 pb-1 mb-3 ms-3">Xem Thêm</button>
                                </p>    
                            </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                <img src="https://d82bjlqmetw03.cloudfront.net/uploads/production/season_league/cover/2/medium_47b5be04-0431-4bd9-b03c-65be7f4a3c91.jpeg?updatedAt=1717505135" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                <img src="https://d82bjlqmetw03.cloudfront.net/uploads/production/season_league/cover/2/medium_47b5be04-0431-4bd9-b03c-65be7f4a3c91.jpeg?updatedAt=1717505135" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}