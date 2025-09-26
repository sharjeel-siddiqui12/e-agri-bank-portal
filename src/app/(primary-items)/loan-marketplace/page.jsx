"use client";
import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
// import { ChevronDown, Eye } from "@heroicons/react/24/outline";
import { ChevronDown, Eye } from "lucide-react";
import { debounce } from "lodash";

import styles from "./LoanMarketPlace.module.css";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SortArrows from "@/components/ui/sort-arrows";

/* ------------------------------ Demo Data ------------------------------ */
const COMMODITIES = [
  "All Commodity",
  "Wheat",
  "Maize",
  "Barley",
  "Rice",
  "Cotton",
];
const TERMS = ["All Term", "6 Months", "8 Months", "7 Months", "12 Months"];
const REGIONS = [
  "All Region",
  "Okara, Punjab",
  "Sindh",
  "Punjab",
  "Lahore",
  "Faisalabad",
];
const STATUSES = ["All Status", "Disbursed", "Queue", "Accepted"];
const LOAN_TYPES = ["Crop Loan", "Agri Loan", "Development Loan"];

function formatAmount(n) {
  return n.toLocaleString("en-US");
}

function createLoanMarketplaceDemoData(count = 50) {
  const rows = [];
  for (let i = 1; i <= count; i++) {
    const loanType = LOAN_TYPES[Math.floor(Math.random() * LOAN_TYPES.length)];
    const loanAmount = Math.floor(Math.random() * 15000) * 100 + 10000;
    const interestRate = Math.floor(Math.random() * 6) + 5; // 5% to 10%
    const term = TERMS.slice(1)[Math.floor(Math.random() * (TERMS.length - 1))]; // Exclude "All Term"
    const status =
      STATUSES.slice(1)[Math.floor(Math.random() * (STATUSES.length - 1))]; // Exclude "All Status"
    const region =
      REGIONS.slice(1)[Math.floor(Math.random() * (REGIONS.length - 1))]; // Exclude "All Region"
    const commodity =
      COMMODITIES.slice(1)[
        Math.floor(Math.random() * (COMMODITIES.length - 1))
      ]; // Exclude "All Commodity"
    const sellingDiscount = Math.floor(Math.random() * 5) + 2; // 2% to 6%

    rows.push({
      id: i,
      loanType,
      loanAmount,
      interestRate: `${interestRate}%`,
      term,
      status,
      region,
      commodity,
      sellingDiscount: `${sellingDiscount}%`,
    });
  }
  return rows;
}
const demoData = createLoanMarketplaceDemoData();

/* -------------------------- Filtering & Sorting ------------------------- */
const PAGE_SIZE_OPTIONS = [25, 50, 100];

function normalize(str) {
  return str.toLowerCase();
}

function filterRows(
  rows,
  commodityFilter,
  termFilter,
  regionFilter,
  statusFilter
) {
  return rows.filter((r) => {
    const matchesCommodity =
      commodityFilter === "All Commodity" || r.commodity === commodityFilter;
    const matchesTerm = termFilter === "All Term" || r.term === termFilter;
    const matchesRegion =
      regionFilter === "All Region" || r.region === regionFilter;
    const matchesStatus =
      statusFilter === "All Status" || r.status === statusFilter;

    return matchesCommodity && matchesTerm && matchesRegion && matchesStatus;
  });
}

function compare(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

function sortRows(rows, field, order) {
  if (!field || !order) return rows;
  const sorted = [...rows].sort((a, b) => {
    let aVal, bVal;

    switch (field) {
      case "loanType":
        return compare(a.loanType, b.loanType);
      case "loanAmount":
        return compare(a.loanAmount, b.loanAmount);
      case "interestRate":
        aVal = parseInt(a.interestRate.replace("%", ""));
        bVal = parseInt(b.interestRate.replace("%", ""));
        return compare(aVal, bVal);
      case "term":
        return compare(a.term, b.term);
      case "status":
        return compare(a.status, b.status);
      case "region":
        return compare(a.region, b.region);
      case "commodity":
        return compare(a.commodity, b.commodity);
      case "sellingDiscount":
        aVal = parseInt(a.sellingDiscount.replace("%", ""));
        bVal = parseInt(b.sellingDiscount.replace("%", ""));
        return compare(aVal, bVal);
      default:
        return 0;
    }
  });
  return order === "asc" ? sorted : sorted.reverse();
}

/* --------------------------------- Page -------------------------------- */
export default function LoanMarketplacePage() {
  const router = useRouter();
  const [commodityFilter, setCommodityFilter] = useState("All Commodity");
  const [termFilter, setTermFilter] = useState("All Term");
  const [regionFilter, setRegionFilter] = useState("All Region");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [showCommodityDropdown, setShowCommodityDropdown] = useState(false);
  const [showTermDropdown, setShowTermDropdown] = useState(false);
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const filtered = useMemo(
    () =>
      filterRows(
        demoData,
        commodityFilter,
        termFilter,
        regionFilter,
        statusFilter
      ),
    [commodityFilter, termFilter, regionFilter, statusFilter]
  );
  const sorted = useMemo(
    () => sortRows(filtered, sortField, sortOrder),
    [filtered, sortField, sortOrder]
  );

  const maxPage = Math.ceil(sorted.length / pageSize);
  const pageRows = useMemo(
    () => sorted.slice((page - 1) * pageSize, page * pageSize),
    [sorted, page, pageSize]
  );

  function handleSort(nextField) {
    if (sortField === nextField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(nextField);
      setSortOrder("asc");
    }
  }

  function handlePageChange(next) {
    setPage(Math.max(1, Math.min(maxPage, next)));
  }

  function handlePageSizeChange(e) {
    setPageSize(Number(e.target.value));
    setPage(1);
  }

  function handleCommoditySelect(v) {
    setCommodityFilter(v);
    setShowCommodityDropdown(false);
    setPage(1);
  }

  function handleTermSelect(v) {
    setTermFilter(v);
    setShowTermDropdown(false);
    setPage(1);
  }

  function handleRegionSelect(v) {
    setRegionFilter(v);
    setShowRegionDropdown(false);
    setPage(1);
  }

  function handleStatusSelect(v) {
    setStatusFilter(v);
    setShowStatusDropdown(false);
    setPage(1);
  }

  function openDetail(row) {
    // Navigate to loan buying page
    router.push(`/loan-marketplace/${row.id}`);
  }

  function sellYourLoans() {
    // Navigate to loan selling page
    router.push("/loan-marketplace/sell");
  }

  return (
    <div className={styles.bg}>
      <div className={styles.wrapper}>
        {/* Header */}
        <div className={styles.headerContainer}>
          <h1 className={styles.heading}>Loan Marketplace</h1>
        </div>

        {/* Filter Bar with Sell Button */}
        <div className={styles.filterBar}>
          <div className={styles.filterSection}>
            {/* Commodity Dropdown */}
            <DropdownMenu
              open={showCommodityDropdown}
              onOpenChange={setShowCommodityDropdown}
            >
              <DropdownMenuTrigger asChild>
                <button className={styles.filterDropdownBtn}>
                  <span className={styles.filterText}>{commodityFilter}</span>
                  <ChevronDown className={styles.chevronIcon} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className={styles.filterDropdownMenu}>
                {COMMODITIES.map((commodity) => (
                  <DropdownMenuItem
                    key={commodity}
                    onSelect={() => handleCommoditySelect(commodity)}
                  >
                    {commodity}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Term Dropdown */}
            <DropdownMenu
              open={showTermDropdown}
              onOpenChange={setShowTermDropdown}
            >
              <DropdownMenuTrigger asChild>
                <button className={styles.filterDropdownBtn}>
                  <span className={styles.filterText}>{termFilter}</span>
                  <ChevronDown className={styles.chevronIcon} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className={styles.filterDropdownMenu}>
                {TERMS.map((term) => (
                  <DropdownMenuItem
                    key={term}
                    onSelect={() => handleTermSelect(term)}
                  >
                    {term}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Region Dropdown */}
            <DropdownMenu
              open={showRegionDropdown}
              onOpenChange={setShowRegionDropdown}
            >
              <DropdownMenuTrigger asChild>
                <button className={styles.filterDropdownBtn}>
                  <span className={styles.filterText}>{regionFilter}</span>
                  <ChevronDown className={styles.chevronIcon} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className={styles.filterDropdownMenu}>
                {REGIONS.map((region) => (
                  <DropdownMenuItem
                    key={region}
                    onSelect={() => handleRegionSelect(region)}
                  >
                    {region}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Status Dropdown */}
            <DropdownMenu
              open={showStatusDropdown}
              onOpenChange={setShowStatusDropdown}
            >
              <DropdownMenuTrigger asChild>
                <button className={styles.filterDropdownBtn}>
                  <span className={styles.filterText}>{statusFilter}</span>
                  <ChevronDown className={styles.chevronIcon} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className={styles.filterDropdownMenu}>
                {STATUSES.map((status) => (
                  <DropdownMenuItem
                    key={status}
                    onSelect={() => handleStatusSelect(status)}
                  >
                    {status}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Sell Button Section */}
          <div className={styles.buttonSection}>
            <Button onClick={sellYourLoans} className={styles.sellButton}>
              Sell Your Loans
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className={styles.tableOuter}>
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr className={styles.tableHeaderRow}>
                <th
                  className={[styles.th, styles.thSortable].join(" ")}
                  onClick={() => handleSort("loanType")}
                >
                  <div className={styles.tableHeading}>
                    Loan Type
                    <SortArrows
                      field="loanType"
                      sortField={sortField}
                      sortOrder={sortOrder}
                    />
                  </div>
                </th>
                <th
                  className={[styles.th, styles.thSortable].join(" ")}
                  onClick={() => handleSort("loanAmount")}
                >
                  <div className={styles.tableHeading}>
                    Loan Amount
                    <SortArrows
                      field="loanAmount"
                      sortField={sortField}
                      sortOrder={sortOrder}
                    />
                  </div>
                </th>
                <th
                  className={[styles.th, styles.thSortable].join(" ")}
                  onClick={() => handleSort("interestRate")}
                >
                  <div className={styles.tableHeading}>
                    Interest Rate
                    <SortArrows
                      field="interestRate"
                      sortField={sortField}
                      sortOrder={sortOrder}
                    />
                  </div>
                </th>
                <th
                  className={[styles.th, styles.thSortable].join(" ")}
                  onClick={() => handleSort("term")}
                >
                  <div className={styles.tableHeading}>
                    Term
                    <SortArrows
                      field="term"
                      sortField={sortField}
                      sortOrder={sortOrder}
                    />
                  </div>
                </th>
                <th
                  className={[styles.th, styles.thSortable].join(" ")}
                  onClick={() => handleSort("status")}
                >
                  <div className={styles.tableHeading}>
                    Loan Status
                    <SortArrows
                      field="status"
                      sortField={sortField}
                      sortOrder={sortOrder}
                    />
                  </div>
                </th>
                <th
                  className={[styles.th, styles.thSortable].join(" ")}
                  onClick={() => handleSort("region")}
                >
                  <div className={styles.tableHeading}>
                    Region
                    <SortArrows
                      field="region"
                      sortField={sortField}
                      sortOrder={sortOrder}
                    />
                  </div>
                </th>
                <th
                  className={[styles.th, styles.thSortable].join(" ")}
                  onClick={() => handleSort("commodity")}
                >
                  <div className={styles.tableHeading}>
                    Commodity
                    <SortArrows
                      field="commodity"
                      sortField={sortField}
                      sortOrder={sortOrder}
                    />
                  </div>
                </th>
                <th
                  className={[styles.th, styles.thSortable].join(" ")}
                  onClick={() => handleSort("sellingDiscount")}
                >
                  <div className={styles.tableHeading}>
                    Selling Price Discount
                    <SortArrows
                      field="sellingDiscount"
                      sortField={sortField}
                      sortOrder={sortOrder}
                    />
                  </div>
                </th>
                <th className={[styles.th, styles.thIcon].join(" ")}></th>
              </tr>
            </thead>
            <tbody>
              {pageRows.length > 0 ? (
                pageRows.map((row) => (
                  <tr key={row.id} className={styles.tableRow}>
                    <td className={styles.baseCell}>{row.loanType}</td>
                    <td className={styles.baseCellMono}>
                      {formatAmount(row.loanAmount)}
                    </td>
                    <td className={styles.baseCell}>{row.interestRate}</td>
                    <td className={styles.baseCell}>{row.term}</td>
                    <td>
                      <div
                        className={`${styles.statusPill} ${
                          row.status === "Disbursed"
                            ? styles.disbursed
                            : row.status === "Queue"
                            ? styles.queue
                            : row.status === "Accepted"
                            ? styles.accepted
                            : styles.inReview
                        }`}
                      >
                        <span
                          className={`${styles.statusDot} ${
                            row.status === "Disbursed"
                              ? styles.statusDotDisbursed
                              : row.status === "Queue"
                              ? styles.statusDotQueue
                              : row.status === "Accepted"
                              ? styles.statusDotAccepted
                              : styles.statusDot
                          }`}
                        ></span>
                        {row.status}
                      </div>
                    </td>
                    <td className={styles.baseCell}>{row.region}</td>
                    <td className={styles.baseCell}>{row.commodity}</td>
                    <td className={styles.baseCell}>{row.sellingDiscount}</td>
                    <td>
                      <button
                        className={styles.eyeBtn}
                        onClick={() => openDetail(row)}
                      >
                        <Eye
                          className={styles.eyeIcon}
                          color="#5D882D"
                          size={22}
                          strokeWidth={2.2}
                        />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className={styles.noLoans}>
                    No loans found matching the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={styles.paginationBar}>
          <div className={styles.paginationInfo}>
            <span className={styles.paginationText}>Rows per page:</span>
            <select
              className={styles.pageSizeSelect}
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              {PAGE_SIZE_OPTIONS.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span className={styles.paginationText}>
              {sorted.length === 0 ? 0 : (page - 1) * pageSize + 1}-
              {Math.min(page * pageSize, sorted.length)} of {sorted.length}
            </span>
          </div>
          <div className={styles.paginationButtons}>
            <button
              className={`${styles.pageBtn} ${
                page === 1 ? styles.pageBtnDisabled : ""
              }`}
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              ‹
            </button>
            <button className={`${styles.pageBtn} ${styles.pageBtnActive}`}>
              {page}
            </button>
            <button
              className={`${styles.pageBtn} ${
                page === maxPage ? styles.pageBtnDisabled : ""
              }`}
              onClick={() => handlePageChange(page + 1)}
              disabled={page === maxPage}
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
