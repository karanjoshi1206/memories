import React, { useRef, useState } from "react";

import Styles from "./CustomSelect.module.scss";
import { RxCaretDown } from "react-icons/rx";
import useOnClickOutside from "../../helpers/customHooks/useOnClickOutside";
const CustomSelect = ({
	values = [],
	setValue = () => {},
	onChange = () => {},
	label = "Select value",
	currentValue = { label: "", value: "" },
	search = true,
	isUser = true,
	multiSelect = false,
	selectedValue = [],
}) => {
	values?.map((elem) => console.log(elem));
	const [isOpen, setIsOpen] = useState(false);
	const [displayValue, setDisplayValue] = useState(currentValue);
	const [searchText, setSearchText] = useState("");
	const selectRef = useRef(null);
	useOnClickOutside(selectRef, () => setIsOpen(false));
	return (
		<div ref={selectRef} className={Styles.customSelect}>
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
									key={elem?.value?.id || elem.label}
									onClick={() => {
										onChange();
										if (multiSelect) {
											if (
												!selectedValue.some((element) => element === elem.value)
											) {
												const newValue = [...selectedValue, elem.value];
												setValue(newValue);
											} else {
												const newValue = selectedValue?.filter(
													(element) => element !== elem.value
												);
												console.log(newValue);
												setValue(newValue);
											}
										} else {
											setValue(elem);
											setDisplayValue(elem);
											setIsOpen(false);
										}
									}}
									className={`${Styles.customSelectListItem} ${
										selectedValue.includes(elem.value) && Styles.selectedUser
									}`}>
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
