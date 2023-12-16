import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../contextAPI/AppProvider";

export default function Todo() {
	// destructuring useParams object
	const { id } = useParams();

	const { getTodo, todoDetail } = useContext(AppContext);

	useEffect(() => {
		// calling this func will update the detail
		getTodo(id);
	}, [id]);
	console.log(todoDetail);

	return (
		<>
			<h1>Todo Detail: {todoDetail?.text}</h1>
		</>
	);
}
