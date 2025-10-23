import React from 'react';
import Input from '../components/InputBox/Input';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSignin } from '../store/slices/user-slice';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function Login() {


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { success, isLogging } = useSelector((state) => state.user)

    console.log(success,isLogging);
    
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const Signin = () => {

        if (data.email === '' || !data.email.includes('@')) {
            toast.error('Valid email is required');
            return;
        }

        if (data.password === '' || data.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        dispatch(userSignin(data))

    };

    const { user } = useSelector((state) => state.user)

    console.log(user);

    useEffect(() => {
        if (user?.id) {
            navigate('/')
        }
        // console.log(isLogging);

   
    }, [user, navigate, ])


    return (
        <section className="min-vh-100 d-flex align-items-center  py-5">
            <div className="container">
                <div className="row align-items-center">
                    {/* Image Section */}
                    <div className="col-lg-5 mb-5 mb-lg-0" data-aos="fade-right" data-aos-delay="200">
                        <div className="position-relative">
                            <img
                                src="/images/hero-slider-1.jpg"
                                alt="Travel"
                                className="img-fluid rounded-3 shadow-lg"
                                style={{ minHeight: '80vh', objectFit: 'cover' }}
                            />
                            <div className="position-absolute top-0 start-0   rounded-3" style={{ background: 'rgba(0, 0, 0, 0.2)' }}></div>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="col-lg-7" data-aos="fade-left" data-aos-delay="200">
                        <h2 className="display-4 fw-bold text-dark mb-4">Welcome to Travelista</h2>
                        <p className="lead text-center text-dark opacity-75 mb-4">
                           Start your journey with us
                        </p>

                        <div className="card shadow-lg border-0 rounded-3">
                            <div className="card-body p-5">
                                <h4 className="fw-bold text-center mb-4">Login into Your Account</h4>
                                <p className="text-center text-muted mb-4">
                                    Sign in to start planning your dream trip today
                                </p>

                                <div>
                                    <div className="my-3">
                                        <Input
                                            labelClass="form-label fw-semibold text-dark"
                                            labelText="Email Address"
                                            type="email"
                                            inputClass="form-control rounded-3"
                                            onchange={(e) => setData({ ...data, email: e.target.value })}
                                        />

                                    </div>
                                    <div className="my-3">
                                        <Input
                                            labelClass="form-label fw-semibold text-dark"
                                            labelText="Password"
                                            type="password"
                                            inputClass="form-control rounded-3"
                                            onchange={(e) => setData({ ...data, password: e.target.value })}
                                        />

                                    </div>

                                    <button
                                        onClick={() => Signin()}
                                        type="button"
                                        className="btn btn-primary btn-lg w-100 rounded-3"
                                    >
                                        Sign In
                                    </button>
                                    <p className='d-flex bg justify-content-end mt-2'>
                                        <Link className='btn btn-primary btn-xs  rounded-3' to={'/signup'}>Create Account</Link>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* <p className="text-dark opacity-75 mt-4">
                            Discover the best <strong>flights</strong>, <strong>hotels</strong>, and{' '}
                            <strong>visiting areas</strong> in your destination. We help you plan
                            stress-free and exciting trips, all in one place!
                        </p>
                        <ul className="list-unstyled mt-3 text-dark opacity-75">
                            <li className="d-flex align-items-center mb-2">
                                <i className="bi bi-check-circle-fill text-primary me-2"></i>
                                Smart flight & hotel search
                            </li>
                            <li className="d-flex align-items-center mb-2">
                                <i className="bi bi-check-circle-fill text-primary me-2"></i>
                                Suggested attractions & activities
                            </li>
                            <li className="d-flex align-items-center">
                                <i className="bi bi-check-circle-fill text-primary me-2"></i>
                                Save and share your itineraries
                            </li>
                        </ul> */}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;