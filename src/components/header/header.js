import "../../components/header/header.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";

export default function Header() {

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light p-4">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM_3TfYToHgKq8riyh-_jv5n8LPbGiyIRIJg&s" class="img-header" alt="Logo" />
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link text-header" href="/">Bảng xếp hạng</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-header" href="/giai-dau">Giải đấu</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-header" href="/login-management">Dành cho chủ sân</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-header" href="/san-bong">Địa điểm sân bóng</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
