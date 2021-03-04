import React, { useState } from "react";
import Form2 from "./form2";
import Form1 from "./form1";
import Form3 from "./form3";
import Form4 from "./form4";
import Success from "./success";

function MultiStepBoat({ parentIndex, props, index }) {
	console.log(props);
	const handleIndex = (va, txt) => {
		return parentIndex(va, txt);
	};

	switch (index) {
		case 1:
			return <Form1 handle={handleIndex} />;
		case 2:
			return <Form2 handle2={handleIndex} />;
		case 3:
			return <Form3 handle2={handleIndex} />;
		case 4:
			return <Form4 handle2={handleIndex} props={props} />;
		default:
			return <Form1 />;
	}
}
export default MultiStepBoat;
