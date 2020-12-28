import axios from "axios";
const url = "https://covid19.mathdro.id/api";
export const fetchAPI = async (country) => {
	let changleableURL = url;
	if (country) {
		changleableURL = `${url}/countries/${country}`;
	}
	try {
		const {
			data: { confirmed, recovered, deaths, lastUpdate },
		} = await axios.get(changleableURL);
		return { confirmed, recovered, deaths, lastUpdate };
	} catch (error) {
		console.log(error);
	}
};
export const fetchDailyAPI = async () => {
	try {
		const { data } = await axios.get(`${url}/daily`);
		const modifiedData = data.map((response) => ({
			confirmed: response.confirmed.total,
			deaths: response.deaths.total,
			date: response.reportDate,
		}));
		return modifiedData;
	} catch (error) {
		console.log(error);
	}
};
export const fetchCountries = async () => {
	try {
		const {
			data: { countries },
		} = await axios.get(`${url}/countries`);
		return countries.map((country) => country.name);
	} catch (error) {
		console.log(error);
	}
};
