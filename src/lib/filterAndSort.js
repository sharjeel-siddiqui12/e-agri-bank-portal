// src/lib/filterAndSort.js

// Filter and search for loan applications
export function filterLoanApplications(data, search, statusFilter) {
  return data.filter((item) => {
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
}

// Generic sorting for loan data
export function sortLoanData(data, sortField, sortOrder) {
  if (!sortField || !sortOrder) return data;
  return [...data].sort((a, b) => {
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
