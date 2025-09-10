"use client";
import React, { useState } from "react";
import { Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import styles from "./UomCategorySetup.module.css";

const categoryOptions = [
	{ value: "Mass", label: "Mass" },
	{ value: "Length", label: "Length" },
	{ value: "Volume", label: "Volume" },
	{ value: "Area", label: "Area" }
];

const initialTableData = [
	{
		id: 1,
		category: "Mass",
		shortName: "KG",
		fullName: "Kilogram",
		baseFactor: "1",
		defaultUom: "Yes",
		decimalAllowed: "Yes",
		active: "Yes",
		createdDate: "01-01-2025 12:00:00",
		lastModifiedDate: "01-01-2025 12:00:00",
		approvedBy: "@Shahzad",
		status: "Pending"
	}
];

export default function UomCategorySetupPage() {
	const [tableData, setTableData] = useState(initialTableData);
	const [formData, setFormData] = useState({
		category: "Mass",
		shortName: "KG",
		fullName: "Kilogram",
		baseFactor: "2",
		defaultUom: "Yes",
		decimalAllowed: "Yes",
		active: "Yes"
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		const currentDate = new Date();
		const formattedDate = currentDate.toLocaleDateString('en-GB', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		}) + ' ' + currentDate.toLocaleTimeString('en-GB', { hour12: false });
		const nextId = Math.max(...tableData.map(item => item.id)) + 1;
		const newEntry = {
			id: nextId,
			category: formData.category,
			shortName: formData.shortName,
			fullName: formData.fullName,
			baseFactor: formData.baseFactor,
			defaultUom: formData.defaultUom,
			decimalAllowed: formData.decimalAllowed,
			active: formData.active,
			createdDate: formattedDate,
			lastModifiedDate: formattedDate,
			approvedBy: "@Shahzad",
			status: "Pending"
		};
		setTableData(prev => [...prev, newEntry]);
		setFormData({
			category: "Mass",
			shortName: "",
			fullName: "",
			baseFactor: "1",
			defaultUom: "Yes",
			decimalAllowed: "Yes",
			active: "Yes"
		});
	};

	const handleCancel = () => {
		setFormData({
			category: "Mass",
			shortName: "",
			fullName: "",
			baseFactor: "1",
			defaultUom: "Yes",
			decimalAllowed: "Yes",
			active: "Yes"
		});
	};

	return (
		<div className={styles.page}>
			<h1 className={styles.heading}>UoM Category Setup</h1>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.formRow}>
					<Label className={styles.label}>UoM Category</Label>
					<Select
						value={formData.category}
						onValueChange={value => setFormData(prev => ({ ...prev, category: value }))}
            
					>
						<SelectTrigger className={styles.input}>
							<SelectValue placeholder="Select" />
						</SelectTrigger>
						<SelectContent>
							{categoryOptions.map(option => (
								<SelectItem key={option.value} value={option.value}>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className={styles.formRow}>
					<Label className={styles.label}>UoM Short Name</Label>
					<Input
						className={styles.input}
						value={formData.shortName}
						onChange={e => setFormData(prev => ({ ...prev, shortName: e.target.value }))}
						placeholder="Enter short name"
            required
					/>
				</div>
				<div className={styles.formRow}>
					<Label className={styles.label}>UoM Full Name</Label>
					<Input
						className={styles.input}
						value={formData.fullName}
						onChange={e => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
						placeholder="Enter full name"
            required
					/>
				</div>
				<div className={styles.formRow}>
					<Label className={styles.label}>Base Factor</Label>
					<Input
						className={styles.input}
						value={formData.baseFactor}
						onChange={e => setFormData(prev => ({ ...prev, baseFactor: e.target.value }))}
						placeholder="Enter base factor"
						type="number"
            required
					/>
				</div>
				<div className={styles.formRow}>
					<Label className={styles.label}>Is Default UoM?</Label>
					<RadioGroup
						value={formData.defaultUom}
						onValueChange={value => setFormData(prev => ({ ...prev, defaultUom: value }))}
						className={styles.radioGroup}
					>
						<div className={styles.radioItem}>
							<RadioGroupItem value="Yes" id="default-yes" className={styles.radioInput} />
							<Label htmlFor="default-yes" className={styles.radioLabel}>Yes</Label>
						</div>
						<div className={styles.radioItem}>
							<RadioGroupItem value="No" id="default-no" className={styles.radioInput} />
							<Label htmlFor="default-no" className={styles.radioLabel}>No</Label>
						</div>
					</RadioGroup>
				</div>
				<div className={styles.formRow}>
					<Label className={styles.label}>Is Decimal Allowed?</Label>
					<RadioGroup
						value={formData.decimalAllowed}
						onValueChange={value => setFormData(prev => ({ ...prev, decimalAllowed: value }))}
						className={styles.radioGroup}
					>
						<div className={styles.radioItem}>
							<RadioGroupItem value="Yes" id="decimal-yes" className={styles.radioInput} />
							<Label htmlFor="decimal-yes" className={styles.radioLabel}>Yes</Label>
						</div>
						<div className={styles.radioItem}>
							<RadioGroupItem value="No" id="decimal-no" className={styles.radioInput} />
							<Label htmlFor="decimal-no" className={styles.radioLabel}>No</Label>
						</div>
					</RadioGroup>
				</div>
				<div className={styles.formRow}>
					<Label className={styles.label}>Is Active</Label>
					<RadioGroup
						value={formData.active}
						onValueChange={value => setFormData(prev => ({ ...prev, active: value }))}
						className={styles.radioGroup}
					>
						<div className={styles.radioItem}>
							<RadioGroupItem value="Yes" id="active-yes" className={styles.radioInput} />
							<Label htmlFor="active-yes" className={styles.radioLabel}>Yes</Label>
						</div>
						<div className={styles.radioItem}>
							<RadioGroupItem value="No" id="active-no" className={styles.radioInput} />
							<Label htmlFor="active-no" className={styles.radioLabel}>No</Label>
						</div>
					</RadioGroup>
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
							<TableHead className={styles.th}>Category Code</TableHead>
							<TableHead className={styles.th}>UoM Short Name</TableHead>
							<TableHead className={styles.th}>UoM Full Name</TableHead>
							<TableHead className={styles.th}>Base Factor</TableHead>
							<TableHead className={styles.th}>Default UoM</TableHead>
							<TableHead className={styles.th}>Decimal Allowed</TableHead>
							<TableHead className={styles.th}>Active</TableHead>
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
								<TableCell className={styles.td}>{row.category}</TableCell>
								<TableCell className={styles.td}>{row.shortName}</TableCell>
								<TableCell className={styles.td}>{row.fullName}</TableCell>
								<TableCell className={styles.td}>{row.baseFactor}</TableCell>
								<TableCell className={styles.td}>{row.defaultUom}</TableCell>
								<TableCell className={styles.td}>{row.decimalAllowed}</TableCell>
								<TableCell className={styles.td}>{row.active}</TableCell>
								<TableCell className={styles.td}>{row.createdDate}</TableCell>
								<TableCell className={styles.td}>{row.lastModifiedDate}</TableCell>
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
