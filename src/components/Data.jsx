import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/data.css";
const Data = () => {
	const [data, setData] = useState([]);
	const getdata = () => {
		axios("https://jsonplaceholder.typicode.com/users").then((data) => {
			setData(data.data);
		});
	};
	useEffect(() => {
		getdata();
	}, []);

	const [phase, setPhase] = useState("");

	let finalObj = {};
	const flattenObj = (obj, parent) => {
		for (let ele in obj) {
			let newParent = parent + ele;
			let val = obj[ele];
			if (typeof val === "object") {

				flattenObj(obj[ele], newParent + " - ");
			} else {
				finalObj[newParent] = val;
			}
		}
		return finalObj;
	};

	return (
		<>
			<div className="main">
				{data.map((item, ind) => (
					<div
						className="content"
						key={ind}>
						<div>
							{item.id % 2 == 0 ? (
								<span className="listSpan">
									<li>Name: {item.name}</li>
									<li>UserName: {item.username}</li>
									<li>Email: {item.email}</li>
								</span>
							) : (
								<span className="listSpan">I am Odd</span>
							)}
						</div>

						<div className="address">
							<span className="adKeys">
								{Object.keys(flattenObj(item.address, "")).map((item, ind) => (
									<span key={ind}>{item}</span>
								))}
							</span>
							<span className="adVal">
								{Object.values(flattenObj(item.address, "")).map(
									(item, ind) => (
										<span key={ind}>{item}</span>
									)
								)}
							</span>
						</div>
						<div>
							<span className="email">
								{item.email.slice(-4) == ".biz" ? item.email : ""}
							</span>
						</div>
						<div>
							<span className="cityDetails">
								{item.address.city == "Aliyaview" ||
								item.address.city == "Howemouth" ||
								item.address.city == "Gwenborough" ? (
									<span
										onMouseEnter={() =>
											setPhase(
												`The Zipcode and Geo of cityname ${item.address.city} is ${item.address.zipcode} and lat ${item.address.geo.lat}, lang ${item.address.geo.lng}`
											)
										}
										onMouseLeave={() =>
											setPhase(
												`The Zipcode and Geo of cityname ${item.address.city} is ${item.address.zipcode} and lat ${item.address.geo.lat}, lang ${item.address.geo.lng}`.substring(
													0,
													16
												) + "...."
											)
										}
										key={ind}>
										{phase
											? phase
											: `The Zipcode and Geo of cityname ${item.address.city} is ${item.address.zipcode} and lat ${item.address.geo.lat}, lang ${item.address.geo.lng}`.substring(
													0,
													16
											  ) + "...."}
									</span>
								) : (
									""
								)}
							</span>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default Data;
