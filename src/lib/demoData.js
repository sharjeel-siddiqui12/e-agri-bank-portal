// src/lib/demoData.js


// Full demo data for loan applications (120 rows, 10 names/avatars)
export function createLoanApplicationsDemoData() {
  const names = [
    "Muneeb Ahmed",
    "Ali Raza",
    "Sara Khan",
    "Asad Ali",
    "Ayesha Noor",
    "Imran Tariq",
    "Bilal Saeed",
    "Fatima Zehra",
    "Zain Khan",
    "Hina Sheikh",
  ];
  const avatars = [
    "/avatars/1.jpg",
    "/avatars/1.jpg",
    "/avatars/1.jpg",
    "/avatars/1.jpg",
    "/avatars/1.jpg",
    "/avatars/1.jpg",
    "/avatars/1.jpg",
    "/avatars/1.jpg",
    "/avatars/1.jpg",
    "/avatars/1.jpg",
  ];
  const regions = [
    { main: "Okara", sub: "Dipalpur" },
    { main: "Malir" },
    { main: "Lahore", sub: "Model Town" },
    { main: "Multan" },
    { main: "Faisalabad" },
    { main: "Sialkot" },
    { main: "Karachi", sub: "Saddar" },
    { main: "Hyderabad" },
    { main: "Quetta" },
    { main: "Rawalpindi", sub: "Cantt" },
  ];
  const loanStatuses = [
    "In-review",
    "Rejected",
    "Cancelled",
    "Recovered",
    "Disbursed",
    "Accepted",
    "Approved",
  ];
  const loanTypes = ["Agri - Production Loan", "Crop Loan"];
  const cnic = "42101-12345-6";
  const kycStatus = "Approved";
  const date = "07 May, 25";

  let data = [];
  for (let i = 0; i < 120; i++) {
    data.push({
      avatar: avatars[i % avatars.length],
      name: names[i % names.length],
      cnic: cnic,
      region: regions[i % regions.length],
      loanStatus: loanStatuses[i % loanStatuses.length],
      kycStatus: kycStatus,
      loanType: loanTypes[i % loanTypes.length],
      date: date,
    });
  }
  return data;
}

// Short demo data for loan approvals (12 rows, 3 names/avatars)
export function createLoanApprovalsDemoData() {
  const names = [
    "Muneeb Ahmed",
    "Ali Raza",
    "Sara Khan",
  ];
  const avatars = [
    "/avatars/1.jpg",
    "/avatars/1.jpg",
    "/avatars/1.jpg",
  ];
  const regions = [
    { main: "Okara", sub: "Dipalpur" },
    { main: "Malir" },
    { main: "Lahore", sub: "Model Town" },
    { main: "Multan" },
    { main: "Faisalabad" },
    { main: "Sialkot" },
    { main: "Karachi", sub: "Saddar" },
    { main: "Hyderabad" },
    { main: "Quetta" },
    { main: "Rawalpindi", sub: "Cantt" },
  ];
  const loanStatuses = [
    "In-review",
    "Rejected",
    "Cancelled",
    "Recovered",
    "Disbursed",
    "Accepted",
    "Approved",
  ];
  const loanTypes = ["Agri - Production Loan", "Crop Loan"];
  const cnic = "42101-12345-6";
  const kycStatus = "Approved";
  const date = "07 May, 25";

  let data = [];
  for (let i = 0; i < 12; i++) {
    data.push({
      avatar: avatars[i % avatars.length],
      name: names[i % names.length],
      cnic: cnic,
      region: regions[i % regions.length],
      loanStatus: loanStatuses[i % loanStatuses.length],
      kycStatus: kycStatus,
      loanType: loanTypes[i % loanTypes.length],
      date: date,
    });
  }
  return data;
}

