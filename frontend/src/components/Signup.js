import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "../css/Signup.css";


const Signup = () => {
	const [data, setData] = useState({
		fullname: "",
		email: "",
		photo:"",
		age: "",
		password: "",
		userType: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:5000/users/register";
			const { data: res } = await axios.post(url, data);
			navigate("/login");
			console.log(res.message);
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
		<div className="signup_container">
			<div className="signup_form_container">
				<div className="right">
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className="white_btn">
							Sign in
						</button>
					</Link>
				</div>
				<div className="left">
					<form className="form_container" onSubmit={handleSubmit}>
						<h1 className="register-title"> Create Account</h1>
						<input
							type="text"
							placeholder="Full Name"
							name="fullname"
							onChange={handleChange}
							value={data.fullname}
							required
							className="input"
						/>
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
							type="text"
							placeholder="Photo"
							name="photo"
							onChange={handleChange}
							value={data.photo}
							className="input"
						/>
						<input
							type="number"
							placeholder="Age"
							name="age"
							onChange={handleChange}
							value={data.age}
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

						<select className="input" name="userType" onChange={handleChange} value={data.userType}>
              				<option value="">User Type</option>
              				<option value="Student">Student</option>
              				<option value="Teacher">Teacher</option>
							{/* <option value="Trainer">Teacher</option> */}
            			</select>

						{error && <div className="error_msg">{error}</div>}
						<button type="submit" className="green_btn">
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;