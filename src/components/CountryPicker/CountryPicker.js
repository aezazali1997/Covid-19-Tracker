import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import styles from "./CountryPicker.module.css";
import { fetchCountries } from "../api";
const CountryPicker = ({ handler }) => {
	const [countries, setCountries] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			setCountries(await fetchCountries());
		};
		fetchData();
	}, [fetchCountries]);
	return (
		<FormControl className={styles.formControl}>
			<NativeSelect
				onChange={(e) => {
					handler(e.target.value);
				}}
			>
				<option value="">Global</option>
				{countries.map((country, i) => (
					<option key={i} value={country}>
						{country}
					</option>
				))}
			</NativeSelect>
		</FormControl>
	);
};

export default CountryPicker;
