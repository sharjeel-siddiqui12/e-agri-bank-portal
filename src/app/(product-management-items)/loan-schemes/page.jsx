"use client";
import styles from "./LoanSchemes.module.css";
import Image from "next/image";

const loanData = [
	{
		bank: "Mobilink Microfinance Bank",
		logo: "/bank-logo/mobilink.png",
		loanName: "Khush-Haal Kisaan",
		loanCategory: "Crop Loan",
		loanAmount: "1,500,000",
		eligibility: "CNIC Front, CNIC Back, Zarai Passbook",
		validTill: "Dec 25, 2025"
	},
	{
		bank: "UBL",
		logo: "/bank-logo/ubl.png",
		loanName: "Kamiyab Kisaan",
		loanCategory: "Crop Loan",
		loanAmount: "500,000",
		eligibility: "CNIC Front, CNIC Back, Zarai Passbook",
		validTill: "Dec 25, 2025"
	},
	{
		bank: "ZTBL",
		logo: "/bank-logo/ztbl.png",
		loanName: "Khud-Mukhtar Kisaan",
		loanCategory: "Crop Loan",
		loanAmount: "1,500,000",
		eligibility: "CNIC Front, CNIC Back, Zarai Passbook",
		validTill: "Dec 25, 2025"
	},
	{
		bank: "Meezan Bank",
		logo: "/bank-logo/meezan.png",
		loanName: "Fasal Barhao",
		loanCategory: "Crop Loan",
		loanAmount: "1,000,000",
		eligibility: "CNIC Front, CNIC Back, Zarai Passbook",
		validTill: "Dec 25, 2025"
	},
	{
		bank: "Soneri Bank",
		logo: "/bank-logo/soneri.png",
		loanName: "Ba-Shaoor Kisaan",
		loanCategory: "Crop Loan",
		loanAmount: "1,500,000",
		eligibility: "CNIC Front, CNIC Back, Zarai Passbook",
		validTill: "Dec 25, 2025"
	},
	{
		bank: "Summit Bank",
		logo: "/bank-logo/summit.png",
		loanName: "Rahbar Kisaan",
		loanCategory: "Crop Loan",
		loanAmount: "300,000",
		eligibility: "CNIC Front, CNIC Back, Zarai Passbook",
		validTill: "Dec 25, 2025"
	}
];

export default function LoanMarketplacePage() {
	return (
		<div className={styles.page}>
			<h1 className={styles.heading}>Loan Schemes</h1>
			<div className={styles.marketplaceList}>
				{loanData.map((item, idx) => (
					<div className={styles.card} key={item.bank + idx}>
						<Image
							src={item.logo}
							alt={item.bank + " logo"}
							width={80}
							height={80}
							className={styles.logo}
							priority={idx < 2}
						/>
						<div className={styles.details}>
							<div className={styles.detailCol}>
								<span className={styles.label}>Loan Name</span>
								<span className={styles.value}>{item.loanName}</span>
							</div>
							<div className={styles.detailCol}>
								<span className={styles.label}>Loan Category</span>
								<span className={styles.value}>{item.loanCategory}</span>
							</div>
							<div className={styles.detailCol}>
								<span className={styles.label}>Loan Amount</span>
								<span className={styles.value}>{item.loanAmount}</span>
							</div>
							<div className={styles.detailCol}>
								<span className={styles.label}>Eligibility Documents</span>
								<span className={styles.value}>{item.eligibility}</span>
							</div>
							<div className={styles.detailCol}>
								<span className={styles.label}>Valid Till</span>
								<span className={styles.value}>{item.validTill}</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
