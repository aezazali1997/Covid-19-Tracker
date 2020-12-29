const url = "https://covid19.mathdro.id/api";
export const fetchAPI = async (country) => {
	let changleableURL = url,
		fetchedData,
		confirmed,
		deaths,
		recovered,
		lastUpdate;
	if (country) {
		changleableURL = `${url}/countries/${country}`;
	}
	try {
		await fetch(changleableURL)
			.then((res) => res.json())
			.then((data) => (fetchedData = data));
		confirmed = fetchedData.confirmed;
		deaths = fetchedData.deaths;
		recovered = fetchedData.recovered;
		lastUpdate = fetchedData.lastUpdate;
		return { confirmed, recovered, deaths, lastUpdate };
	} catch (error) {
		console.log(error);
	}
};
export const fetchDailyAPI = async () => {
	try {
		let fetchedData;
		await fetch(`${url}/daily`)
			.then((res) => res.json())
			.then((data) => (fetchedData = data));
		const modifiedData = fetchedData.map((response) => ({
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
		let countries;
		await fetch(`${url}/countries`)
			.then((res) => res.json())
			.then((data) => (countries = data.countries));
		return countries.map((country) => country.name);
	} catch (error) {
		console.log(error);
	}
};
