"use client";
import React, { useState } from "react";
import { Eye, Check, X, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import styles from "./manualVoucherEntryApproval.module.css";

// Demo data for pending approval
const pendingApprovalData = [
  {
    id: 1,
    voucherId: "12345",
    voucherNo: "12345678",
    voucherDate: "7/24/2023",
    narration: "Narration here",
    debitAmount: "100000",
    creditAmount: "100000",
    status: "pending",
    createdBy: "Sameer",
    createdDate: "7/24/2023 12:20:01 PM",
    modifiedBy: "0",
    selected: false,
  },
  {
    id: 2,
    voucherId: "12346",
    voucherNo: "12345679",
    voucherDate: "7/25/2023",
    narration: "Bank transfer",
    debitAmount: "50000",
    creditAmount: "50000",
    status: "pending",
    createdBy: "John",
    createdDate: "7/25/2023 10:15:30 AM",
    modifiedBy: "0",
    selected: false,
  },
];

// Demo data for approved vouchers
const approvedData = [
  {
    id: 10,
    voucherId: "12340",
    voucherNo: "12345674",
    voucherDate: "7/20/2023",
    narration: "Cash deposit",
    debitAmount: "75000",
    creditAmount: "75000",
    status: "approved",
    createdBy: "Admin",
    approvedBy: "@shahzad",
    createdDate: "7/20/2023",
    lastModifiedDate: "7/20/2023 14:30:00",
    modifiedBy: "@shahzad",
  },
  {
    id: 11,
    voucherId: "12341",
    voucherNo: "12345675",
    voucherDate: "7/21/2023",
    narration: "Office supplies payment",
    debitAmount: "25000",
    creditAmount: "25000",
    status: "approved",
    createdBy: "Manager",
    approvedBy: "@admin",
    createdDate: "7/21/2023",
    lastModifiedDate: "7/21/2023 16:45:00",
    modifiedBy: "@admin",
  },
];

export default function ManualVoucherEntryApprovalPage() {
  const [pendingData, setPendingData] = useState(pendingApprovalData);
  const [approvedDataState, setApprovedDataState] = useState(approvedData);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    setPendingData(pendingData.map((item) => ({ ...item, selected: checked })));
  };

  const handleSelectItem = (id, checked) => {
    setPendingData(
      pendingData.map((item) =>
        item.id === id ? { ...item, selected: checked } : item
      )
    );

    // Update select all state
    const updatedData = pendingData.map((item) =>
      item.id === id ? { ...item, selected: checked } : item
    );
    setSelectAll(updatedData.every((item) => item.selected));
  };

  const handleApprove = () => {
    const selectedItems = pendingData.filter((item) => item.selected);
    if (selectedItems.length === 0) return;

    // Move selected items to approved
    const approvedItems = selectedItems.map((item) => ({
      ...item,
      status: "approved",
      approvedBy: "@currentUser",
      lastModifiedDate: new Date().toLocaleString(),
      modifiedBy: "@currentUser",
    }));

    setApprovedDataState([...approvedDataState, ...approvedItems]);
    setPendingData(pendingData.filter((item) => !item.selected));
    setSelectAll(false);
  };

  const handleReject = () => {
    const selectedItems = pendingData.filter((item) => item.selected);
    if (selectedItems.length === 0) return;

    // Remove selected items (reject them)
    setPendingData(pendingData.filter((item) => !item.selected));
    setSelectAll(false);
  };

  const handleViewDetails = (row) => {
    setSelectedVoucher(row);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVoucher(null);
  };

  const handleModalApprove = () => {
    if (!selectedVoucher) return;

    const approvedItem = {
      ...selectedVoucher,
      status: "approved",
      approvedBy: "@currentUser",
      lastModifiedDate: new Date().toLocaleString(),
      modifiedBy: "@currentUser",
    };

    setApprovedDataState([...approvedDataState, approvedItem]);
    setPendingData(
      pendingData.filter((item) => item.id !== selectedVoucher.id)
    );
    setShowModal(false);
    setSelectedVoucher(null);
  };

  const handleModalReject = () => {
    if (!selectedVoucher) return;

    setPendingData(
      pendingData.filter((item) => item.id !== selectedVoucher.id)
    );
    setShowModal(false);
    setSelectedVoucher(null);
  };

  const handleModalDelete = () => {
    if (!selectedVoucher) return;

    if (selectedVoucher.status === "pending") {
      if (
        window.confirm("Are you sure you want to delete this pending voucher?")
      ) {
        setPendingData((prev) =>
          prev.filter((row) => row.id !== selectedVoucher.id)
        );
        setShowModal(false);
        setSelectedVoucher(null);
      }
    } else if (selectedVoucher.status === "approved") {
      if (
        window.confirm("Are you sure you want to delete this approved voucher?")
      ) {
        setApprovedDataState((prev) =>
          prev.filter((row) => row.id !== selectedVoucher.id)
        );
        setShowModal(false);
        setSelectedVoucher(null);
      }
    }
  };

  const handleModalDisapprove = () => {
    if (!selectedVoucher) return;

    const pendingItem = {
      ...selectedVoucher,
      status: "pending",
      selected: false,
    };

    setPendingData([...pendingData, pendingItem]);
    setApprovedDataState(
      approvedDataState.filter((item) => item.id !== selectedVoucher.id)
    );
    setShowModal(false);
    setSelectedVoucher(null);
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Manual Voucher Entries (Approval)</h1>

      {/* Pending Approval Section */}
      <div className={styles.section}>
        <h2 className={styles.sectionHeading}>Pending Approval</h2>
        <div className={styles.tableWrap}>
          <Table className={styles.table}>
            <TableHeader>
              <TableRow>
                <TableHead className={styles.th}>Voucher ID</TableHead>
                <TableHead className={styles.th}>Voucher No.</TableHead>
                <TableHead className={styles.th}>Voucher Date</TableHead>
                <TableHead className={styles.th}>Narration</TableHead>
                <TableHead className={styles.th}>Debit Amount</TableHead>
                <TableHead className={styles.th}>Credit Amount</TableHead>
                <TableHead className={styles.th}>Status</TableHead>
                <TableHead className={styles.th}></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingData.map((row) => (
                <TableRow
                  key={row.id}
                  className={styles.tr}
                  onClick={() => handleViewDetails(row)}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell className={styles.td}>{row.voucherId}</TableCell>
                  <TableCell className={styles.td}>{row.voucherNo}</TableCell>
                  <TableCell className={styles.td}>{row.voucherDate}</TableCell>
                  <TableCell className={styles.td}>{row.narration}</TableCell>
                  <TableCell className={styles.td}>{row.debitAmount}</TableCell>
                  <TableCell className={styles.td}>
                    {row.creditAmount}
                  </TableCell>
                  <TableCell className={styles.td}>
                    <span
                      className={`${styles.statusBadge} ${styles[row.status]}`}
                    >
                      {row.status}
                    </span>
                  </TableCell>
                  <TableCell
                    className={styles.td}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewDetails(row);
                    }}
                  >
                    <Eye
                      size={20}
                      color="#375515"
                      style={{ cursor: "pointer" }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Action buttons removed as per requirements */}
      </div>

      {/* Approved Section */}
      <div className={styles.section}>
        <h2 className={styles.sectionHeading}>Approved</h2>
        <div className={styles.tableWrap}>
          <Table className={styles.table}>
            <TableHeader>
              <TableRow>
                <TableHead className={styles.th}>Voucher ID</TableHead>
                <TableHead className={styles.th}>Voucher No.</TableHead>
                <TableHead className={styles.th}>Voucher Date</TableHead>
                <TableHead className={styles.th}>Narration</TableHead>
                <TableHead className={styles.th}>Debit Amount</TableHead>
                <TableHead className={styles.th}>Credit Amount</TableHead>
                <TableHead className={styles.th}>Status</TableHead>
                <TableHead className={styles.th}></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {approvedDataState.map((row) => (
                <TableRow
                  key={row.id}
                  className={styles.tr}
                  onClick={() => handleViewDetails(row)}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell className={styles.td}>{row.voucherId}</TableCell>
                  <TableCell className={styles.td}>{row.voucherNo}</TableCell>
                  <TableCell className={styles.td}>{row.voucherDate}</TableCell>
                  <TableCell className={styles.td}>{row.narration}</TableCell>
                  <TableCell className={styles.td}>{row.debitAmount}</TableCell>
                  <TableCell className={styles.td}>
                    {row.creditAmount}
                  </TableCell>
                  <TableCell className={styles.td}>
                    <span
                      className={`${styles.statusBadge} ${styles[row.status]}`}
                    >
                      {row.status}
                    </span>
                  </TableCell>
                  <TableCell
                    className={styles.td}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewDetails(row);
                    }}
                  >
                    <Eye
                      size={20}
                      color="#375515"
                      style={{ cursor: "pointer" }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Modal for Details */}
      {showModal && selectedVoucher && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <button className={styles.closeBtn} onClick={handleCloseModal}>
                <X size={20} />
              </button>
            </div>
            <div className={styles.modalContent}>
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <div className={styles.detailLabel}>Voucher ID</div>
                  <div className={styles.detailValue}>
                    {selectedVoucher.voucherId}
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <div className={styles.detailLabel}>Voucher No.</div>
                  <div className={styles.detailValue}>
                    {selectedVoucher.voucherNo}
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <div className={styles.detailLabel}>Voucher Date</div>
                  <div className={styles.detailValue}>
                    {selectedVoucher.voucherDate}
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <div className={styles.detailLabel}>Narration</div>
                  <div className={styles.detailValue}>
                    {selectedVoucher.narration}
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <div className={styles.detailLabel}>Debit Amount</div>
                  <div className={styles.detailValue}>
                    {selectedVoucher.debitAmount}
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <div className={styles.detailLabel}>Credit Amount</div>
                  <div className={styles.detailValue}>
                    {selectedVoucher.creditAmount}
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <div className={styles.detailLabel}>Status</div>
                  <div className={styles.detailValue}>
                    <span
                      className={`${styles.statusBadge} ${
                        styles[selectedVoucher.status]
                      }`}
                    >
                      {selectedVoucher.status}
                    </span>
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <div className={styles.detailLabel}>Created By</div>
                  <div className={styles.detailValue}>
                    {selectedVoucher.createdBy}
                  </div>
                </div>
              </div>

              <div className={styles.modalActions}>
                {selectedVoucher.status === "pending" ? (
                  <>
                    <button
                      className={styles.modalApproveBtn}
                      onClick={handleModalApprove}
                    >
                      <Check size={16} />
                      Approve
                    </button>
                    <button
                      className={styles.modalRejectBtn}
                      onClick={handleModalReject}
                    >
                      <X size={16} />
                      Reject
                    </button>
                    <button
                      className={styles.modalDeleteBtn}
                      onClick={handleModalDelete}
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className={styles.modalRejectBtn}
                      onClick={handleModalDisapprove}
                    >
                      <X size={16} />
                      Disapprove
                    </button>
                    <button
                      className={styles.modalDeleteBtn}
                      onClick={handleModalDelete}
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
