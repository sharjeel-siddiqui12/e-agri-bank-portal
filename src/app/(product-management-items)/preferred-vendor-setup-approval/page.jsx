"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./PreferredVendorApproval.module.css";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Check, X } from "lucide-react";

/** ---------- Demo Data (Pending) ---------- */
const pendingVendorData = [
  {
    id: 1,
    productId: "10-01-01-01",
    productName: "Khush-haal Kisaan",
    inputType: "Seeds",
    preferredVendor: "Syngenta",
    createdDate: "10-05-2025 12:45:00",
    lastModifiedDate: "11-05-2025 12:45:00",
    approvedBy: "@Shahzad",
    status: "Pending",
    selected: false
  },
  {
    id: 2,
    productId: "10-01-01-01",
    productName: "Khush-haal Kisaan",
    inputType: "Seeds",
    preferredVendor: "Askari Seeds",
    createdDate: "10-05-2025 12:45:00",
    lastModifiedDate: "11-05-2025 12:45:00",
    approvedBy: "@Shahzad",
    status: "Pending",
    selected: false
  },
  {
    id: 3,
    productId: "10-01-01-01",
    productName: "Khush-haal Kisaan",
    inputType: "Fertilizer",
    preferredVendor: "Engro",
    createdDate: "10-05-2025 12:45:00",
    lastModifiedDate: "11-05-2025 12:45:00",
    approvedBy: "@Shahzad",
    status: "Pending",
    selected: false
  },
  {
    id: 4,
    productId: "10-01-01-01",
    productName: "Khush-haal Kisaan",
    inputType: "Pesticides",
    preferredVendor: "Syngenta",
    createdDate: "10-05-2025 12:45:00",
    lastModifiedDate: "11-05-2025 12:45:00",
    approvedBy: "@Shahzad",
    status: "Pending",
    selected: false
  }
];

/** ---------- Demo Data (Approved) ---------- */
const approvedVendorData = [
  {
    id: 10,
    productId: "10-01-01-02",
    productName: "Khush-haal Kisaan",
    inputType: "Seeds",
    preferredVendor: "Syngenta",
    createdDate: "09-05-2025 10:10:00",
    lastModifiedDate: "11-05-2025 09:05:00",
    approvedBy: "@Admin",
    status: "Approved"
  },
  {
    id: 11,
    productId: "10-01-01-03",
    productName: "Khush-haal Kisaan",
    inputType: "Fertilizer",
    preferredVendor: "Engro",
    createdDate: "08-05-2025 14:20:00",
    lastModifiedDate: "12-05-2025 12:30:00",
    approvedBy: "@Shahzad",
    status: "Approved"
  }
];

function recordKeyOf(row) {
  return `${row.productId}|${row.inputType}|${row.preferredVendor}`;
}

export default function PreferredVendorSetupApprovalPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pendingData, setPendingData] = useState(pendingVendorData);
  const [approvedDataState, setApprovedDataState] = useState(approvedVendorData);
  const [selectAll, setSelectAll] = useState(false);

  // Published state persisted by recordKey
  const getPublishedState = (key) => {
    if (typeof window === "undefined") return false;
    try {
      const raw = localStorage.getItem("productPublishedStates") || "{}"; // keep same map name as your original
      const map = JSON.parse(raw);
      return !!map[key];
    } catch {
      return false;
    }
  };

  // Selection
  const handleSelectAll = (checked) => {
    setSelectAll(!!checked);
    setPendingData((prev) => prev.map((it) => ({ ...it, selected: !!checked })));
  };

  const handleSelectItem = (id, checked) => {
    const updated = pendingData.map((it) => (it.id === id ? { ...it, selected: !!checked } : it));
    setPendingData(updated);
    setSelectAll(updated.length > 0 && updated.every((it) => it.selected));
  };

  const selectedCount = useMemo(() => pendingData.filter((it) => it.selected).length, [pendingData]);

  // Bulk actions
  const nowStr = () => {
    const d = new Date();
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
  };

  const handleApprove = () => {
    const selected = pendingData.filter((it) => it.selected);
    if (selected.length === 0) return;

    const approvedItems = selected.map((it) => ({
      ...it,
      status: "Approved",
      selected: false,
      lastModifiedDate: nowStr()
    }));

    setApprovedDataState((prev) => [...prev, ...approvedItems]);
    setPendingData((prev) => prev.filter((it) => !it.selected));
    setSelectAll(false);
  };

  const handleReject = () => {
    const selected = pendingData.filter((it) => it.selected);
    if (selected.length === 0) return;
    setPendingData((prev) => prev.filter((it) => !it.selected));
    setSelectAll(false);
  };

  // Dynamic routing
  const openPendingDetail = (row) => {
    const key = recordKeyOf(row);
    const queryParams = new URLSearchParams({
      recordKey: key,
      productId: row.productId,
      productName: row.productName || "",
      inputType: row.inputType || "",
      preferredVendor: row.preferredVendor || "",
      createdDate: row.createdDate || "",
      lastModifiedDate: row.lastModifiedDate || "",
      approvedBy: row.approvedBy || "",
      status: row.status,
      isPublished: String(getPublishedState(key)),
      readOnly: "false" // editable
    }).toString();
    router.push(`/preferred-vendor-setup-approval-copy/${encodeURIComponent(key)}?${queryParams}`);
  };

  const openApprovedDetail = (row) => {
    const key = recordKeyOf(row);
    const queryParams = new URLSearchParams({
      recordKey: key,
      productId: row.productId,
      productName: row.productName || "",
      inputType: row.inputType || "",
      preferredVendor: row.preferredVendor || "",
      createdDate: row.createdDate || "",
      lastModifiedDate: row.lastModifiedDate || "",
      approvedBy: row.approvedBy || "",
      status: row.status,
      isPublished: String(getPublishedState(key)),
      readOnly: "true" // read-only detail
    }).toString();
    router.push(`/preferred-vendor-setup-approval-copy/${encodeURIComponent(key)}?${queryParams}`);
  };

  // ---- Apply updates from localStorage (runs on mount + when ts query changes) ----
  const applyUpdatesFromLocalStorage = () => {
    const raw = (typeof window !== "undefined" && localStorage.getItem("productApprovalUpdates")) || "";
    if (!raw) return;

    let updates = [];
    try {
      updates = JSON.parse(raw) || [];
    } catch {
      updates = [];
    }
    if (updates.length === 0) return;

    const byKey = new Map();
    updates.forEach((u) => byKey.set(u.recordKey, u));

    // Pending → maybe move to Approved
    setPendingData((prevPending) => {
      const moved = [];
      const remain = prevPending.filter((row) => {
        const key = recordKeyOf(row);
        const upd = byKey.get(key);
        if (!upd) return true;

        // persist published by recordKey
        try {
          const rawMap = localStorage.getItem("productPublishedStates") || "{}";
          const map = JSON.parse(rawMap);
          map[key] = !!upd.isPublished;
          localStorage.setItem("productPublishedStates", JSON.stringify(map));
        } catch {}

        if (upd.isApproved) {
          moved.push({
            ...row,
            status: "Approved",
            selected: false,
            lastModifiedDate: nowStr()
          });
          return false; // remove from pending
        }
        row.lastModifiedDate = nowStr();
        return true;
      });

      if (moved.length > 0) setApprovedDataState((prev) => [...prev, ...moved]);
      return remain;
    });

    // Approved → maybe move back to Pending
    setApprovedDataState((prevApproved) => {
      const movedBack = [];
      const remain = prevApproved.filter((row) => {
        const key = recordKeyOf(row);
        const upd = byKey.get(key);
        if (!upd) return true;

        try {
          const rawMap = localStorage.getItem("productPublishedStates") || "{}";
          const map = JSON.parse(rawMap);
          map[key] = !!upd.isPublished;
          localStorage.setItem("productPublishedStates", JSON.stringify(map));
        } catch {}

        if (!upd.isApproved) {
          movedBack.push({
            ...row,
            status: "Pending",
            selected: false,
            lastModifiedDate: nowStr()
          });
          return false; // remove from approved
        }
        return true;
      });

      if (movedBack.length > 0) setPendingData((prev) => [...prev, ...movedBack]);
      return remain;
    });

    // clear processed updates
    localStorage.removeItem("productApprovalUpdates");
  };

  // Run once on mount
  useEffect(() => {
    applyUpdatesFromLocalStorage();
  }, []);

  // Run again every time ts changes (ensures subsequent saves are processed)
  useEffect(() => {
    // any change in query string (we push ts=...) will trigger this
    applyUpdatesFromLocalStorage();
  }, [searchParams?.toString()]);

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Preferred Vendor Setup - Approval</h1>

      {/* Pending */}
      <div className={styles.section}>
        <div className={styles.tableWrap}>
          <Table className={styles.table}>
            <TableHeader>
              <TableRow>
                <TableHead className={styles.th}>
                  <Checkbox className={styles.checkbox} checked={selectAll} onCheckedChange={handleSelectAll} />
                  Action
                </TableHead>
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
              {pendingData.map((row) => (
                <TableRow
                  key={recordKeyOf(row)}
                  className={styles.tr}
                  onClick={() => openPendingDetail(row)}
                >
                  <TableCell className={styles.td} onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Checkbox
                        className={styles.checkbox}
                        checked={row.selected}
                        onCheckedChange={(checked) => handleSelectItem(row.id, checked)}
                      />
                      <button
                        className={styles.viewBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          openPendingDetail(row);
                        }}
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </TableCell>
                  <TableCell className={styles.td}>{row.productId}</TableCell>
                  <TableCell className={styles.td}>{row.productName}</TableCell>
                  <TableCell className={styles.td}>{row.inputType}</TableCell>
                  <TableCell className={styles.td}>{row.preferredVendor}</TableCell>
                  <TableCell className={styles.td}>{row.createdDate}</TableCell>
                  <TableCell className={styles.td}>{row.lastModifiedDate}</TableCell>
                  <TableCell className={styles.td}>{row.approvedBy}</TableCell>
                  <TableCell className={styles.td}>
                    <span className={`${styles.statusBadge} ${styles.pending}`}>{row.status}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className={styles.actionButtons}>
          <Button className={styles.approveBtn} onClick={handleApprove} disabled={selectedCount === 0}>
            <Check className={styles.buttonIcon} />
            Approve ({selectedCount})
          </Button>
          <Button variant="outline" className={styles.rejectBtn} onClick={handleReject} disabled={selectedCount === 0}>
            <X className={styles.buttonIcon} />
            Reject ({selectedCount})
          </Button>
        </div>
      </div>

      {/* Approved */}
      <div className={styles.section}>
        <h2 className={styles.sectionHeading}>Approved</h2>
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
              {approvedDataState.map((row) => (
                <TableRow
                  key={recordKeyOf(row)}
                  className={styles.tr}
                  onClick={() => openApprovedDetail(row)}
                >
                  <TableCell className={styles.td}>
                    <button
                      className={styles.viewBtn}
                      title="View Details"
                      onClick={(e) => {
                        e.stopPropagation();
                        openApprovedDetail(row);
                      }}
                    >
                      <Eye size={16} />
                    </button>
                  </TableCell>
                  <TableCell className={styles.td}>{row.productId}</TableCell>
                  <TableCell className={styles.td}>{row.productName}</TableCell>
                  <TableCell className={styles.td}>{row.inputType}</TableCell>
                  <TableCell className={styles.td}>{row.preferredVendor}</TableCell>
                  <TableCell className={styles.td}>{row.createdDate}</TableCell>
                  <TableCell className={styles.td}>{row.lastModifiedDate}</TableCell>
                  <TableCell className={styles.td}>{row.approvedBy}</TableCell>
                  <TableCell className={styles.td}>
                    <span className={`${styles.statusBadge} ${styles.approved}`}>{row.status}</span>
                  </TableCell>
                </TableRow>
              ))}
              {approvedDataState.length === 0 && (
                <TableRow>
                  <TableCell className={styles.td} colSpan={9} style={{ color: "#6b7280" }}>
                    No approved records yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
