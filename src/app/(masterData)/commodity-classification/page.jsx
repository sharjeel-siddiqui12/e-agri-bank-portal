"use client";

import { useState } from "react";
import styles from "./CommodityClassification.module.css";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Pencil, Plus, Eye } from "lucide-react";

const mainCategoryData = [
	{ id: 1, name: "Agriculture", isSelected: false },
	{ id: 2, name: "Minerals", isSelected: false }
];

const majorCategoryData = [
	{ id: 1, name: "Crops", mainCategoryId: 1, isSelected: false },
	{ id: 2, name: "Livestock", mainCategoryId: 1, isSelected: false }
];

const classificationData = [
	{ id: 1, name: "Cereal & Grains", majorCategoryId: 1, isSelected: false },
	{ id: 2, name: "Vegetables", majorCategoryId: 1, isSelected: false }
];

const commoditiesData = [
	{ id: 1, name: "Rice", classificationId: 1, isSelected: false },
	{ id: 2, name: "Wheat", classificationId: 1, isSelected: false },
	{ id: 3, name: "Maize", classificationId: 1, isSelected: false }
];

const initialTableData = [
	{
		id: 1,
		commodityId: "0001",
		mainCategory: "Agriculture",
		majorCategory: "Crops",
		classification: "Cereal & Grains",
		commodity: "Rice",
		createdBy: "Sameer",
		approvedBy: "--",
		status: "pending"
	}
];

export default function CommodityClassificationPage() {
	const [mainCategories, setMainCategories] = useState(mainCategoryData);
	const [majorCategories, setMajorCategories] = useState(majorCategoryData);
	const [classifications, setClassifications] = useState(classificationData);
	const [commodities, setCommodities] = useState(commoditiesData);
	const [tableData, setTableData] = useState(initialTableData);
	const [showAddForm, setShowAddForm] = useState({
		mainCategory: false,
		majorCategory: false,
		classification: false,
		commodities: false
	});
	const [newCategoryNames, setNewCategoryNames] = useState({
		mainCategory: "",
		majorCategory: "",
		classification: "",
		commodities: ""
	});
	const [activeDropdown, setActiveDropdown] = useState(null);

	const handleItemSelect = (itemId, category) => {
		switch (category) {
			case "mainCategory":
				setMainCategories(prev => prev.map(item => {
					if (item.id === itemId) {
						if (item.isActive === false) return item;
						return { ...item, isSelected: !item.isSelected };
					}
					return { ...item, isSelected: false };
				}));
				break;
			case "majorCategory":
				setMajorCategories(prev => prev.map(item => {
					if (item.id === itemId) {
						if (item.isActive === false) return item;
						return { ...item, isSelected: !item.isSelected };
					}
					return { ...item, isSelected: false };
				}));
				break;
			case "classification":
				setClassifications(prev => prev.map(item => {
					if (item.id === itemId) {
						if (item.isActive === false) return item;
						return { ...item, isSelected: !item.isSelected };
					}
					return { ...item, isSelected: false };
				}));
				break;
			case "commodities":
				setCommodities(prev => prev.map(item => {
					if (item.id === itemId) {
						if (item.isActive === false) return item;
						return { ...item, isSelected: !item.isSelected };
					}
					return { ...item, isSelected: false };
				}));
				break;
		}
	};

	const handleDropdownToggle = (itemId, categoryType, event) => {
		event.stopPropagation();
		const dropdownKey = `${categoryType}-${itemId}`;
		setActiveDropdown(activeDropdown === dropdownKey ? null : dropdownKey);
	};

	const handleDeactivate = (itemId, categoryType, event) => {
		event.stopPropagation();
		// Toggle isActive instead of just deactivating
		switch (categoryType) {
			case "mainCategory":
				setMainCategories(prev => prev.map(item => 
					item.id === itemId ? { ...item, isActive: !item.isActive } : item
				));
				break;
			case "majorCategory":
				setMajorCategories(prev => prev.map(item => 
					item.id === itemId ? { ...item, isActive: !item.isActive } : item
				));
				break;
			case "classification":
				setClassifications(prev => prev.map(item => 
					item.id === itemId ? { ...item, isActive: !item.isActive } : item
				));
				break;
			case "commodities":
				setCommodities(prev => prev.map(item => 
					item.id === itemId ? { ...item, isActive: !item.isActive } : item
				));
				break;
		}
		setActiveDropdown(null);
	};

	const handleDelete = (itemId, categoryType, event) => {
		event.stopPropagation();
		if (window.confirm("Are you sure you want to delete this item?")) {
			switch (categoryType) {
				case "mainCategory":
					setMainCategories(prev => prev.filter(item => item.id !== itemId));
					break;
				case "majorCategory":
					setMajorCategories(prev => prev.filter(item => item.id !== itemId));
					break;
				case "classification":
					setClassifications(prev => prev.filter(item => item.id !== itemId));
					break;
				case "commodities":
					setCommodities(prev => prev.filter(item => item.id !== itemId));
					break;
			}
		}
		setActiveDropdown(null);
	};

	const handleAddCategory = (categoryType) => {
		const categoryName = newCategoryNames[categoryType];
		if (!categoryName.trim()) {
			alert("Please enter a category name");
			return;
		}

		const newId = Math.max(...getCurrentCategoryData(categoryType).map(item => item.id), 0) + 1;
		const newItem = { id: newId, name: categoryName, isSelected: false };

		switch (categoryType) {
			case "mainCategory":
				setMainCategories(prev => [...prev, newItem]);
				break;
			case "majorCategory":
				setMajorCategories(prev => [...prev, { ...newItem, mainCategoryId: 1 }]);
				break;
			case "classification":
				setClassifications(prev => [...prev, { ...newItem, majorCategoryId: 1 }]);
				break;
			case "commodities":
				setCommodities(prev => [...prev, { ...newItem, classificationId: 1 }]);
				break;
		}

		setNewCategoryNames(prev => ({ ...prev, [categoryType]: "" }));
		setShowAddForm(prev => ({ ...prev, [categoryType]: false }));
	};

	const getCurrentCategoryData = (categoryType) => {
		switch (categoryType) {
			case "mainCategory": return mainCategories;
			case "majorCategory": return majorCategories;
			case "classification": return classifications;
			case "commodities": return commodities;
			default: return [];
		}
	};

	const handleAddCommodity = () => {
		const selectedMain = mainCategories.find(item => item.isSelected);
		const selectedMajor = majorCategories.find(item => item.isSelected);
		const selectedClassification = classifications.find(item => item.isSelected);
		const selectedCommodity = commodities.find(item => item.isSelected);

		if (!selectedMain || !selectedMajor || !selectedClassification || !selectedCommodity) {
			alert("Please select one item from each category before adding.");
			return;
		}

		const nextId = Math.max(...tableData.map(item => item.id), 0) + 1;
		const nextCommodityId = String(nextId).padStart(4, '0');

		const newEntry = {
			id: nextId,
			commodityId: nextCommodityId,
			mainCategory: selectedMain.name,
			majorCategory: selectedMajor.name,
			classification: selectedClassification.name,
			commodity: selectedCommodity.name,
			createdBy: "Sameer",
			approvedBy: "--",
			status: "pending"
		};

		setTableData(prev => [...prev, newEntry]);

		// Reset selections
		setMainCategories(prev => prev.map(item => ({ ...item, isSelected: false })));
		setMajorCategories(prev => prev.map(item => ({ ...item, isSelected: false })));
		setClassifications(prev => prev.map(item => ({ ...item, isSelected: false })));
		setCommodities(prev => prev.map(item => ({ ...item, isSelected: false })));
	};

	const renderCategoryColumn = (title, categoryType, data, showViewBtn = false) => {
		return (
			<div className={styles.categoryColumn}>
				<h3 className={styles.columnTitle}>{title}</h3>
				{data.map(item => (
					<div
						key={item.id}
						className={`${styles.categoryCard} ${item.isSelected ? styles.selected : ''} ${item.isActive === false ? styles.deactivated : ''}`}
						onClick={() => handleItemSelect(item.id, categoryType)}
					>
						<span className={styles.categoryName}>{item.name}</span>
						<div className={styles.cardActions}>
							{showViewBtn && (
								<button className={styles.viewBtn}>
									<Eye size={16} />
								</button>
							)}
							<div className={styles.dropdownContainer}>
								<button 
									className={styles.moreBtn}
									onClick={(e) => handleDropdownToggle(item.id, categoryType, e)}
								>
									<span>⋮</span>
								</button>
								{activeDropdown === `${categoryType}-${item.id}` && (
									<div className={styles.dropdown}>
											   <button 
												   className={styles.dropdownItem}
												   onClick={(e) => handleDeactivate(item.id, categoryType, e)}
											   >
												   {item.isActive === false ? 'Activate' : 'Deactivate'}
											   </button>
										<button 
											className={styles.dropdownItem}
											onClick={(e) => handleDelete(item.id, categoryType, e)}
										>
											Delete
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				))}
				
				{showAddForm[categoryType] ? (
					<div className={styles.addForm}>
						<input
							type="text"
							value={newCategoryNames[categoryType]}
							onChange={(e) => setNewCategoryNames(prev => ({ 
								...prev, 
								[categoryType]: e.target.value 
							}))}
							placeholder={`Enter ${title.toLowerCase()} name`}
							className={styles.addInput}
							autoFocus
						/>
						<div className={styles.addFormButtons}>
							<button 
								className={styles.saveAddBtn} 
								onClick={() => handleAddCategory(categoryType)}
							>
								Save
							</button>
							<button 
								className={styles.cancelAddBtn} 
								onClick={() => {
									setShowAddForm(prev => ({ ...prev, [categoryType]: false }));
									setNewCategoryNames(prev => ({ ...prev, [categoryType]: "" }));
								}}
							>
								Cancel
							</button>
						</div>
					</div>
				) : (
					<button 
						className={styles.addCategoryBtn} 
						onClick={() => setShowAddForm(prev => ({ ...prev, [categoryType]: true }))}
					>
						<Plus size={16} />
						Add {title}
					</button>
				)}
			</div>
		);
	};

	return (
		<div className={styles.page}>
			<h1 className={styles.heading}>Commodity Setup</h1>
			
			<div className={styles.setupSection}>
				<div className={styles.columnsContainer}>
					{renderCategoryColumn("Main Category", "mainCategory", mainCategories)}
					{renderCategoryColumn("Major Category", "majorCategory", majorCategories)}
					{renderCategoryColumn("Classification", "classification", classifications)}
					{renderCategoryColumn("Commodities", "commodities", commodities, true)}
				</div>
				
				<div className={styles.addButtonContainer}>
					<Button className={styles.addBtn} onClick={handleAddCommodity}>
						Add
					</Button>
				</div>
			</div>

			<div className={styles.tableWrap}>
				<Table className={styles.table}>
					<TableHeader>
						<TableRow>
							<TableHead className={styles.th}>Action</TableHead>
							<TableHead className={styles.th}>Commodity ID</TableHead>
							<TableHead className={styles.th}>Main Category</TableHead>
							<TableHead className={styles.th}>Major Category</TableHead>
							<TableHead className={styles.th}>Classification</TableHead>
							<TableHead className={styles.th}>Commodity</TableHead>
							<TableHead className={styles.th}>Created by</TableHead>
							<TableHead className={styles.th}>Approved by</TableHead>
							<TableHead className={styles.th}>Status</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{tableData.map(row => (
							<TableRow key={row.id} className={styles.tr}>
								<TableCell className={`${styles.td} ${styles.actionTd}`}>
									<button className={styles.editBtn} title="Edit">
										<Pencil size={16} />
									</button>
								</TableCell>
								<TableCell className={styles.td}>{row.commodityId}</TableCell>
								<TableCell className={styles.td}>{row.mainCategory}</TableCell>
								<TableCell className={styles.td}>{row.majorCategory}</TableCell>
								<TableCell className={styles.td}>{row.classification}</TableCell>
								<TableCell className={styles.td}>{row.commodity}</TableCell>
								<TableCell className={styles.td}>{row.createdBy}</TableCell>
								<TableCell className={styles.td}>{row.approvedBy}</TableCell>
								<TableCell className={styles.td}>
									<span className={`${styles.statusBadge} ${row.status === "Approved" ? styles.approved : styles.pending}`}>
										{row.status}
									</span>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}