import React, { useState, useEffect } from "react";
import { fetchDailyAPI } from "../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";
const Chart = ({ data, countryData }) => {
	const [dailyCases, setDailyCases] = useState([]);
	useEffect(() => {
		const fetcher = async () => {
			setDailyCases(await fetchDailyAPI());
		};
		fetcher();
	}, []);
	let confirmed, recovered, deaths, barChart;
	if (!(data === null)) {
		confirmed = data.confirmed;
		recovered = data.recovered;
		deaths = data.deaths;

		barChart = confirmed ? (
			<Bar
				data={{
					labels: ["infected", "Recovery", "Deaths"],
					datasets: [
						{
							label: "People",
							backgroundColor: [
								"rgba(0,0,255,.5)",
								"rgba(0,255,0,.5)",
								"rgba(255,0,0,.5)",
							],
							data: [confirmed.value, recovered.value, deaths.value],
						},
					],
				}}
				options={{
					legend: { display: false },
					title: { display: true, text: `Current state in ${countryData}` },
				}}
			/>
		) : null;
	}
	const lineChart = dailyCases.length ? (
		<Line
			data={{
				labels: dailyCases.map(({ date }) => date),
				datasets: [
					{
						data: dailyCases.map(({ confirmed }) => confirmed),
						label: "Infected",
						borderColor: "#3333ff",
						fill: true,
					},
					{
						data: dailyCases.map(({ deaths }) => deaths),
						label: "Deaths",
						borderColor: "red",
						backgroundColor: "rgba(255,0,0,.5)",
						fill: true,
					},
				],
			}}
		/>
	) : (
		console.log("loading...")
	);

	return (
		<div className={styles.container}>{countryData ? barChart : lineChart}</div>
	);
};

export default Chart;
