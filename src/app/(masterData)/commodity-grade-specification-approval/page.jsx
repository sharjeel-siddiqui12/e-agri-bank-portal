"use client";
import { useState } from "react";
import styles from "./CommodityGradeSpecificationApproval.module.css";
import { Check, X } from "lucide-react";

const pendingApprovalData = [
	{
		id: 1,
		commodity: "Wheat",
		commodityGrade: "A",
		gradingParameter: "Moisture",
		value: "13",
		measurement: "Percentage",
		method: "Min",
		mandatory: "Yes",
		active: "Yes",
		createdDate: "01-01-2025 12:00:00",
		lastModifiedDate: "01-01-2025 12:00:00",
		approvedBy: "@Shahzad",
		status: "Pending",
		selected: false
	},
	{
		id: 2,
		commodity: "Wheat",
		commodityGrade: "A",
		gradingParameter: "Broken Kernels",
		value: "2",
		measurement: "Percentage",
		method: "Max",
		mandatory: "Yes",
		active: "Yes",
		createdDate: "01-01-2025 12:00:00",
		lastModifiedDate: "01-01-2025 12:00:00",
		approvedBy: "@Shahzad",
		status: "Pending",
		selected: false
	}
];

const approvedData = [
	{
		id: 3,
		commodity: "Wheat",
		commodityGrade: "A",
		gradingParameter: "Test Weight",
		value: "76",
		measurement: "kg/hl",
		method: "Min",
		mandatory: "Yes",
		active: "Yes",
		createdDate: "01-01-2025 12:00:00",
		lastModifiedDate: "01-01-2025 12:00:00",
		approvedBy: "@Shahzad",
		status: "Approved"
	},
	{
		id: 4,
		commodity: "Wheat",
		commodityGrade: "A",
		gradingParameter: "Foreign Matter",
		value: "1",
		measurement: "Percentage",
		method: "Max",
		mandatory: "Yes",
		active: "Yes",
		createdDate: "01-01-2025 12:00:00",
		lastModifiedDate: "01-01-2025 12:00:00",
		approvedBy: "@Shahzad",
		status: "Approved"
	}
];

export default function CommodityGradeSpecificationApprovalPage() {
	const [pendingData, setPendingData] = useState(pendingApprovalData);
	const [approvedDataState, setApprovedDataState] = useState(approvedData);
	const [selectAll, setSelectAll] = useState(false);

	const handleSelectAll = (checked) => {
		setSelectAll(checked);
		setPendingData(prev => prev.map(item => ({ ...item, selected: checked })));
	};

	const handleSelectItem = (id, checked) => {
		setPendingData(prev => prev.map(item => item.id === id ? { ...item, selected: checked } : item));
	};

	const handleApprove = () => {
		const selectedItems = pendingData.filter(item => item.selected);
		if (selectedItems.length === 0) {
			alert("Please select items to approve");
			return;
		}
		const approvedItems = selectedItems.map(item => ({
			...item,
			status: "Approved",
			lastModifiedDate: new Date().toLocaleDateString('en-GB', {
				day: '2-digit', month: '2-digit', year: 'numeric'
			}) + ' ' + new Date().toLocaleTimeString('en-GB', { hour12: false })
		}));
		setApprovedDataState(prev => [...prev, ...approvedItems]);
		setPendingData(prev => prev.filter(item => !item.selected));
		setSelectAll(false);
	};

	const handleReject = () => {
		const selectedItems = pendingData.filter(item => item.selected);
		if (selectedItems.length === 0) {
			alert("Please select items to reject");
			return;
		}
		setPendingData(prev => prev.filter(item => !item.selected));
		setSelectAll(false);
	};

	return (
		<div className={styles.page}>
			<h1 className={styles.heading}>Commodity Grade Specification - Approval</h1>
			{/* Only show pending approval table and buttons if there are pending items */}
			{pendingData.length > 0 && (
				<>
					<div className={styles.tableWrap}>
						<table className={styles.table}>
							<thead>
								<tr className={styles.tr}>
									<th className={styles.th}>
										<input
											type="checkbox"
											checked={selectAll}
											onChange={e => handleSelectAll(e.target.checked)}
											className={styles.checkbox}
										/> Select
									</th>
									<th className={styles.th}>Commodity</th>
									<th className={styles.th}>Commodity Grade</th>
									<th className={styles.th}>Grading Parameter</th>
									<th className={styles.th}>Value</th>
									<th className={styles.th}>Measurement</th>
									<th className={styles.th}>Method</th>
									<th className={styles.th}>Mandatory</th>
									<th className={styles.th}>Active</th>
									<th className={styles.th}>Created date</th>
									<th className={styles.th}>Last Modified date</th>
									<th className={styles.th}>Approved by</th>
									<th className={styles.th}>Status</th>
								</tr>
							</thead>
							<tbody>
								{pendingData.map(row => (
									<tr key={row.id} className={styles.tr}>
										<td className={styles.td}>
											<input
												type="checkbox"
												checked={row.selected}
												onChange={e => handleSelectItem(row.id, e.target.checked)}
												className={styles.checkbox}
											/>
										</td>
										<td className={styles.td}>{row.commodity}</td>
										<td className={styles.td}>{row.commodityGrade}</td>
										<td className={styles.td}>{row.gradingParameter}</td>
										<td className={styles.td}>{row.value}</td>
										<td className={styles.td}>{row.measurement}</td>
										<td className={styles.td}>{row.method}</td>
										<td className={styles.td}>{row.mandatory}</td>
										<td className={styles.td}>{row.active}</td>
										<td className={styles.td}>{row.createdDate}</td>
										<td className={styles.td}>{row.lastModifiedDate}</td>
										<td className={styles.td}>{row.approvedBy}</td>
										<td className={styles.td}>
											<span className={`${styles.statusBadge} ${row.status === "Approved" ? styles.approved : styles.pending}`}>{row.status}</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className={styles.actionButtons}>
						<button className={styles.approveBtn} onClick={handleApprove}>
							<Check className={styles.buttonIcon} /> Approve
						</button>
						<button className={styles.rejectBtn} onClick={handleReject}>
							<X className={styles.buttonIcon} /> Reject
						</button>
					</div>
				</>
			)}
			<h2 className={styles.sectionHeading}>Approved</h2>
			<div className={styles.tableWrap}>
				<table className={styles.table}>
					<thead>
						<tr className={styles.tr}>
							<th className={styles.th}>Commodity</th>
							<th className={styles.th}>Commodity Grade</th>
							<th className={styles.th}>Grading Parameter</th>
							<th className={styles.th}>Value</th>
							<th className={styles.th}>Measurement</th>
							<th className={styles.th}>Method</th>
							<th className={styles.th}>Mandatory</th>
							<th className={styles.th}>Active</th>
							<th className={styles.th}>Created date</th>
							<th className={styles.th}>Last Modified date</th>
							<th className={styles.th}>Approved by</th>
							<th className={styles.th}>Status</th>
						</tr>
					</thead>
					<tbody>
						{approvedDataState.map(row => (
							<tr key={row.id} className={styles.tr}>
								<td className={styles.td}>{row.commodity}</td>
								<td className={styles.td}>{row.commodityGrade}</td>
								<td className={styles.td}>{row.gradingParameter}</td>
								<td className={styles.td}>{row.value}</td>
								<td className={styles.td}>{row.measurement}</td>
								<td className={styles.td}>{row.method}</td>
								<td className={styles.td}>{row.mandatory}</td>
								<td className={styles.td}>{row.active}</td>
								<td className={styles.td}>{row.createdDate}</td>
								<td className={styles.td}>{row.lastModifiedDate}</td>
								<td className={styles.td}>{row.approvedBy}</td>
								<td className={styles.td}>
									<span className={`${styles.statusBadge} ${row.status === "Approved" ? styles.approved : styles.pending}`}>{row.status}</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
