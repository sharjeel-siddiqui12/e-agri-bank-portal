"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button-loan";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, Eye, User } from "lucide-react";
import styles from "./page.module.css";
import { createLoanApplicationsDemoData, loanStatusList } from "@/lib/demoData";
import SortArrows from "@/components/ui/sort-arrows";

const demoData = createLoanApplicationsDemoData();

const loanStatusVariants = {
  "In-review": styles.inReview,
  Rejected: styles.rejected,
  Cancelled: styles.cancelled,
  Recovered: styles.recovered,
  Disbursed: styles.disbursed,
  Accepted: styles.accepted,
  Approved: styles.approved,
};

const PAGE_SIZE_OPTIONS = [25, 50, 100];

export default function LoanApplicationsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [showDropdown, setShowDropdown] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // "asc", "desc", or ""

  // Filter and search
  let filteredData = demoData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.cnic.includes(search) ||
      (item.region.main &&
        item.region.main.toLowerCase().includes(search.toLowerCase())) ||
      (item.region.sub &&
        item.region.sub.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus =
      statusFilter === "All Status" || item.loanStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Sorting
  if (sortField && sortOrder) {
    filteredData = [...filteredData].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      // Special handling for region field (concatenate main+sub)
      if (sortField === "region") {
        aValue = a.region.main + (a.region.sub ? ", " + a.region.sub : "");
        bValue = b.region.main + (b.region.sub ? ", " + b.region.sub : "");
      }
      // Special for date: parse as date string if needed
      if (sortField === "date") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      // Normal string compare
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return 0;
    });
  }

  const maxPage = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // Dropdown menu handler
  function handleDropdownToggle() {
    setShowDropdown((open) => !open);
  }
  function handleDropdownSelect(value) {
    setStatusFilter(value);
    setShowDropdown(false);
    setPage(1);
  }
  function handleSearchChange(e) {
    setSearch(e.target.value);
    setPage(1);
  }
  function handlePageChange(newPage) {
    if (newPage < 1 || newPage > maxPage) return;
    setPage(newPage);
  }
  function handlePageSizeChange(e) {
    setPageSize(Number(e.target.value));
    setPage(1);
  }
  function handleSort(fieldId) {
    if (sortField !== fieldId) {
      setSortField(fieldId);
      setSortOrder("asc");
    } else {
      if (sortOrder === "asc") setSortOrder("desc");
      else if (sortOrder === "desc") {
        setSortOrder("");
        setSortField("");
      } else setSortOrder("asc");
    }
  }

  return (
    <div className={styles.bg}>
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>Applicant Profiles</h1>
        <div className={styles.topBar}>
          <div className={styles.searchContainer}>
            <Input
              placeholder="Search"
              value={search}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
            <span className={styles.searchIcon}>
              <svg width="20" height="20" fill="none">
                <path
                  d="M14.5 14.5L18 18"
                  stroke="#B0B0B0"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle
                  cx="9"
                  cy="9"
                  r="6"
                  stroke="#B0B0B0"
                  strokeWidth="1.5"
                />
              </svg>
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                variant="outline"
                className={styles.statusDropdownBtn}
                onClick={handleDropdownToggle}
                type="button"
                aria-haspopup="listbox"
                aria-expanded={showDropdown}
              >
                {statusFilter} <ChevronDown className={styles.chevronIcon} />
              </Button>
            </DropdownMenuTrigger>
            {showDropdown && (
              <DropdownMenuContent className={styles.statusDropdownMenu}>
                <DropdownMenuItem
                  onClick={() => handleDropdownSelect("All Status")}
                >
                  All Status
                </DropdownMenuItem>
                {loanStatusList.map((status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => handleDropdownSelect(status)}
                  >
                    {status}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            )}
          </DropdownMenu>
        </div>
        <div className={styles.tableOuter}>
          <Table>
            <TableHeader>
              <TableRow className={styles.tableHeaderRow}>
                <TableHead
                  className={`${styles.th} ${styles.thUser} ${styles.thSortable}`}
                  onClick={() => handleSort("name")}
                  tabIndex={0}
                  aria-label="User Name"
                >
                  <span className={styles.tableHeading}>
                    User Name <SortArrows order={sortField === "name" ? sortOrder : undefined} />
                  </span>
                </TableHead>
                <TableHead
                  className={`${styles.th} ${styles.thSortable}`}
                  onClick={() => handleSort("cnic")}
                  tabIndex={0}
                  aria-label="CNIC / Farmer ID"
                >
                  <span className={styles.tableHeading}>
                    CNIC / Farmer ID <SortArrows order={sortField === "cnic" ? sortOrder : undefined} />
                  </span>
                </TableHead>
                <TableHead
                  className={`${styles.th} ${styles.thSortable}`}
                  onClick={() => handleSort("region")}
                  tabIndex={0}
                  aria-label="Region / District"
                >
                  <span className={styles.tableHeading}>
                    Region / District <SortArrows order={sortField === "region" ? sortOrder : undefined} />
                  </span>
                </TableHead>
                <TableHead
                  className={`${styles.th} ${styles.thSortable}`}
                  onClick={() => handleSort("loanStatus")}
                  tabIndex={0}
                  aria-label="Loan Application Status"
                >
                  <span className={styles.tableHeading}>
                    Loan Application Status <SortArrows order={sortField === "loanStatus" ? sortOrder : undefined} />
                  </span>
                </TableHead>
                <TableHead
                  className={`${styles.th} ${styles.thSortable}`}
                  onClick={() => handleSort("kycStatus")}
                  tabIndex={0}
                  aria-label="KYC Status"
                >
                  <span className={styles.tableHeading}>
                    KYC Status <SortArrows order={sortField === "kycStatus" ? sortOrder : undefined} />
                  </span>
                </TableHead>
                <TableHead
                  className={`${styles.th} ${styles.thSortable}`}
                  onClick={() => handleSort("loanType")}
                  tabIndex={0}
                  aria-label="Loan Type"
                >
                  <span className={styles.tableHeading}>
                    Loan Type <SortArrows order={sortField === "loanType" ? sortOrder : undefined} />
                  </span>
                </TableHead>
                <TableHead
                  className={`${styles.th} ${styles.thSortable}`}
                  onClick={() => handleSort("date")}
                  tabIndex={0}
                  aria-label="Application Date"
                >
                  <span className={styles.tableHeading}>
                    Application Date <SortArrows order={sortField === "date" ? sortOrder : undefined} />
                  </span>
                </TableHead>
                <TableHead className={styles.thIcon}></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className={styles.noApplicants}>
                    No applicants found.
                  </TableCell>
                </TableRow>
              )}
              {paginatedData.map((app, i) => (
                <TableRow key={i} className={styles.tableRow}>
                  <TableCell className={styles.userCell}>
                    <span>
                      <User size={40} color="#B0B0B0" />
                    </span>
                    <span className={styles.userName}>{app.name}</span>
                  </TableCell>
                  <TableCell className={styles.baseCell}>{app.cnic}</TableCell>
                  <TableCell className={styles.baseCell}>
                    <span className={styles.regionMain}>{app.region.main}</span>
                    {app.region.sub && (
                      <span className={styles.regionSub}>, {app.region.sub}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className={`${styles.statusPill} ${loanStatusVariants[app.loanStatus]}`}>
                      <span
                        className={styles.statusDot}
                        style={{
                          background:
                            app.loanStatus === "In-review" ? "#FBE69A" :
                            app.loanStatus === "Rejected" ? "#FECDCA" :
                            app.loanStatus === "Cancelled" ? "#FFC448" :
                            app.loanStatus === "Recovered" ? "#84CAFF" :
                            app.loanStatus === "Disbursed" ? "#B2DDFF" :
                            app.loanStatus === "Accepted" ? "#BAEFC6" :
                            app.loanStatus === "Approved" ? "#BBF7D0" :
                            "#dadada"
                        }}
                      ></span>
                      {app.loanStatus}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={styles.kycPill}>
                      <span className={styles.kycDot}></span>
                      {app.kycStatus}
                    </span>
                  </TableCell>
                  <TableCell className={styles.baseCell}>{app.loanType}</TableCell>
                  <TableCell className={styles.baseCell}>{app.date}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      className={styles.eyeBtn}
                    >
                      <Eye className={styles.eyeIcon} color="#5D882D" size={22} strokeWidth={2.2} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* Pagination */}
          <div className={styles.paginationBar}>
            <div className={styles.paginationInfo}>
              <span className={styles.paginationText}>Show</span>
              <select
                className={styles.pageSizeSelect}
                value={pageSize}
                onChange={handlePageSizeChange}
              >
                {PAGE_SIZE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <span className={styles.paginationText}>
                Showing {filteredData.length === 0 ? 0 : (page - 1) * pageSize + 1}-
                {Math.min(page * pageSize, filteredData.length)} of {filteredData.length}
              </span>
            </div>
            <div className={styles.paginationButtons}>
              <Button
                variant="ghost"
                className={`${styles.pageBtn} ${page === 1 ? styles.pageBtnDisabled : styles.pageBtnActive}`}
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                {"<"}
              </Button>
              {/* Page numbers, show max 5 with ... for more than 5 pages */}
              {(() => {
                let pages = [];
                if (maxPage <= 5) {
                  for (let pg = 1; pg <= maxPage; pg++) {
                    pages.push(
                      <Button
                        key={pg}
                        variant={pg === page ? "default" : "ghost"}
                        className={`${styles.pageBtn} ${pg === page ? styles.pageBtnActive : ""}`}
                        onClick={() => handlePageChange(pg)}
                      >
                        {pg}
                      </Button>
                    );
                  }
                } else {
                  if (page > 3) {
                    pages.push(
                      <Button
                        key={1}
                        variant="ghost"
                        className={styles.pageBtn}
                        onClick={() => handlePageChange(1)}
                      >
                        1
                      </Button>
                    );
                    if (page > 4)
                      pages.push(
                        <span
                          key="start-ellipsis"
                          className={styles.pageEllipsis}
                        >
                          ...
                        </span>
                      );
                  }
                  let start = Math.max(2, page - 1);
                  let end = Math.min(maxPage - 1, page + 1);
                  for (let pg = start; pg <= end; pg++) {
                    pages.push(
                      <Button
                        key={pg}
                        variant={pg === page ? "default" : "ghost"}
                        className={`${styles.pageBtn} ${pg === page ? styles.pageBtnActive : ""}`}
                        onClick={() => handlePageChange(pg)}
                      >
                        {pg}
                      </Button>
                    );
                  }
                  if (page < maxPage - 2) {
                    if (page < maxPage - 3)
                      pages.push(
                        <span key="end-ellipsis" className={styles.pageEllipsis}>
                          ...
                        </span>
                      );
                    pages.push(
                      <Button
                        key={maxPage}
                        variant="ghost"
                        className={styles.pageBtn}
                        onClick={() => handlePageChange(maxPage)}
                      >
                        {maxPage}
                      </Button>
                    );
                  }
                }
                return pages;
              })()}
              <Button
                variant="ghost"
                className={`${styles.pageBtn} ${page === maxPage || maxPage === 0 ? styles.pageBtnDisabled : ""}`}
                onClick={() => handlePageChange(page + 1)}
                disabled={page === maxPage || maxPage === 0}
              >
                {">"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}