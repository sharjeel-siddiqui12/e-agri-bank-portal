"use client";
import React, { useState } from "react";
import { X, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import styles from "./PreferredVendorSetup.module.css";

const productOptions = [
	{ value: "Khush-haal Kisaan", label: "Khush-haal Kisaan" },
	{ value: "Agri Gold", label: "Agri Gold" }
];

const seedVendors = [
	{ value: "Syngenta", label: "Syngenta" },
	{ value: "Askari Seeds", label: "Askari Seeds" },
	{ value: "Pioneer", label: "Pioneer" }
];
const fertilizerVendors = [
	{ value: "Engro", label: "Engro" },
	{ value: "Fatima", label: "Fatima" },
	{ value: "FFC", label: "FFC" }
];
const pesticideVendors = [
	{ value: "Syngenta", label: "Syngenta" },
	{ value: "Bayer", label: "Bayer" },
	{ value: "Ali Akbar Group", label: "Ali Akbar Group" }
];

const initialTableData = [
	{
		id: 1,
		productId: "10-01-01-01",
		productName: "Khush-haal Kisaan",
		inputType: "Seeds",
		vendor: "Syngenta",
		createdDate: "10-05-2025 12:45:00",
		lastModifiedDate: "11-05-2025 12:45:00",
		approvedBy: "@Shahzad",
		status: "Pending"
	},
	{
		id: 2,
		productId: "10-01-01-01",
		productName: "Khush-haal Kisaan",
		inputType: "Seeds",
		vendor: "Askari Seeds",
		createdDate: "10-05-2025 12:45:00",
		lastModifiedDate: "11-05-2025 12:45:00",
		approvedBy: "@Shahzad",
		status: "Pending"
	},
	{
		id: 3,
		productId: "10-01-01-01",
		productName: "Khush-haal Kisaan",
		inputType: "Fertilizer",
		vendor: "Engro",
		createdDate: "10-05-2025 12:45:00",
		lastModifiedDate: "11-05-2025 12:45:00",
		approvedBy: "@Shahzad",
		status: "Pending"
	},
	{
		id: 4,
		productId: "10-01-01-01",
		productName: "Khush-haal Kisaan",
		inputType: "Pesticides",
		vendor: "Syngenta",
		createdDate: "10-05-2025 12:45:00",
		lastModifiedDate: "11-05-2025 12:45:00",
		approvedBy: "@Shahzad",
		status: "Pending"
	}
];

export default function PreferredVendorSetupPage() {
	const [productName, setProductName] = useState(productOptions[0].value);
	const [selectedSeeds, setSelectedSeeds] = useState(["Syngenta", "Askari Seeds"]);
	const [selectedFertilizer, setSelectedFertilizer] = useState(["Engro"]);
	const [selectedPesticides, setSelectedPesticides] = useState(["Syngenta"]);
	const [bankCommission, setBankCommission] = useState("2.00");
	const [tableData, setTableData] = useState(initialTableData);

	// Remove tag handlers
	const removeSeed = (vendor) => setSelectedSeeds(prev => prev.filter(v => v !== vendor));
	const removeFertilizer = (vendor) => setSelectedFertilizer(prev => prev.filter(v => v !== vendor));
	const removePesticide = (vendor) => setSelectedPesticides(prev => prev.filter(v => v !== vendor));

	// Add vendor handlers
	const handleSeedSelect = (value) => {
		if (!selectedSeeds.includes(value)) setSelectedSeeds(prev => [...prev, value]);
	};
	const handleFertilizerSelect = (value) => {
		if (!selectedFertilizer.includes(value)) setSelectedFertilizer(prev => [...prev, value]);
	};
	const handlePesticideSelect = (value) => {
		if (!selectedPesticides.includes(value)) setSelectedPesticides(prev => [...prev, value]);
	};

	// Save handler
	const handleSave = (e) => {
		e.preventDefault();
		// For each selected vendor, add a row for each input type
		const now = new Date();
		const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) +
			' ' + now.toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit' }) + ':00';
		const productId = "10-01-01-01";
		let newRows = [];
		selectedSeeds.forEach(vendor => {
			newRows.push({
				id: Math.random(),
				productId,
				productName,
				inputType: "Seeds",
				vendor,
				createdDate: dateStr,
				lastModifiedDate: dateStr,
				approvedBy: "@Shahzad",
				status: "Pending"
			});
		});
		selectedFertilizer.forEach(vendor => {
			newRows.push({
				id: Math.random(),
				productId,
				productName,
				inputType: "Fertilizer",
				vendor,
				createdDate: dateStr,
				lastModifiedDate: dateStr,
				approvedBy: "@Shahzad",
				status: "Pending"
			});
		});
		selectedPesticides.forEach(vendor => {
			newRows.push({
				id: Math.random(),
				productId,
				productName,
				inputType: "Pesticides",
				vendor,
				createdDate: dateStr,
				lastModifiedDate: dateStr,
				approvedBy: "@Shahzad",
				status: "Pending"
			});
		});
		setTableData(prev => [...prev, ...newRows]);
	};

	// Cancel handler
	const handleCancel = () => {
		setProductName(productOptions[0].value);
		setSelectedSeeds([]);
		setSelectedFertilizer([]);
		setSelectedPesticides([]);
		setBankCommission("");
	};

	return (
		<div className={styles.page}>
			<h1 className={styles.heading}>Preferred Vendor Setup</h1>
			<form className={styles.form} onSubmit={handleSave}>
				<div className={styles.formRow}>
					<label className={styles.label}>Product Name</label>
					<div className={styles.inputWrap}>
						<Select value={productName} onValueChange={setProductName}>
							<SelectTrigger className={styles.input}>
								<SelectValue placeholder="Select Product" />
							</SelectTrigger>
							<SelectContent>
								{productOptions.map(opt => (
									<SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>

				<div className={styles.formRow}>
					<label className={styles.label}>Seeds</label>
					<div className={styles.inputWrap}>
						<Select onValueChange={handleSeedSelect}>
							<SelectTrigger className={styles.input}>
								<SelectValue placeholder="Select Vendor" />
							</SelectTrigger>
							<SelectContent>
								{seedVendors.map(opt => (
									<SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
								))}
							</SelectContent>
						</Select>
						{selectedSeeds.length > 0 && (
							<div className={styles.tags}>
								{selectedSeeds.map(vendor => (
									<div key={vendor} className={styles.tag}>
										<span>{vendor}</span>
										<button type="button" className={styles.removeTagBtn} onClick={() => removeSeed(vendor)}>
											<X size={12} />
										</button>
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				<div className={styles.formRow}>
					<label className={styles.label}>Fertilizer</label>
					<div className={styles.inputWrap}>
						<Select onValueChange={handleFertilizerSelect}>
							<SelectTrigger className={styles.input}>
								<SelectValue placeholder="Select" />
							</SelectTrigger>
							<SelectContent>
								{fertilizerVendors.map(opt => (
									<SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
								))}
							</SelectContent>
						</Select>
						{selectedFertilizer.length > 0 && (
							<div className={styles.tags}>
								{selectedFertilizer.map(vendor => (
									<div key={vendor} className={styles.tag}>
										<span>{vendor}</span>
										<button type="button" className={styles.removeTagBtn} onClick={() => removeFertilizer(vendor)}>
											<X size={12} />
										</button>
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				<div className={styles.formRow}>
					<label className={styles.label}>Pesticides</label>
					<div className={styles.inputWrap}>
						<Select onValueChange={handlePesticideSelect}>
							<SelectTrigger className={styles.input}>
								<SelectValue placeholder="Select" />
							</SelectTrigger>
							<SelectContent>
								{pesticideVendors.map(opt => (
									<SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
								))}
							</SelectContent>
						</Select>
						{selectedPesticides.length > 0 && (
							<div className={styles.tags}>
								{selectedPesticides.map(vendor => (
									<div key={vendor} className={styles.tag}>
										<span>{vendor}</span>
										<button type="button" className={styles.removeTagBtn} onClick={() => removePesticide(vendor)}>
											<X size={12} />
										</button>
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				<div className={styles.formRow}>
					<label className={styles.label}>Bank Commission (Fees)</label>
					<div className={styles.inputWrap} style={{ position: "relative" }}>
						<Input
							className={styles.input}
							value={bankCommission}
							onChange={e => setBankCommission(e.target.value)}
							placeholder="2.00"
							type="number"
						/>
						<span className={styles.percentSuffix}>%</span>
					</div>
				</div>

				<div className={styles.buttonRow}>
					<Button type="submit" className={styles.saveBtn}>Save</Button>
					<Button type="button" variant="outline" className={styles.cancelBtn} onClick={handleCancel}>Cancel</Button>
				</div>
			</form>

			<div className={styles.tableWrap}>
				<Table className={styles.table}>
					<TableHeader>
						<TableRow>
							<TableHead className={styles.th}>Action</TableHead>
							<TableHead className={styles.th}>Product ID</TableHead>
							<TableHead className={styles.th}>Product Name</TableHead>
							<TableHead className={styles.th}>Input Type</TableHead>
							<TableHead className={styles.th}>Preferred Vendor</TableHead>
							<TableHead className={styles.th}>Created date</TableHead>
							<TableHead className={styles.th}>Last Modified date</TableHead>
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
								<TableCell className={styles.td}>{row.productId}</TableCell>
								<TableCell className={styles.td}>{row.productName}</TableCell>
								<TableCell className={styles.td}>{row.inputType}</TableCell>
								<TableCell className={styles.td}>{row.vendor}</TableCell>
								<TableCell className={styles.td}>{row.createdDate}</TableCell>
								<TableCell className={styles.td}>{row.lastModifiedDate}</TableCell>
								<TableCell className={styles.td}>{row.approvedBy}</TableCell>
								<TableCell className={styles.td}>
									<span className={`${styles.statusBadge} ${row.status === "Pending" ? styles.pending : styles.approved}`}>{row.status}</span>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
