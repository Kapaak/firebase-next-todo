import React, { useState, useEffect } from "react";

const PopulateData = ({ user, viewData }) => {
	const [data, setData] = useState([]);
	useState(() => {
		const unsub = viewData(setData);
		return unsub;
	}, []);

	return (
		<div>
			{data.map((el, index) => (
				<div key={index} style={{ background: "lightgrey" }}>
					<p>{el.name}</p>
					<p>{el.text}</p>
				</div>
			))}
		</div>
	);
};

export default PopulateData;
