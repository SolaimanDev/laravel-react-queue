import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import AuthUser from "../../components/AuthUser";


export default function Register() {
    const navigate = useNavigate();
    const { http } = AuthUser();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!name.trim()) {
            newErrors.name = "Name is required.";
        }
        if (!email.trim()) {
            newErrors.email = "Email is required.";
        }
        if (!password) {
            newErrors.password = "Password is required.";
        }
        if (password !== passwordConfirmation) {
            newErrors.passwordConfirmation = "Passwords do not match.";
        }
        return newErrors;
    };

    const submitForm = () => {
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        // API call to register user
        http.post('/auth/register', { name, email, password })
            .then((res) => {
               
                navigate('/login');
            })
            .catch((err) => {
                if (err.response && err.response.data) {
                    const { email, password } = err.response.data.errors || {};
                    setErrors({ email, password });
                    
                }
            });
    };

    return (
        <div className="row justify-content-center pt-5">
            <div className="col-sm-6">
                <div className="card p-4">
                    <h1 className="text-center mb-3">Register</h1>
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            id="name"
                        />
                        {errors.name && <small className="text-danger">{errors.name}</small>}
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address:</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            id="email"
                        />
                        {errors.email && <small className="text-danger">{errors.email}</small>}
                    </div>
                    <div className="form-group mt-3">
                        <label>Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            id="pwd"
                        />
                        {errors.password && <small className="text-danger">{errors.password}</small>}
                    </div>
                    <div className="form-group mt-3">
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm password"
                            value={passwordConfirmation}
                            onChange={e => setPasswordConfirmation(e.target.value)}
                            id="pwd_confirmation"
                        />
                        {errors.passwordConfirmation && <small className="text-danger">{errors.passwordConfirmation}</small>}
                    </div>
                    <button
                        type="button"
                        onClick={submitForm}
                        className="btn btn-primary mt-4"
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
}
