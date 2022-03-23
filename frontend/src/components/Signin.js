import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../css/Signin.css";

const Login = () => {
	const navigate = useNavigate();
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
	
	

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:5000/users/login";
			const { data: res } = await axios.post(url, data);
			// console.log(res.data);
			localStorage.setItem("token", JSON.stringify(res.data));
			const TokenInfo = JSON.parse(localStorage.getItem("token"));
			// console.log(TokenInfo[0])
			if(res.data[0] == "Teacher") {
				navigate("/teacherPage");}
				else if (res.data[0] == "Admin") {
					navigate("/adminPage");}
					else if (res.data[0] == "Student") {
						navigate("/studentPage");}
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className="login_container">
			<div className="login_form_container">
				<div className="left">
					<form className="form_container" onSubmit={handleSubmit}>
						<h1 className="login-title">Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className="input"
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className="input"
						/>
						{error && <div className="error_msg">{error}</div>}
						<button type="submit" className="green_btn">
							Sign In
						</button>
					</form>
				</div>
				<div className="right">
					<h1>New Here ?</h1>
					<Link to="/register">
						<button type="button" className="white_btn">
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;