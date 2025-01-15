import { useState } from "react";
import AuthUser from "../../components/AuthUser";


export default function Login() {
    const { http, setToken } = AuthUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!email) {
            newErrors.email = "Email is required.";
        }
        if (!password) {
            newErrors.password = "Password is required.";
        }
        return newErrors;
    };

    const submitForm = () => {
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        // API call
        http.post('/auth/login', { email, password })
            .then((res) => {
                setToken(res.data.user, res.data.access_token);
                console.log(res.data);
                
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
                    <h1 className="text-center mb-3">Login</h1>
                    <div className="form-group">
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
                    <button
                        type="button"
                        onClick={submitForm}
                        className="btn btn-primary mt-4"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}
