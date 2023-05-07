import React, { useState } from "react";

import { RiChatPrivateFill } from "react-icons/ri";
import { MdOutlinePublic } from "react-icons/md";
import "./CustomToggle.scss";
const CustomToggle = () => {
	const [checked, setChecked] = useState(false);
	console.log("checked ", checked);
	return (
		<>
			<input
				id='checkbox'
				type='checkbox'
				value={checked}
				checked={checked}
				onChange={(e) => setChecked(!checked)}
			/>
			<label class='switch' for='checkbox'>
				{checked ? (
					<>
						<RiChatPrivateFill />
						Private
					</>
				) : (
					<>
						<MdOutlinePublic />
						Public
					</>
				)}
			</label>
		</>
	);
};

export default CustomToggle;
