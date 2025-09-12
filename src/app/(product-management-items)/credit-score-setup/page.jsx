"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp, Minus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import styles from "./CreditScoreSetup.module.css";

const demoProductNames = [
	{ value: "Khush-haal Kisaan", label: "Khush-haal Kisaan" },
	{ value: "Agri Gold", label: "Agri Gold" }
];

const demoCategories = [
	{
		id: 1,
		name: "KYC",
		weight: 45,
		expanded: true,
		factors: [
			{ id: 1, label: "Age", min: "0", max: "5", weight: "3.00" },
			{ id: 2, label: "Geography", min: "2.5", max: "10", weight: "4.50" },
			{ id: 3, label: "Years of Education", min: "0", max: "10", weight: "3.00" },
			{ id: 4, label: "Relevent Experience", min: "0", max: "10", weight: "7.50" },
			{ id: 5, label: "Residence/Other land", min: "2.5", max: "10", weight: "4.50" },
			{ id: 6, label: "Adult Household Members", min: "1", max: "4", weight: "3.00" },
			{ id: 7, label: "Type of Water Source", min: "0", max: "4", weight: "3.00" },
			{ id: 8, label: "Proof of Tenancy", min: "2.5", max: "10", weight: "7.50" },
			{ id: 9, label: "Tenancy History with Current Land Owner", min: "1", max: "5", weight: "4.50" },
			{ id: 10, label: "Tenor of Tenancy Agreement", min: "1", max: "5", weight: "4.50" }
		]
	},
	{
		id: 2,
		name: "Financial",
		weight: 15,
		expanded: true,
		factors: [
			{ id: 1, label: "Debt-Burden Ratio (DBR)", min: "0", max: "7", weight: "7.50" },
			{ id: 2, label: "ECIB / Data Check", min: "0", max: "10", weight: "7.50" }
		]
	},
	{
		id: 3,
		name: "Agronomy",
		weight: 40,
		expanded: true,
		factors: [
			{ id: 1, label: "Productivity /Crop Yield Index", min: "0", max: "100", weight: "20.00" },
			{ id: 2, label: "Crop Health", min: "0", max: "100", weight: "5.00" },
			{ id: 3, label: "Climate", min: "0", max: "100", weight: "10.00" },
			{ id: 4, label: "Irrigation", min: "0", max: "100", weight: "5.00" }
		]
	}
];

export default function CreditScoreSetupPage() {
	const [productName, setProductName] = useState(demoProductNames[0].value);
	const [categories, setCategories] = useState(demoCategories);

	// Add another factor to a category
	const handleAddFactor = (catIdx) => {
		setCategories(prev => prev.map((cat, idx) => {
			if (idx !== catIdx) return cat;
			const nextId = Math.max(0, ...cat.factors.map(f => f.id)) + 1;
			return {
				...cat,
				factors: [...cat.factors, { id: nextId, label: "", min: "", max: "", weight: "" }]
			};
		}));
	};

	// Remove a factor from a category
	const handleRemoveFactor = (catIdx, factorIdx) => {
		setCategories(prev => prev.map((cat, idx) => {
			if (idx !== catIdx) return cat;
			return {
				...cat,
				factors: cat.factors.filter((_, i) => i !== factorIdx)
			};
		}));
	};

	// Add another category
	const handleAddCategory = () => {
		const nextId = Math.max(0, ...categories.map(c => c.id)) + 1;
		setCategories(prev => ([
			...prev,
			{
				id: nextId,
				name: "New Category",
				weight: 0,
				expanded: true,
				factors: []
			}
		]));
	};

	// Remove a category
	const handleRemoveCategory = (catIdx) => {
		setCategories(prev => prev.filter((_, idx) => idx !== catIdx));
	};

	// Toggle expand/collapse
	const handleToggleExpand = (catIdx) => {
		setCategories(prev => prev.map((cat, idx) => idx === catIdx ? { ...cat, expanded: !cat.expanded } : cat));
	};

	// Handle input change for factors
	const handleFactorChange = (catIdx, factorIdx, field, value) => {
		setCategories(prev => prev.map((cat, idx) => {
			if (idx !== catIdx) return cat;
			return {
				...cat,
				factors: cat.factors.map((f, i) => i === factorIdx ? { ...f, [field]: value } : f)
			};
		}));
	};

	// Handle category name/weight change
	const handleCategoryChange = (catIdx, field, value) => {
		setCategories(prev => prev.map((cat, idx) => idx === catIdx ? { ...cat, [field]: value } : cat));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// For demo, just log
		console.log({ productName, categories });
	};

	const handleCancel = () => {
		setProductName(demoProductNames[0].value);
		setCategories(demoCategories);
	};

	return (
		<div className={styles.page}>
			<h1 className={styles.heading}>Credit Score Setup</h1>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.formRow}>
					<label className={styles.label}>Product Name</label>
					<div className={styles.productSelectWrap}>
						<Select value={productName} onValueChange={setProductName}>
							<SelectTrigger className={styles.input}>
								<SelectValue placeholder="Select Product" />
							</SelectTrigger>
							<SelectContent>
								{demoProductNames.map(opt => (
									<SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>

				{categories.map((cat, catIdx) => (
					<div className={styles.categorySection} key={cat.id}>
						<div className={styles.categoryHeader}>
							<span className={styles.categoryTitle}>
								<b>{cat.name}</b> <span className={styles.categoryWeight}>(weight {cat.weight}%)</span>
							</span>
							<div className={styles.categoryActions}>
								<button type="button" className={styles.collapseBtn} onClick={() => handleToggleExpand(catIdx)}>
									{cat.expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
								</button>
								{categories.length > 1 && (
									<button type="button" className={styles.removeCategoryBtn} onClick={() => handleRemoveCategory(catIdx)} title="Remove Category">
										<Minus size={18} />
									</button>
								)}
							</div>
						</div>
						{cat.expanded && (
							<div className={styles.factorsTableWrap}>
								<div className={styles.factorsTable}>
									<div className={styles.factorsHeaderRow}>
										<div className={styles.factorsHeaderLabel}></div>
										<div className={styles.factorsHeaderMin}>Min</div>
										<div className={styles.factorsHeaderMax}>Max</div>
										<div className={styles.factorsHeaderWeight}>Weight%</div>
										<div className={styles.factorsHeaderAction}></div>
									</div>
									{cat.factors.map((factor, factorIdx) => (
										<div className={styles.factorsRow} key={factor.id}>
											<div className={styles.factorsLabelCell}>
												<Input
													className={styles.input}
													value={factor.label}
													onChange={e => handleFactorChange(catIdx, factorIdx, "label", e.target.value)}
													placeholder="Factor Name"
												/>
											</div>
											<div className={styles.factorsMinCell}>
												<Input
													className={styles.input}
													value={factor.min}
													onChange={e => handleFactorChange(catIdx, factorIdx, "min", e.target.value)}
													placeholder="Min"
												/>
											</div>
											<div className={styles.factorsMaxCell}>
												<Input
													className={styles.input}
													value={factor.max}
													onChange={e => handleFactorChange(catIdx, factorIdx, "max", e.target.value)}
													placeholder="Max"
												/>
											</div>
											<div className={styles.factorsWeightCell}>
												<Input
													className={styles.input}
													value={factor.weight}
													onChange={e => handleFactorChange(catIdx, factorIdx, "weight", e.target.value)}
													placeholder="Weight%"
												/>
												<span className={styles.percentSuffix}>%</span>
											</div>
											<div className={styles.factorsActionCell}>
												{cat.factors.length > 1 && (
													<button type="button" className={styles.removeFactorBtn} onClick={() => handleRemoveFactor(catIdx, factorIdx)} title="Remove Factor">
														<Minus size={16} />
													</button>
												)}
											</div>
										</div>
									))}
								</div>
								<button type="button" className={styles.addFactorBtn} onClick={() => handleAddFactor(catIdx)}>
									+ Add Another Factor
								</button>
							</div>
						)}
					</div>
				))}

				<button type="button" className={styles.addCategoryBtn} onClick={handleAddCategory}>
					+ Add Another Category
				</button>

				<div className={styles.buttonRow}>
					<Button type="submit" className={styles.saveBtn}>Save</Button>
					<Button type="button" variant="outline" className={styles.cancelBtn} onClick={handleCancel}>Cancel</Button>
				</div>
			</form>
		</div>
	);
}
