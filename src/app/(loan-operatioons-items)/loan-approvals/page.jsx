"use client";

import { useCallback, useMemo, useState } from "react";
import debounce from "lodash/debounce";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button-loan";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, Eye, User, Search } from "lucide-react";
import styles from "./LoanApprovals.module.css";
import SortArrows from "@/components/ui/sort-arrows";

/* ------------------------------ Demo Data ------------------------------ */
const REGIONS = [
  { main: "Multan", sub: "Jalalpur Pirwala" },
  { main: "Gujranwala", sub: "Wazirabad" },
  { main: "Gujranwala", sub: "Nowshera Virkan" },
  { main: "Faisalabad", sub: "Jaranwala" },
  { main: "Faisalabad", sub: "Samundri" },
];

const NAMES = [
  "Abdul Sattar",
  "Haji Karim Bakhsh",
  "Manzoor Hussain",
  "Muhammad Akram",
  "Ghulam Rasool",
  "Allah Ditta",
  "Noor Muhammad",
  "Ali Raza",
  "Fahad Mehmood",
  "Bilal Aslam",
];

const LOAN_TYPES = ["Crop Loan", "Agri - Production Loan"];
const APP_STATUSES = ["In-review", "Approved"];
const KYC_STATUSES = ["Approved", "Pending"];

function pad(n, len = 6) {
  return `${n}`.padStart(len, "0");
}
function formatAmount(n) {
  return n.toLocaleString("en-US");
}
function buildDate(idx) {
  const base = new Date("2025-05-07T23:11:00");
  const d = new Date(base.getTime() - idx * 24 * 60 * 60 * 1000);
  const day = d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });
  const year = d.getFullYear().toString().slice(-2);
  const time = d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return { date: `${day}, ${year}`, time };
}
function makeCnic(i) {
  // simple, readable demo CNIC generator: 42101-12345-6 (varying mid digits)
  const mid = String(10000 + (i % 90000));
  const last = String(i % 7);
  return `42101-${mid}-${last}`;
}

function createLoanApprovalsDemoData(count = 333) {
  const rows = [];
  for (let i = 1; i <= count; i++) {
    const name = NAMES[i % NAMES.length];
    const region = REGIONS[i % REGIONS.length];
    const status = APP_STATUSES[i % APP_STATUSES.length]; // In-review / Approved
    const kyc = KYC_STATUSES[i % KYC_STATUSES.length]; // Approved / Pending
    const loanType = LOAN_TYPES[i % LOAN_TYPES.length];
    const cnic = makeCnic(i);
    const amount = [1500000, 300000, 500000, 1200000][i % 4];
    const { date, time } = buildDate(i % 12);
    rows.push({
      id: pad(i),
      name,
      cnic,
      amount,
      region,
      status,
      loanType,
      kyc,
      date,
      time,
    });
  }
  return rows;
}
const demoData = createLoanApprovalsDemoData();

/* -------------------------- Filtering & Sorting ------------------------- */
const PAGE_SIZE_OPTIONS = [25, 50, 100];
const STATUS_FILTERS = ["All Status", "In-review", "Approved"];

function normalize(str) {
  return str.toLowerCase();
}
function filterRows(rows, q, status) {
  const query = normalize(q.trim());
  return rows.filter((r) => {
    const matchesStatus = status === "All Status" ? true : r.status === status;
    if (!query) return matchesStatus;
    const hay = `${r.id} ${r.name} ${r.cnic} ${r.region.main} ${r.region.sub ?? ""} ${r.loanType}`.toLowerCase();
    return matchesStatus && hay.includes(query);
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
    let av;
    let bv;
    switch (field) {
      case "name":
        av = a.name;
        bv = b.name;
        break;
      case "id":
        av = a.id;
        bv = b.id;
        break;
      case "cnic":
        av = a.cnic;
        bv = b.cnic;
        break;
      case "region":
        av = `${a.region.main} ${a.region.sub ?? ""}`;
        bv = `${b.region.main} ${b.region.sub ?? ""}`;
        break;
      case "status":
        av = a.status;
        bv = b.status;
        break;
      case "kyc":
        av = a.kyc;
        bv = b.kyc;
        break;
      case "loanType":
        av = a.loanType;
        bv = b.loanType;
        break;
      case "date":
        av = a.date + a.time;
        bv = b.date + b.time;
        break;
      default:
        av = 0;
        bv = 0;
    }
    return compare(av, bv);
  });
  return order === "asc" ? sorted : sorted.reverse();
}

/* --------------------------------- Page -------------------------------- */
export default function LoanApprovalsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [showDropdown, setShowDropdown] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const filtered = useMemo(() => filterRows(demoData, search, statusFilter), [search, statusFilter]);
  const sorted = useMemo(() => sortRows(filtered, sortField, sortOrder), [filtered, sortField, sortOrder]);

  const maxPage = Math.ceil(sorted.length / pageSize);
  const pageRows = useMemo(() => sorted.slice((page - 1) * pageSize, page * pageSize), [sorted, page, pageSize]);

  const handleSearch = useCallback(
    debounce((e) => {
      setSearch(e.target.value);
      setPage(1);
    }, 300),
    []
  );

  function handleSort(nextField) {
    if (sortField !== nextField) {
      setSortField(nextField);
      setSortOrder("asc");
    } else {
      if (sortOrder === "asc") setSortOrder("desc");
      else if (sortOrder === "desc") {
        setSortOrder("");
        setSortField("");
      } else setSortOrder("asc");
    }
  }

  function handlePageChange(next) {
    if (next < 1 || next > maxPage) return;
    setPage(next);
  }
  function handlePageSizeChange(e) {
    setPageSize(Number(e.target.value));
    setPage(1);
  }
  function handleStatusSelect(v) {
    setStatusFilter(v);
    setShowDropdown(false);
    setPage(1);
  }

  return (
    <div className={styles.bg}>
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>Loan Approvals</h1>

        {/* Top Controls */}
        <div className={styles.topBar}>
          <div className={styles.searchContainer}>
            <Input
              className={styles.searchInput}
              placeholder="Search"
              onChange={handleSearch}
              defaultValue={search}
            />
            <Search className={styles.searchIcon} size={20} strokeWidth={2} />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={styles.statusDropdownBtn}
                onClick={() => setShowDropdown((s) => !s)}
                type="button"
                aria-haspopup="listbox"
                aria-expanded={showDropdown}
              >
                {statusFilter}
                <ChevronDown className={styles.chevronIcon} />
              </Button>
            </DropdownMenuTrigger>
            {showDropdown && (
              <DropdownMenuContent className={styles.statusDropdownMenu}>
                {STATUS_FILTERS.map((s) => (
                  <DropdownMenuItem key={s} onClick={() => handleStatusSelect(s)}>
                    {s}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            )}
          </DropdownMenu>
        </div>

        {/* Table */}
        <div className={styles.tableOuter}>
          <Table>
            <TableHeader>
              <TableRow className={styles.tableHeaderRow}>
                <TableHead
                  className={`${styles.th} ${styles.thBorrower} ${styles.thSortable}`}
                  onClick={() => handleSort("name")}
                >
                  <span className={styles.tableHeading}>
                    Borrower Name <SortArrows order={sortField === "name" ? sortOrder : undefined} />
                  </span>
                </TableHead>

                <TableHead
                  className={`${styles.th} ${styles.thSortable}`}
                  onClick={() => handleSort("id")}
                >
                  <span className={styles.tableHeading}>
                    Loan Application ID <SortArrows order={sortField === "id" ? sortOrder : undefined} />
                  </span>
                </TableHead>

                <TableHead
                  className={`${styles.th} ${styles.thSortable}`}
                  onClick={() => handleSort("cnic")}
                >
                  <span className={styles.tableHeading}>
                    CNIC / Farmer ID <SortArrows order={sortField === "cnic" ? sortOrder : undefined} />
                  </span>
                </TableHead>

                <TableHead
                  className={`${styles.th} ${styles.thSortable}`}
                  onClick={() => handleSort("region")}
                >
                  <span className={styles.tableHeading}>
                    Region / District <SortArrows order={sortField === "region" ? sortOrder : undefined} />
                  </span>
                </TableHead>

                <TableHead
                  className={`${styles.th} ${styles.thSortable}`}
                  onClick={() => handleSort("status")}
                >
                  <span className={styles.tableHeading}>
                    Loan Application Status <SortArrows order={sortField === "status" ? sortOrder : undefined} />
                  </span>
                </TableHead>

                <TableHead
                  className={`${styles.th} ${styles.thSortable}`}
                  onClick={() => handleSort("kyc")}
                >
                  <span className={styles.tableHeading}>
                    KYC Status <SortArrows order={sortField === "kyc" ? sortOrder : undefined} />
                  </span>
                </TableHead>

                <TableHead
                  className={`${styles.th} ${styles.thSortable}`}
                  onClick={() => handleSort("loanType")}
                >
                  <span className={styles.tableHeading}>
                    Loan Type <SortArrows order={sortField === "loanType" ? sortOrder : undefined} />
                  </span>
                </TableHead>

                <TableHead
                  className={`${styles.th} ${styles.thSortable}`}
                  onClick={() => handleSort("date")}
                >
                  <span className={styles.tableHeading}>
                    Application Date <SortArrows order={sortField === "date" ? sortOrder : undefined} />
                  </span>
                </TableHead>

                <TableHead className={styles.thIcon}></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {pageRows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className={styles.noApplicants}>
                    No loan approvals found.
                  </TableCell>
                </TableRow>
              )}

              {pageRows.map((r, i) => (
                <TableRow key={r.id + i} className={styles.tableRow}>
                  <TableCell className={styles.userCell}>
                    <span className={styles.avatarWrap}>
                      <User size={18} color="#7a7a7a" />
                    </span>
                    <span className={styles.userName}>{r.name}</span>
                  </TableCell>

                  <TableCell className={styles.baseCellMono}>{r.id}</TableCell>

                  <TableCell className={styles.baseCell}>{r.cnic}</TableCell>

                  <TableCell className={styles.baseCell}>
                    <span className={styles.regionMain}>{r.region.main}</span>
                    {r.region.sub && <span className={styles.regionSub}>, {r.region.sub}</span>}
                  </TableCell>

                  <TableCell className={styles.baseCell}>
                    {r.status === "In-review" ? (
                      <span className={`${styles.statusPill} ${styles.inReview}`}>
                        <span className={styles.statusDot} />
                        In-review
                      </span>
                    ) : (
                      <span className={`${styles.statusPill} ${styles.approved}`}>
                        <span className={styles.statusDotApproved} />
                        Approved
                      </span>
                    )}
                  </TableCell>

                  <TableCell className={styles.baseCell}>
                    {r.kyc === "Approved" ? (
                      <span className={`${styles.kycPill} ${styles.kycApproved}`}>
                        <span className={styles.kycDotApproved} />
                        Approved
                      </span>
                    ) : (
                      <span className={`${styles.kycPill} ${styles.kycPending}`}>
                        <span className={styles.kycDotPending} />
                        Pending
                      </span>
                    )}
                  </TableCell>

                  <TableCell className={styles.baseCell}>{r.loanType}</TableCell>

                  <TableCell className={styles.baseCell}>
                    <div className={styles.dateWrap}>
                      <span>{r.date}</span>
                      <span className={styles.time}>{r.time}</span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="ghost"
                      className={styles.eyeBtn}
                      onClick={() => alert(`Open approval ${r.id}`)}
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
                Showing {sorted.length === 0 ? 0 : (page - 1) * pageSize + 1}-
                {Math.min(page * pageSize, sorted.length)} of {sorted.length}
              </span>
            </div>

            <div className={styles.paginationButtons}>
              <Button
                variant="ghost"
                className={`${styles.pageBtn} ${page === 1 ? styles.pageBtnDisabled : styles.pageBtnActive}`}
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                aria-label="Previous page"
              >
                {"<"}
              </Button>

              {(() => {
                const items = [];
                if (maxPage <= 5) {
                  for (let pg = 1; pg <= maxPage; pg++) {
                    items.push(
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
                    items.push(
                      <Button key={1} variant="ghost" className={styles.pageBtn} onClick={() => handlePageChange(1)}>
                        1
                      </Button>
                    );
                    if (page > 4) items.push(<span key="start-ellipsis" className={styles.pageEllipsis}>...</span>);
                  }
                  const start = Math.max(2, page - 1);
                  const end = Math.min(maxPage - 1, page + 1);
                  for (let pg = start; pg <= end; pg++) {
                    items.push(
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
                    if (page < maxPage - 3) items.push(<span key="end-ellipsis" className={styles.pageEllipsis}>...</span>);
                    items.push(
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
                return items;
              })()}

              <Button
                variant="ghost"
                className={`${styles.pageBtn} ${page === maxPage || maxPage === 0 ? styles.pageBtnDisabled : ""}`}
                onClick={() => handlePageChange(page + 1)}
                disabled={page === maxPage || maxPage === 0}
                aria-label="Next page"
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
