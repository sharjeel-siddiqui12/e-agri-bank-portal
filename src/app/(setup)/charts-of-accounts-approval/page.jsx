"use client";

import { useState } from "react";
import styles from "./chartsOfAccountsApproval.module.css";
import { Check, X, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

const pendingApprovalData = [
  {
    id: 1,
    coaId: "1526",
    accountCode: "2004",
    accountType: "Asset",
    accountDescription: "Petty Cash Account",
    bank: "HBL",
    accountNo: "11111111111111111111",
    currency: "PKR",
    openingBalance: "10000",
    createdBy: "100201",
    approvedBy: "--",
    status: "pending",
    selected: false
  },
  {
    id: 2,
    coaId: "1527",
    accountCode: "2005",
    accountType: "Liability",
    accountDescription: "Supplier Payable A/c",
    bank: "NBP",
    accountNo: "22222222222222222222",
    currency: "PKR",
    openingBalance: "0",
    createdBy: "100201",
    approvedBy: "--",
    status: "pending",
    selected: false
  }
];

const approvedData = [
  {
    id: 10,
    coaId: "1523",
    accountCode: "2001",
    accountType: "Liability",
    accountDescription: "Bank Charges Payable A/c",
    bank: "Meezan",
    accountNo: "44444444444444444444",
    currency: "PKR",
    openingBalance: "0",
    createdBy: "100201",
    approvedBy: "@shahzad",
    status: "approved",
    createdDate: "7/24/2023",
    lastModifiedDate: "7/24/2023 12:20:01 PM",
    modifiedBy: "@shahzad"
  },
  {
    id: 11,
    coaId: "1524",
    accountCode: "2002",
    accountType: "Asset",
    accountDescription: "Cash Account",
    bank: "HBL",
    accountNo: "33333333333333333333",
    currency: "PKR",
    openingBalance: "50000",
    createdBy: "100201",
    approvedBy: "@shahzad",
    status: "approved",
    createdDate: "7/24/2023",
    lastModifiedDate: "7/24/2023 12:20:01 PM",
    modifiedBy: "@shahzad"
  },
  {
    id: 12,
    coaId: "1525",
    accountCode: "2003",
    accountType: "Liability",
    accountDescription: "Accounts Payable",
    bank: "NBP",
    accountNo: "55555555555555555555",
    currency: "PKR",
    openingBalance: "25000",
    createdBy: "100201",
    approvedBy: "@shahzad",
    status: "approved",
    createdDate: "7/24/2023",
    lastModifiedDate: "7/24/2023 12:20:01 PM",
    modifiedBy: "@shahzad"
  }
];

export default function ChartsOfAccountsApprovalPage() {
  const [pendingData, setPendingData] = useState(pendingApprovalData);
  const [approvedDataState, setApprovedDataState] = useState(approvedData);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewDetails = (row) => {
    setSelectedAccount(row);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAccount(null);
  };

  const handleModalApprove = () => {
    if (selectedAccount) {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric', 
        year: 'numeric'
      });
      const formattedDateTime = formattedDate + ' ' + currentDate.toLocaleTimeString('en-US', { hour12: true });
      
      setApprovedDataState(prev => [...prev, {
        ...selectedAccount,
        status: "approved",
        createdDate: formattedDate,
        lastModifiedDate: formattedDateTime,
        modifiedBy: "@shahzad",
        approvedBy: "@shahzad"
      }]);
      setPendingData(prev => prev.filter(row => row.id !== selectedAccount.id));
      handleCloseModal();
    }
  };

  const handleModalReject = () => {
    if (selectedAccount) {
      setPendingData(prev => prev.filter(row => row.id !== selectedAccount.id));
      handleCloseModal();
    }
  };

  const handleModalDelete = () => {
    if (selectedAccount) {
      if (selectedAccount.status === "pending") {
        if (window.confirm("Are you sure you want to delete this item?")) {
          setPendingData(prev => prev.filter(row => row.id !== selectedAccount.id));
          handleCloseModal();
        }
      } else if (selectedAccount.status === "approved") {
        if (window.confirm("Are you sure you want to delete this approved item?")) {
          setApprovedDataState(prev => prev.filter(row => row.id !== selectedAccount.id));
          handleCloseModal();
        }
      }
    }
  };

  const handleModalDisapprove = () => {
    if (selectedAccount && selectedAccount.status === "approved") {
      // Remove from approved, add to pending as disapproved
      setApprovedDataState(prev => prev.filter(row => row.id !== selectedAccount.id));
      setPendingData(prev => [
        ...prev,
        {
          ...selectedAccount,
          status: "pending",
          approvedBy: "--",
          createdDate: undefined,
          lastModifiedDate: undefined,
          modifiedBy: undefined
        }
      ]);
      handleCloseModal();
    }
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Chart of Accounts Setup (Approval)</h1>
      
      {pendingData.length > 0 && (
        <div className={styles.section}>
          <div className={styles.tableWrap}>
            <Table className={styles.table}>
              <TableHeader>
                <TableRow>
                  <TableHead className={styles.th}>COA ID</TableHead>
                  <TableHead className={styles.th}>Account Code</TableHead>
                  <TableHead className={styles.th}>Account Type</TableHead>
                  <TableHead className={styles.th}>Account Description</TableHead>
                  <TableHead className={styles.th}>Bank</TableHead>
                  <TableHead className={styles.th}>Currency</TableHead>
                  <TableHead className={styles.th}>Opening Balance</TableHead>
                  <TableHead className={styles.th}>Created by</TableHead>
                  <TableHead className={styles.th}></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingData.map(row => (
                  <TableRow
                    key={row.id}
                    className={styles.tr}
                    onClick={() => handleViewDetails(row)}
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell className={styles.td}>{row.coaId}</TableCell>
                    <TableCell className={styles.td}>{row.accountCode}</TableCell>
                    <TableCell className={styles.td}>{row.accountType}</TableCell>
                    <TableCell className={styles.td}>{row.accountDescription}</TableCell>
                    <TableCell className={styles.td}>{row.bank}</TableCell>
                    <TableCell className={styles.td}>{row.currency}</TableCell>
                    <TableCell className={styles.td}>{row.openingBalance}</TableCell>
                    <TableCell className={styles.td}>{row.createdBy}</TableCell>
                    <TableCell className={styles.td} onClick={e => { e.stopPropagation(); handleViewDetails(row); }}>
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
      )}

      <div className={styles.section}>
        <h2 className={styles.sectionHeading}>Approved</h2>
        <div className={styles.tableWrap}>
          <Table className={styles.table}>
            <TableHeader>
              <TableRow>
                <TableHead className={styles.th}>COA ID</TableHead>
                <TableHead className={styles.th}>Account Code</TableHead>
                <TableHead className={styles.th}>Account Type</TableHead>
                <TableHead className={styles.th}>Account Description</TableHead>
                <TableHead className={styles.th}>Bank</TableHead>
                <TableHead className={styles.th}>Currency</TableHead>
                <TableHead className={styles.th}>Opening Balance</TableHead>
                <TableHead className={styles.th}>Created by</TableHead>
                <TableHead className={styles.th}></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {approvedDataState.map(row => (
                <TableRow
                  key={row.id}
                  className={styles.tr}
                  onClick={() => handleViewDetails(row)}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell className={styles.td}>{row.coaId}</TableCell>
                  <TableCell className={styles.td}>{row.accountCode}</TableCell>
                  <TableCell className={styles.td}>{row.accountType}</TableCell>
                  <TableCell className={styles.td}>{row.accountDescription}</TableCell>
                  <TableCell className={styles.td}>{row.bank}</TableCell>
                  <TableCell className={styles.td}>{row.currency}</TableCell>
                  <TableCell className={styles.td}>{row.openingBalance}</TableCell>
                  <TableCell className={styles.td}>{row.createdBy}</TableCell>
                  <TableCell className={styles.td} onClick={e => { e.stopPropagation(); handleViewDetails(row); }}>
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

      {/* Modal */}
      {showModal && selectedAccount && (
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
                  <span className={styles.detailLabel}>COA ID</span>
                  <span className={styles.detailValue}>{selectedAccount.coaId}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Account Code</span>
                  <span className={styles.detailValue}>{selectedAccount.accountCode}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Account Type</span>
                  <span className={styles.detailValue}>{selectedAccount.accountType}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Account Description</span>
                  <span className={styles.detailValue}>{selectedAccount.accountDescription}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Bank</span>
                  <span className={styles.detailValue}>{selectedAccount.bank}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Account no.</span>
                  <span className={styles.detailValue}>{selectedAccount.accountNo}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Currency</span>
                  <span className={styles.detailValue}>{selectedAccount.currency}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Opening Balance</span>
                  <span className={styles.detailValue}>{selectedAccount.openingBalance}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Created by</span>
                  <span className={styles.detailValue}>{selectedAccount.createdBy}</span>
                </div>
                {selectedAccount.createdDate && (
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Created Date</span>
                    <span className={styles.detailValue}>{selectedAccount.createdDate}</span>
                  </div>
                )}
                {selectedAccount.lastModifiedDate && (
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Modified By</span>
                    <span className={styles.detailValue}>{selectedAccount.modifiedBy}</span>
                  </div>
                )}
              </div>
              
              {selectedAccount.status === "pending" && (
                <div className={styles.modalActions}>
                  <Button onClick={handleModalApprove} className={styles.modalApproveBtn}>
                    Approve
                  </Button>
                  <Button onClick={handleModalReject} className={styles.modalRejectBtn}>
                    Reject
                  </Button>
                  <Button onClick={handleModalDelete} className={styles.modalDeleteBtn}>
                    Delete
                  </Button>
                </div>
              )}

              {selectedAccount.status === "approved" && (
                <div className={styles.modalActions}>
                  <Button onClick={handleModalDisapprove} className={styles.modalRejectBtn}>
                    Disapprove
                  </Button>
                  <Button onClick={handleModalDelete} className={styles.modalDeleteBtn}>
                    Delete
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
