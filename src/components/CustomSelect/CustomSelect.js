import React, { useState } from "react";

import Styles from "./CustomSelect.module.scss";
import { RxCaretDown } from "react-icons/rx";
const CustomSelect = ({
	values = [
		{
			label: "Karan Joshi",
			value: {
				id: "12344",
				userName: "Karan Joshi",
				avatar:
					"https://memorybox.fly.dev/api/files/e8ucon8imwkcrkl/2omrqymwpetuv1a/memories_logo_YLELzkTUuG.png?token=",
			},
		},
		{
			label: "Tesst Joshi",
			value: {
				id: "12344",
				userName: "Karan Joshi",
				avatar:
					"https://memorybox.fly.dev/api/files/e8ucon8imwkcrkl/2omrqymwpetuv1a/memories_logo_YLELzkTUuG.png?token=",
			},
		},
		{
			label: "Tesst Joshi",
			value: {
				id: "12344",
				userName: "Karan Joshi",
				avatar:
					"https://memorybox.fly.dev/api/files/e8ucon8imwkcrkl/2omrqymwpetuv1a/memories_logo_YLELzkTUuG.png?token=",
			},
		},
	],
	setValue = () => {},
	onChange = () => {},
	label = "Select value",
	currentValue = { label: "", value: "" },
	search = true,
	isUser = true,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [displayValue, setDisplayValue] = useState(currentValue);
	const [searchText, setSearchText] = useState("");
	return (
		<div className={Styles.customSelect}>
			<div
				onClick={() => setIsOpen((val) => !val)}
				className={`${Styles.customSelectHeader} ${
					isOpen && Styles.headerOpen
				}`}>
				<div>{displayValue.value === "" ? label : displayValue.label}</div>
				<div>
					<RxCaretDown />
				</div>
			</div>
			{isOpen && (
				<div className={Styles.customSelectListBody}>
					{search && (
						<input
							type='search'
							className={Styles.selectSearch}
							placeholder='Search...'
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
						/>
					)}
					<ul className={Styles.customSelectList}>
						{values
							?.filter((elem) =>
								elem.label?.toLowerCase().includes(searchText.toLowerCase())
							)
							.map((elem) => (
								<li
									onClick={() => {
										setValue(elem);
										onChange();
										setDisplayValue(elem);
										setIsOpen(false);
									}}
									className={Styles.customSelectListItem}>
									{isUser && (
										<span>
											<img src={elem.value.avatar} alt={elem.value.userName} />
										</span>
									)}
									{elem.label}
								</li>
							))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default CustomSelect;
