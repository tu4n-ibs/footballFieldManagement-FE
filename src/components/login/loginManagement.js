import { Link, useNavigate } from 'react-router-dom';
import '../../components/login/login.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function LoginManagement() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [local, setLocal] = useState('')

    useEffect(() => {
        const storedLocation = localStorage.getItem('currentLocation');
        try {
            const parsedLocation = JSON.parse(storedLocation);
            setLocal(parsedLocation)
        } catch (error) {
            console.error(error);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/login', { email, password });

            if (response.data.code === "200") {
                localStorage.setItem("currentUser", JSON.stringify(response.data))
                navigate('/home-owner');
            } else {
                alert('Login failed: ' + response.data.message);
            }
        } catch (error) {
            console.error('There was an error logging in:', error);
            alert('An error occurred. Please try again.');
        }
    };
    return (
        <>
            <div className='login template d-flex justify-content-center align-items-center vh-100'>
                <div className='form_container p-5 rounded bg-white'>
                    <form onSubmit={handleLogin}>
                        <h3 className='text-center mb-4'>Login Management</h3>
                        <div className='mb-2'>
                            <div class="input-group mb-3">
                                <input type="email" className="form-control"
                                    placeholder="Email" aria-label="Email"
                                    aria-describedby="basic-addon1"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='mb-2'>
                            <div class="input-group mb-3">
                                <input type="password" className="form-control"
                                    placeholder="Password" aria-label="Password"
                                    aria-describedby="basic-addon1"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>
                        <div className='d-grid'>
                            <button className='btn btn-primary'>Login</button>
                        </div>
                        <p className='mt-3 text-center'>
                            You haven't account?<Link to={"/register-management"} className='ms-1'>Register</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}