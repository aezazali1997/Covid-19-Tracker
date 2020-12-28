import "./App.css";
import React, { useEffect, useState } from "react";
import { fetchAPI } from "./components/api";
import { Cards, Chart, CountryPicker } from "./components";

function App() {
	const [data, setData] = useState(null);
	const [country, setCountry] = useState("");

	useEffect(() => {
		const fetcher = async () => {
			const response = await fetchAPI();
			setData(response);
		};
		fetcher();
	}, []);
	const handleChange = async (fetchedCountry) => {
		const response = await fetchAPI(fetchedCountry);
		console.log(response);
	};
	return (
		<div className="main-container">
			<Cards value={data} />
			<CountryPicker handler={handleChange} />
			<Chart />
		</div>
	);
}

export default App;
