import React, { useState, useEffect } from "react";
import { fetchDailyAPI } from "../api";
import { Line } from "react-chartjs-2";
import styles from "./Chart.module.css";
const Chart = () => {
	const [dailyCases, setDailyCases] = useState([]);
	useEffect(() => {
		const fetcher = async () => {
			setDailyCases(await fetchDailyAPI());
		};
		fetcher();
	}, []);
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

	return <div className={styles.container}>{lineChart}</div>;
};

export default Chart;
