import React, { useState } from "react";
import { Button, Input, Card, Typography } from "@material-tailwind/react";
import { Navigate, useNavigate, NavLink } from "react-router-dom";
import { authAPI } from "../../services/api";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        company: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await authAPI.register(formData);
            navigate("/Admin-dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="w-full h-screen flex">
            {/* Left Side - Branding */}
            <div className="w-1/2 flex flex-col justify-center items-center bg-black text-white p-10">
                <Typography variant="h3" className="font-bold">Join Us Today!</Typography>
                <Typography variant="paragraph" className="text-gray-400 mt-3">
                    Sign up and start managing your tasks more efficiently.
                </Typography>
            </div>

            {/* Right Side - Register Form */}
            <div className="w-1/2 flex justify-center items-center bg-gray-900">
                <Card className="w-full max-w-sm p-8 shadow-lg rounded-xl bg-gray-800 text-white">
                    <Typography variant="h4" className="text-center text-gray-100">
                        Register
                    </Typography>

                    {error && (
                        <div className="mt-4 p-3 bg-red-500 text-white rounded-md text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div>
                            <Input
                                type="text"
                                name="name"
                                label="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="text-white"
                            />
                        </div>

                        <div>
                            <Input
                                type="email"
                                name="email"
                                label="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="text-white"
                            />
                        </div>

                        <div>
                            <Input
                                type="password"
                                name="password"
                                label="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="text-white"
                            />
                        </div>

                        <div>
                            <Input
                                type="text"
                                name="company"
                                label="Company Name"
                                value={formData.company}
                                onChange={handleChange}
                                required
                                className="text-white"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            disabled={loading}
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <Typography variant="small" className="text-gray-400">
                            Already have an account?{" "}
                            <NavLink to="/login" className="text-blue-400 hover:text-blue-300">
                                Sign In
                            </NavLink>
                        </Typography>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Register;
