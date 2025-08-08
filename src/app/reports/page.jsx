"use client";
import { useState } from "react";
import { Search, ChevronDown, ArrowUpDown, ChevronLeft, ChevronRight, Download, User } from "lucide-react";
import styles from "./page.module.css";
import { demoLoans } from "@/lib/demoData";

const statusMap = {
  Full: { color: "#4CAF50", bg: "#E8F5E9" },
  Partial: { color: "#2196F3", bg: "#E3F2FD" },
  Pending: { color: "#FFB300", bg: "#FFF8E1" },
};

const formatIndian = (n) => n === 0 ? "--" : n.toLocaleString("en-IN");

// Remove hardcoded totalRows, will use filteredLoans.length

const filterOptions = [
  { label: "Branch / District", options: ["All", "Lahore", "Karachi"] },
  { label: "Crop Type", options: ["All", "Maize", "Wheat", "Cotton"] },
  { label: "Loan Status", options: ["All", "Active", "Closed"] },
  { label: "Repayment Status", options: ["All", "Full", "Partial", "Pending"] },
  { label: "Disbursement Mode", options: ["All", "Bank Transfer", "Cash"] },
  { label: "Settlement Method", options: ["All", "One-time", "Installments"] },
];

export default function ReportsPage() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(Array(filterOptions.length).fill(""));
  const [perPage, setPerPage] = useState(10); // Default to 10 per page
  const [page, setPage] = useState(1);

  const [sort, setSort] = useState({ key: null, asc: true });
  const columns = [
    { key: "user", label: "User Name", sortable: true },
    { key: "id", label: "Loan ID" },
    { key: "crop", label: "Crop" },
    { key: "loanAmount", label: "Loan Amount" },
    { key: "repaymentStatus", label: "Repayment Status", sortable: true },
    { key: "repaidAmount", label: "Repaid Amount", sortable: true },
    { key: "outstandingAmount", label: "Outstanding Amount", sortable: true },
  ];

  let filteredLoans = demoLoans.filter((row) => {
  // Search filter
  const matchesSearch =
    row.user.name.toLowerCase().includes(search.toLowerCase()) ||
    row.crop.toLowerCase().includes(search.toLowerCase()) ||
    row.id.includes(search);

  // Dropdown filters
  const matchesFilters = filterOptions.every((f, i) => {
    const val = filters[i];
    if (!val || val === "" || val === "All") return true;
    // Map filter label to row property
    switch (f.label) {
      case "Branch / District":
        return row.branch ? row.branch === val : true;
      case "Crop Type":
        return row.crop === val;
      case "Loan Status":
        return row.loanStatus ? row.loanStatus === val : true;
      case "Repayment Status":
        return row.repaymentStatus === val;
      case "Disbursement Mode":
        return row.disbursementMode ? row.disbursementMode === val : true;
      case "Settlement Method":
        return row.settlementMethod ? row.settlementMethod === val : true;
      default:
        return true;
    }
  });

  return matchesSearch && matchesFilters;
});
  // Simple sort handler
  const handleSort = (key) => {
    setSort((prev) => ({
      key,
      asc: prev.key === key ? !prev.asc : true,
    }));
  };
  if (sort.key) {
    filteredLoans = [...filteredLoans].sort((a, b) => {
      let av = a[sort.key], bv = b[sort.key];
      if (sort.key === "user") {
        av = a.user.name;
        bv = b.user.name;
      }
      if (typeof av === "number" && typeof bv === "number") return sort.asc ? av - bv : bv - av;
      return sort.asc ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
  }

  // Pagination logic
  const totalRows = filteredLoans.length;
  const pageCount = Math.ceil(totalRows / perPage);
  // Ensure current page is not out of bounds
  const currentPage = Math.max(1, Math.min(page, pageCount || 1));
  const paginatedLoans = filteredLoans.slice((currentPage - 1) * perPage, currentPage * perPage);
  const handleFilter = (i, val) => setFilters(f => f.map((x, idx) => (idx === i ? val : x)));
  const handleDownload = () => {
    const headers = columns.map(c => c.label);
    const rows = filteredLoans.map((l) => [
      l.user.name,
      l.id,
      l.crop,
      formatIndian(l.loanAmount),
      l.repaymentStatus,
      formatIndian(l.repaidAmount),
      formatIndian(l.outstandingAmount)
    ]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "loans_report.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.headerRow}>
        <h1 className={styles.headerTitle}>Reports</h1>
        <button className={styles.downloadBtn} onClick={handleDownload}>
          <Download size={18} /> Download Report
        </button>
      </div>

      {/* Filters Row */}
      <div className={styles.filtersRow}>
        <div className={styles.searchBox}>
          <Search className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        {filterOptions.map((f, i) => (
          <div className={styles.filterSelectWrap} key={f.label}>
            <select
              className={styles.filterSelect}
              value={filters[i]}
              onChange={e => handleFilter(i, e.target.value)}
            >
              <option value="">{f.label}</option>
              {f.options.map(opt => (
                <option value={opt} key={opt}>{opt}</option>
              ))}
            </select>
            <ChevronDown size={16} className={styles.filterSelectIcon} />
          </div>
        ))}
      </div>

      {/* Table */}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.key} className={styles.th}>
                  <div className={styles.thContent} onClick={col.sortable ? () => handleSort(col.key) : undefined}>
                    {col.label}
                    {col.sortable && <ArrowUpDown size={14} className={styles.thSortIcon + " " + (sort.key === col.key ? styles.thSortActive : "")} />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedLoans.map((loan) => (
              <tr key={loan.id} className={styles.tr}>
                <td className={styles.td}>
                  <div className={styles.userCell}>
                    <div className={styles.avatarIconWrap}>
                      <User className={styles.userIcon} strokeWidth={2.2} />
                    </div>
                    <span>{loan.user.name}</span>
                  </div>
                </td>
                <td className={styles.td}>{loan.id}</td>
                <td className={styles.td}>{loan.crop}</td>
                <td className={styles.td}>{formatIndian(loan.loanAmount)}</td>
                <td className={styles.td}>
                  <span className={styles.statusBadge} style={{
                    color: statusMap[loan.repaymentStatus].color,
                    background: statusMap[loan.repaymentStatus].bg
                  }}>
                    <span className={styles.statusDot} style={{ background: statusMap[loan.repaymentStatus].color }}/>
                    {loan.repaymentStatus}
                  </span>
                </td>
                <td className={styles.td}>{formatIndian(loan.repaidAmount)}</td>
                <td className={styles.td}>{formatIndian(loan.outstandingAmount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className={styles.paginationRow}>
        <div className={styles.paginationLeft}>
          <span>Show</span>
          <div className={styles.pageSizeWrap}>
            <select className={styles.pageSizeSelect} value={perPage} onChange={e => { setPerPage(Number(e.target.value)); setPage(1); }}>
              {[10, 25, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <ChevronDown size={14} className={styles.pageSizeIcon} />
          </div>
          <span>Showing {Math.min((currentPage-1)*perPage+1, totalRows)}-{Math.min(currentPage*perPage, totalRows)} of {totalRows}</span>
        </div>
        <div className={styles.paginationBtns}>
          <button className={styles.pageBtn} onClick={() => setPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}><ChevronLeft size={16} /></button>
          {/* First page */}
          <button className={currentPage === 1 ? styles.pageBtnActive : styles.pageBtn} onClick={() => setPage(1)}>1</button>
          {currentPage > 3 && <span className={styles.pageEllipsis}>...</span>}
          {/* Centered page numbers */}
          {Array.from({ length: 3 }).map((_, i) => {
            const p = currentPage + i - 1;
            if (p <= 1 || p >= pageCount) return null;
            return (
              <button key={p} className={currentPage === p ? styles.pageBtnActive : styles.pageBtn} onClick={() => setPage(p)}>
                {p}
              </button>
            );
          })}
          {currentPage < pageCount - 2 && <span className={styles.pageEllipsis}>...</span>}
          {/* Last page */}
          {pageCount > 1 && (
            <button className={currentPage === pageCount ? styles.pageBtnActive : styles.pageBtn} onClick={() => setPage(pageCount)}>{pageCount}</button>
          )}
          <button className={styles.pageBtn} onClick={() => setPage(p => Math.min(pageCount, p + 1))} disabled={currentPage === pageCount}><ChevronRight size={16} /></button>
        </div>
      </div>
    </div>
  );
}