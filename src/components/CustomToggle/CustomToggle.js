import React from "react";
import "./CustomToggle.scss";
const CustomToggle = ({ label, value, setValue }) => {
	return (
		<div className='toggleContainer'>
			<label className='toggleLabel'>{label}</label>
			<label className='switch'>
				<input
					value={value}
					onChange={() => setValue(!value)}
					type='checkbox'
					className='checkbox'
				/>
				<div className='slider'></div>
			</label>
		</div>
	);
};

export default CustomToggle;
