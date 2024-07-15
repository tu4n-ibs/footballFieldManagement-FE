import { Link, useNavigate } from 'react-router-dom';
import "../../components/register/register.css";
import { useState } from 'react';
import axios from 'axios';
export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/register', { email, password , name});

            if (response.status == 200) {
                navigate('/login');
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
            <div className='register template d-flex justify-content-center align-items-center vh-100'>
                <div className='form_container p-5 rounded bg-white'>
                    <form onSubmit={handleRegister}>
                        <h3 className='text-center mb-4'>Register</h3>
                        <div className='mb-2'>
                            <div class="input-group mb-3">
                                <input type="text" className="form-control"
                                    placeholder="Name" aria-label="Name"
                                    aria-describedby="basic-addon1"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} />
                            </div>
                        </div>
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
                            <button className='btn btn-primary'>Register</button>
                        </div>
                        <p className='mt-3 text-center'>
                            You have account?<Link to={"/login"} className='ms-1'>Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}