// "use client";
// import React, { useState } from "react";
// import { Eye } from "lucide-react";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import styles from "./chartsOfAccountsApproval.module.css";

// const demoTableData = [
// 	{
// 		id: 1523,
// 		coaId: "1523",
// 		accountCode: "2001",
// 		accountType: "Liability",
// 		accountDescription: "Bank Charges Payable A/c",
// 		bank: "Meezan",
// 		accountNo: "44444444444444444444",
// 		currency: "PKR",
// 		openingBalance: "0",
// 		createdBy: "100201",
// 		createdDate: "7/24/2023 12:20:01 PM",
// 		modifiedBy: "0"
// 	},
// 	{
// 		id: 1524,
// 		coaId: "1524",
// 		accountCode: "2002",
// 		accountType: "Asset",
// 		accountDescription: "Cash Account",
// 		bank: "HBL",
// 		accountNo: "33333333333333333333",
// 		currency: "PKR",
// 		openingBalance: "50000",
// 		createdBy: "100201",
// 		createdDate: "7/24/2023 12:20:01 PM",
// 		modifiedBy: "0"
// 	},
// 	{
// 		id: 1525,
// 		coaId: "1525",
// 		accountCode: "2003",
// 		accountType: "Liability",
// 		accountDescription: "Accounts Payable",
// 		bank: "NBP",
// 		accountNo: "55555555555555555555",
// 		currency: "PKR",
// 		openingBalance: "25000",
// 		createdBy: "100201",
// 		createdDate: "7/24/2023 12:20:01 PM",
// 		modifiedBy: "0"
// 	}
// ];

// export default function ChartsOfAccountsApprovalPage() {
// 	const [tableData] = useState(demoTableData);
// 	const [selectedRow, setSelectedRow] = useState(null);
// 	const [showDetail, setShowDetail] = useState(false);

// 	const handleViewDetails = (row) => {
// 		setSelectedRow(row);
// 		setShowDetail(true);
// 	};

// 	const handleCloseDetail = () => {
// 		setShowDetail(false);
// 		setSelectedRow(null);
// 	};

// 	// Demo handlers for approve/reject/delete
// 	const handleApprove = () => {
// 		setShowDetail(false);
// 	};
// 	const handleReject = () => {
// 		setShowDetail(false);
// 	};
// 	const handleDelete = () => {
// 		setShowDetail(false);
// 	};

// 	return (
// 		<div className={styles.page}>
// 			<h1 className={styles.heading}>Chart of Accounts Setup (Approval)</h1>
// 			<div className={styles.tableWrap}>
// 				<Table className={styles.table}>
// 					<TableHeader>
// 						<TableRow>
// 							<TableHead className={styles.th}>COA ID</TableHead>
// 							<TableHead className={styles.th}>Account Code</TableHead>
// 							<TableHead className={styles.th}>Account Type</TableHead>
// 							<TableHead className={styles.th}>Account Description</TableHead>
// 							<TableHead className={styles.th}>Bank</TableHead>
// 							<TableHead className={styles.th}>Currency</TableHead>
// 							<TableHead className={styles.th}>Opening Balance</TableHead>
// 							<TableHead className={styles.th}>Created By</TableHead>
// 							<TableHead className={styles.th}></TableHead>
// 						</TableRow>
// 					</TableHeader>
// 					<TableBody>
// 						{tableData.map(row => (
// 							<TableRow key={row.id} className={styles.tr} onClick={() => handleViewDetails(row)} style={{ cursor: "pointer" }}>
// 								<TableCell className={styles.td}>{row.coaId}</TableCell>
// 								<TableCell className={styles.td}>{row.accountCode}</TableCell>
// 								<TableCell className={styles.td}>{row.accountType}</TableCell>
// 								<TableCell className={styles.td}>{row.accountDescription}</TableCell>
// 								<TableCell className={styles.td}>{row.bank}</TableCell>
// 								<TableCell className={styles.td}>{row.currency}</TableCell>
// 								<TableCell className={styles.td}>{row.openingBalance}</TableCell>
// 								<TableCell className={styles.td}>{row.createdBy}</TableCell>
// 								<TableCell className={styles.td} onClick={e => { e.stopPropagation(); handleViewDetails(row); }}>
// 									<Eye size={20} color="#375515" style={{ verticalAlign: "middle" }} />
// 								</TableCell>
// 							</TableRow>
// 						))}
// 					</TableBody>
// 				</Table>
// 			</div>

// 			{/* Right-side modal drawer for details */}
// 			{showDetail && selectedRow && (
// 				<div className={styles.detailDrawer}>
// 					<button className={styles.closeBtn} onClick={handleCloseDetail} title="Close">×</button>
// 					<div className={styles.detailGrid}>
// 						<div>
// 							<div className={styles.detailLabel}>COA ID</div>
// 							<div className={styles.detailValue}>{selectedRow.coaId}</div>
// 						</div>
// 						<div>
// 							<div className={styles.detailLabel}>Account Code</div>
// 							<div className={styles.detailValue}>{selectedRow.accountCode}</div>
// 						</div>
// 						<div>
// 							<div className={styles.detailLabel}>Account Type</div>
// 							<div className={styles.detailValue}>{selectedRow.accountType}</div>
// 						</div>
// 						<div>
// 							<div className={styles.detailLabel}>Account Description</div>
// 							<div className={styles.detailValue}>{selectedRow.accountDescription}</div>
// 						</div>
// 						<div>
// 							<div className={styles.detailLabel}>Bank</div>
// 							<div className={styles.detailValue}>{selectedRow.bank}</div>
// 						</div>
// 						<div>
// 							<div className={styles.detailLabel}>Account no.</div>
// 							<div className={styles.detailValue}>{selectedRow.accountNo}</div>
// 						</div>
// 						<div>
// 							<div className={styles.detailLabel}>Currency</div>
// 							<div className={styles.detailValue}>{selectedRow.currency}</div>
// 						</div>
// 						<div>
// 							<div className={styles.detailLabel}>Opening Balance</div>
// 							<div className={styles.detailValue}>{selectedRow.openingBalance}</div>
// 						</div>
// 						<div>
// 							<div className={styles.detailLabel}>Created By</div>
// 							<div className={styles.detailValue}>{selectedRow.createdBy}</div>
// 						</div>
// 						<div>
// 							<div className={styles.detailLabel}>Created Date</div>
// 							<div className={styles.detailValue}>{selectedRow.createdDate}</div>
// 						</div>
// 						<div>
// 							<div className={styles.detailLabel}>Modified By</div>
// 							<div className={styles.detailValue}>{selectedRow.modifiedBy}</div>
// 						</div>
// 					</div>
// 					<div className={styles.detailActions}>
// 						<button className={styles.approveBtn} onClick={handleApprove}>Approve</button>
// 						<button className={styles.rejectBtn} onClick={handleReject}>Reject</button>
// 						<button className={styles.deleteBtn} onClick={handleDelete}>Delete</button>
// 					</div>
// 				</div>
// 			)}
// 		</div>
// 	);
// }










// /* Chart of Accounts Approval Page Styles */
// .page {
// 	background: #f8f9fa;
// 	min-height: 100vh;
// 	padding: 24px;
// 	font-family: var(--font-inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
// 	max-width: 100%;
// 	margin: 0;
// }

// .heading {
// 	font-size: 1.5rem;
// 	font-weight: 600;
// 	color: #1f2937;
// 	margin-bottom: 24px;
// 	margin-left: 0;
// }

// .tableWrap {
// 	background: white;
// 	border-radius: 12px;
// 	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
// 	border: 1px solid #e5e7eb;
// 	overflow: hidden;
// 	margin-bottom: 16px;
// }

// .table {
// 	width: 100%;
// 	border-collapse: separate;
// 	border-spacing: 0;
// }

// .th {
// 	background: #f9fafb;
// 	padding: 12px 16px;
// 	text-align: left;
// 	border-bottom: 1px solid #e5e7eb;
// 	font-size: 0.75rem;
// 	font-weight: 500;
// 	color: #374151;
// 	text-transform: uppercase;
// 	letter-spacing: 0.05em;
// 	white-space: nowrap;
// }

// .tr {
// 	background: white;
// 	transition: background-color 0.2s;
// }

// .tr:hover {
// 	background: #f9fafb;
// }

// .tr:not(:last-child) {
// 	border-bottom: 1px solid #f3f4f6;
// }

// .td {
// 	padding: 12px 16px;
// 	color: #1f2937;
// 	font-size: 0.875rem;
// 	vertical-align: middle;
// 	white-space: nowrap;
// }

// /* Right-side detail drawer/modal */
// .detailDrawer {
// 	position: fixed;
// 	top: 0;
// 	right: 0;
// 	width: 480px;
// 	height: 100vh;
// 	background: #fff;
// 	box-shadow: -2px 0 16px rgba(0,0,0,0.08);
// 	z-index: 1000;
// 	display: flex;
// 	flex-direction: column;
// 	padding: 40px 32px 32px 32px;
// 	animation: slideInRight 0.25s cubic-bezier(.4,0,.2,1);
// }

// @keyframes slideInRight {
// 	from { right: -500px; opacity: 0; }
// 	to { right: 0; opacity: 1; }
// }

// .closeBtn {
// 	position: absolute;
// 	top: 24px;
// 	right: 24px;
// 	background: none;
// 	border: none;
// 	font-size: 2rem;
// 	color: #6b7280;
// 	cursor: pointer;
// 	transition: color 0.2s;
// 	z-index: 10;
// }
// .closeBtn:hover {
// 	color: #111827;
// }

// .detailGrid {
// 	display: grid;
// 	grid-template-columns: 1fr 1fr;
// 	gap: 24px 32px;
// 	margin-bottom: 40px;
// }

// .detailLabel {
// 	font-size: 0.85rem;
// 	font-weight: 500;
// 	color: #6b7280;
// 	text-transform: uppercase;
// 	letter-spacing: 0.05em;
// 	margin-bottom: 2px;
// }
// .detailValue {
// 	font-size: 1rem;
// 	font-weight: 600;
// 	color: #1f2937;
// 	word-break: break-all;
// }

// .detailActions {
// 	display: flex;
// 	gap: 18px;
// 	justify-content: flex-end;
// 	margin-top: auto;
// }
// .approveBtn {
// 	background: #375515;
// 	color: #fff;
// 	border: none;
// 	border-radius: 10px;
// 	font-weight: 600;
// 	font-size: 1.07rem;
// 	padding: 12px 35px;
// 	cursor: pointer;
// 	transition: background 0.18s;
// }
// .approveBtn:hover {
// 	background: #3a5100;
// }
// .rejectBtn {
// 	background: #fff;
// 	color: #dc2626;
// 	border: 2px solid #dc2626;
// 	border-radius: 10px;
// 	font-weight: 600;
// 	font-size: 1.07rem;
// 	padding: 12px 35px;
// 	cursor: pointer;
// 	transition: background 0.18s;
// }
// .rejectBtn:hover {
// 	background: #fee2e2;
// 	color: #991b1b;
// 	border-color: #991b1b;
// }
// .deleteBtn {
// 	background: #dc2626;
// 	color: #fff;
// 	border: none;
// 	border-radius: 10px;
// 	font-weight: 600;
// 	font-size: 1.07rem;
// 	padding: 12px 35px;
// 	cursor: pointer;
// 	transition: background 0.18s;
// }
// .deleteBtn:hover {
// 	background: #b91c1c;
// }

// @media (max-width: 900px) {
// 	.detailDrawer {
// 		width: 100vw;
// 		padding: 32px 12px 24px 12px;
// 	}
// 	.detailGrid {
// 		grid-template-columns: 1fr;
// 		gap: 18px;
// 	}
// }

// @media (max-width: 600px) {
// 	.page {
// 		padding: 8px;
// 	}
// 	.heading {
// 		font-size: 1.1rem;
// 		margin-bottom: 12px;
// 	}
// 	.tableWrap {
// 		border-radius: 0;
// 		margin-bottom: 8px;
// 	}
// 	.detailDrawer {
// 		padding: 16px 4px 12px 4px;
// 	}
// }



