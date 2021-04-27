import React, { useState, useEffect } from "react";

const Form = ({ user, submitData }) => {
	const { uid, displayName } = user;
	const [inputText, setInputText] = useState("");
	const takeData = e => {
		e.preventDefault();
		const newData = { uid, name: displayName, text: inputText };
		submitData(newData);
		setInputText("");
	};

	return (
		<form onSubmit={e => takeData(e)}>
			<input
				type="text"
				value={inputText}
				onChange={e => setInputText(e.target.value)}
			/>
			<button type="submit">submit</button>
		</form>
	);
};

export default Form;
