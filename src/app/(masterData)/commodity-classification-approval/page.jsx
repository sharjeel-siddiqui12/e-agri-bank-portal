"use client";

import { useState } from "react";
import styles from "./CommodityClassificationApproval.module.css";
import { Check, X, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

const pendingApprovalData = [
  {
    id: 1,
    commodityId: "0001",
    mainCategory: "Agriculture",
    majorCategory: "Crops",
    classification: "Cereal & Grains",
    commodity: "Rice",
    createdBy: "Sameer",
    approvedBy: "--",
    status: "pending",
    selected: false
  }
];

const approvedData = [
  {
    id: 10,
    commodityId: "0002",
    mainCategory: "Agriculture",
    majorCategory: "Crops",
    classification: "Cereal & Grains",
    commodity: "Wheat",
    createdBy: "Sameer",
    approvedBy: "@shahzad",
    status: "approved",
    createdDate: "01-01-2025",
    lastModifiedDate: "01-01-2025 12:00:00",
    modifiedBy: "@shahzad"
  },
  {
    id: 11,
    commodityId: "0003",
    mainCategory: "Agriculture",
    majorCategory: "Crops",
    classification: "Cereal & Grains",
    commodity: "Maize",
    createdBy: "Sameer",
    approvedBy: "@shahzad",
    status: "approved",
    createdDate: "01-01-2025",
    lastModifiedDate: "01-01-2025 12:05:00",
    modifiedBy: "@shahzad"
  }
];

export default function CommodityClassificationApprovalPage() {
  const [pendingData, setPendingData] = useState(pendingApprovalData);
  const [approvedDataState, setApprovedDataState] = useState(approvedData);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCommodity, setSelectedCommodity] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    setPendingData(prev => prev.map(row => ({ ...row, selected: checked })));
  };

  const handleSelectItem = (id, checked) => {
    setPendingData(prev => prev.map(row => row.id === id ? { ...row, selected: checked } : row));
    setSelectAll(pendingData.every(row => row.id === id ? checked : row.selected));
  };

  const handleApprove = () => {
    const toApprove = pendingData.filter(row => row.selected);
    if (toApprove.length === 0) return;
    setApprovedDataState(prev => [
      ...prev,
      ...toApprove.map(row => ({
        ...row,
        status: "approved",
        createdDate: "01-01-2025",
        lastModifiedDate: "01-01-2025 12:00:00",
        modifiedBy: "@shahzad",
        approvedBy: "@shahzad"
      }))
    ]);
    setPendingData(prev => prev.filter(row => !row.selected));
    setSelectAll(false);
  };

  const handleReject = () => {
    setPendingData(prev => prev.filter(row => !row.selected));
    setSelectAll(false);
  };

  const handleViewDetails = (row) => {
    setSelectedCommodity(row);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCommodity(null);
  };

  const handleModalApprove = () => {
    if (selectedCommodity) {
      setApprovedDataState(prev => [...prev, {
        ...selectedCommodity,
        status: "approved",
        createdDate: "01-01-2025",
        lastModifiedDate: "01-01-2025 12:00:00",
        modifiedBy: "@shahzad",
        approvedBy: "@shahzad"
      }]);
      setPendingData(prev => prev.filter(row => row.id !== selectedCommodity.id));
      handleCloseModal();
    }
  };

  const handleModalReject = () => {
    if (selectedCommodity) {
      setPendingData(prev => prev.filter(row => row.id !== selectedCommodity.id));
      handleCloseModal();
    }
  };

  const handleModalDelete = () => {
    if (selectedCommodity) {
      if (selectedCommodity.status === "pending") {
        if (window.confirm("Are you sure you want to delete this item?")) {
          setPendingData(prev => prev.filter(row => row.id !== selectedCommodity.id));
          handleCloseModal();
        }
      } else if (selectedCommodity.status === "approved") {
        if (window.confirm("Are you sure you want to delete this approved item?")) {
          setApprovedDataState(prev => prev.filter(row => row.id !== selectedCommodity.id));
          handleCloseModal();
        }
      }
    }
  };

  const handleModalDisapprove = () => {
    if (selectedCommodity && selectedCommodity.status === "approved") {
      // Remove from approved, add to pending as disapproved
      setApprovedDataState(prev => prev.filter(row => row.id !== selectedCommodity.id));
      setPendingData(prev => [
        ...prev,
        {
          ...selectedCommodity,
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
      <h1 className={styles.heading}>Commodity Setup (Approval)</h1>
      {pendingData.length > 0 && (
        <div className={styles.section}>
          <div className={styles.tableWrap}>
            <Table className={styles.table}>
              <TableHeader>
                <TableRow>
                  <TableHead className={styles.th}>
                    <Checkbox
                      checked={selectAll}
                      onCheckedChange={handleSelectAll}
                      className={styles.checkbox}
                    />
                    Select
                  </TableHead>
                  <TableHead className={styles.th}>Commodity ID</TableHead>
                  <TableHead className={styles.th}>Main Category</TableHead>
                  <TableHead className={styles.th}>Major Category</TableHead>
                  <TableHead className={styles.th}>Classification</TableHead>
                  <TableHead className={styles.th}>Commodity</TableHead>
                  <TableHead className={styles.th}>Created by</TableHead>
                  <TableHead className={styles.th}>Approved by</TableHead>
                  <TableHead className={styles.th}>Status</TableHead>
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
                    <TableCell className={styles.td} onClick={e => e.stopPropagation()}>
                      <Checkbox
                        checked={row.selected}
                        onCheckedChange={(checked) => handleSelectItem(row.id, checked)}
                        className={styles.checkbox}
                      />
                    </TableCell>
                    <TableCell className={styles.td}>{row.commodityId}</TableCell>
                    <TableCell className={styles.td}>{row.mainCategory}</TableCell>
                    <TableCell className={styles.td}>{row.majorCategory}</TableCell>
                    <TableCell className={styles.td}>{row.classification}</TableCell>
                    <TableCell className={styles.td}>{row.commodity}</TableCell>
                    <TableCell className={styles.td}>{row.createdBy}</TableCell>
                    <TableCell className={styles.td}>{row.approvedBy}</TableCell>
                    <TableCell className={styles.td}>
                      <span className={`${styles.statusBadge} ${styles.pending}`}>{row.status}</span>
                    </TableCell>
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
          <div className={styles.actionButtons}>
            <Button onClick={handleApprove} className={styles.approveBtn}>
              <Check className={styles.buttonIcon} />
              Approve
            </Button>
            <Button onClick={handleReject} variant="outline" className={styles.rejectBtn}>
              <X className={styles.buttonIcon} />
              Reject
            </Button>
          </div>
        </div>
      )}
      <div className={styles.section}>
        <h2 className={styles.sectionHeading}>Approved</h2>
        <div className={styles.tableWrap}>
          <Table className={styles.table}>
            <TableHeader>
              <TableRow>
                <TableHead className={styles.th}>Commodity ID</TableHead>
                <TableHead className={styles.th}>Main Category</TableHead>
                <TableHead className={styles.th}>Major Category</TableHead>
                <TableHead className={styles.th}>Classification</TableHead>
                <TableHead className={styles.th}>Commodity</TableHead>
                <TableHead className={styles.th}>Created by</TableHead>
                <TableHead className={styles.th}>Approved by</TableHead>
                <TableHead className={styles.th}>Status</TableHead>
                <TableHead className={styles.th}>Created Date</TableHead>
                <TableHead className={styles.th}>Last Modified Date</TableHead>
                <TableHead className={styles.th}>Modified By</TableHead>
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
                  <TableCell className={styles.td}>{row.commodityId}</TableCell>
                  <TableCell className={styles.td}>{row.mainCategory}</TableCell>
                  <TableCell className={styles.td}>{row.majorCategory}</TableCell>
                  <TableCell className={styles.td}>{row.classification}</TableCell>
                  <TableCell className={styles.td}>{row.commodity}</TableCell>
                  <TableCell className={styles.td}>{row.createdBy}</TableCell>
                  <TableCell className={styles.td}>{row.approvedBy}</TableCell>
                  <TableCell className={styles.td}>
                    <span className={`${styles.statusBadge} ${styles.approved}`}>{row.status}</span>
                  </TableCell>
                  <TableCell className={styles.td}>{row.createdDate}</TableCell>
                  <TableCell className={styles.td}>{row.lastModifiedDate}</TableCell>
                  <TableCell className={styles.td}>{row.modifiedBy}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedCommodity && (
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
                  <span className={styles.detailLabel}>Commodity ID</span>
                  <span className={styles.detailValue}>{selectedCommodity.commodityId}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Main Category</span>
                  <span className={styles.detailValue}>{selectedCommodity.mainCategory}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Major Category</span>
                  <span className={styles.detailValue}>{selectedCommodity.majorCategory}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Classification</span>
                  <span className={styles.detailValue}>{selectedCommodity.classification}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Commodity Name</span>
                  <span className={styles.detailValue}>{selectedCommodity.commodity}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Created by</span>
                  <span className={styles.detailValue}>{selectedCommodity.createdBy}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Approved by</span>
                  <span className={styles.detailValue}>{selectedCommodity.approvedBy}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Status</span>
                  <span className={`${styles.statusBadge} ${selectedCommodity.status === "approved" ? styles.approved : styles.pending}`}>{selectedCommodity.status}</span>
                </div>
                {selectedCommodity.createdDate && (
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Created Date</span>
                    <span className={styles.detailValue}>{selectedCommodity.createdDate}</span>
                  </div>
                )}
                {selectedCommodity.lastModifiedDate && (
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Last Modified Date</span>
                    <span className={styles.detailValue}>{selectedCommodity.lastModifiedDate}</span>
                  </div>
                )}
                {selectedCommodity.modifiedBy && (
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Modified By</span>
                    <span className={styles.detailValue}>{selectedCommodity.modifiedBy}</span>
                  </div>
                )}
              </div>
              {selectedCommodity.status === "pending" && (
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

			  {/* disapproved and delete options for approved items */}
              {selectedCommodity.status === "approved" && (
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
