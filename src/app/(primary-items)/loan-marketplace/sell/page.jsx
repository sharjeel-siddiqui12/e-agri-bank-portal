"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./LoanSelling.module.css";
import { Button } from "@/components/ui/button";

// Demo data for loan selling
function generateSellingLoanData() {
  const loanId = `1245L3`;
  const currentRate = Math.floor(Math.random() * 4) + 6; // 6-9%
  const askRate = Math.max(1, currentRate - Math.floor(Math.random() * 3) - 1); // Always lower than current rate
  
  return {
    id: loanId,
    currentRate: `${currentRate}%`,
    askRate: `${askRate}%`
  };
}

export default function LoanSellingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  // Generate loan selling data
  const loan = generateSellingLoanData();
  
  // Initialize ask rate with default value
  const [askRate, setAskRate] = useState(loan.askRate.replace('%', ''));

  const handleSell = async () => {
    if (!askRate.trim()) {
      alert("Please enter an ask rate");
      return;
    }
    
    const askValue = parseFloat(askRate);
    if (isNaN(askValue) || askValue <= 0 || askValue >= 100) {
      alert("Please enter a valid percentage between 0 and 100");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Implement sell logic
    console.log("Selling loan:", loan.id, "Ask rate:", askRate);
    alert(`Loan ${loan.id} listed for sale at ${askRate}%`);
    
    setIsLoading(false);
    router.back();
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className={styles.bg}>
      <div className={styles.wrapper}>
        {/* Back Button */}
        <button onClick={handleBack} className={styles.backBtn}>
          ← Back to Marketplace
        </button>

        {/* Main Content */}
        <div className={styles.container}>
          <h1 className={styles.heading}>Loan Selling</h1>
          
          <div className={styles.formGrid}>
            {/* First Row - Current Rate and Loan ID */}
            <div className={styles.fieldRow}>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Loan Current rate</label>
                <div className={styles.fieldValue}>
                  {loan.currentRate}
                </div>
              </div>
              
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Loan ID</label>
                <div className={styles.fieldValue}>
                  {loan.id}
                </div>
              </div>
            </div>

            {/* Second Row - Ask Rate */}
            <div className={styles.fieldRow}>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Ask</label>
                <div className={styles.askInputContainer}>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    value={askRate}
                    onChange={(e) => setAskRate(e.target.value)}
                    className={styles.askInput}
                    placeholder="Enter ask rate"
                  />
                  <span className={styles.percentSymbol}>%</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className={styles.buttonRow}>
              <Button 
                onClick={handleSell}
                disabled={isLoading || !askRate.trim()}
                className={styles.sellButton}
              >
                {isLoading ? "Processing..." : "Sell"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}