import "./App.css";
import React, { useEffect, useState } from "react";
import { fetchAPI } from "./components/api";
import ImageSRC from "./images/image.png";
import { Cards, Chart, CountryPicker } from "./components";

function App() {
	const [data, setData] = useState(null);
	const [country, setCountry] = useState("");

	useEffect(() => {
		const fetcher = async () => {
			const response = await fetchAPI();
			if (response) {
				setData(response);
			}
		};
		fetcher();
	}, []);
	const handleChange = async (fetchedCountry) => {
		const data = await fetchAPI(fetchedCountry);
		if (data) {
			setData(data);
			setCountry(fetchedCountry);
		}
	};
	return (
		<div className="main-container">
			<img src={ImageSRC} className="image-corona" />
			<Cards value={data} />
			<CountryPicker handler={handleChange} />
			<Chart data={data} countryData={country} />
		</div>
	);
}

export default App;
