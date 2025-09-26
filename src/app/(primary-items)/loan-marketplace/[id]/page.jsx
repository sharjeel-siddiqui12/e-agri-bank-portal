"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import styles from "./LoanBuying.module.css";
import { Button } from "@/components/ui/button";

// Demo data for loan details - generates dynamic data based on ID
function generateLoanDetails(id) {
  const loanId = `${id}45L3`;
  const askRate = Math.floor(Math.random() * 5) + 4; // 4-8%
  const offerRate = Math.max(1, askRate - Math.floor(Math.random() * 3) - 1); // Always lower than ask
  
  return {
    id: loanId,
    ask: `${askRate}%`,
    offer: `${offerRate}%`
  };
}

export default function LoanBuyingPage() {
  const router = useRouter();
  const params = useParams();
  const loanId = params.id;
  
  const [isPlacingBid, setIsPlacingBid] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Generate loan details dynamically
  const loan = generateLoanDetails(loanId);

  const handleBuy = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Implement buy logic
    console.log("Buying loan:", loan.id);
    alert(`Successfully purchased loan ${loan.id} at ${loan.ask}`);
    
    setIsLoading(false);
    router.back();
  };

  const handlePlaceBid = async () => {
    if (!bidAmount.trim()) {
      alert("Please enter a bid amount");
      return;
    }
    
    const bidValue = parseFloat(bidAmount);
    if (isNaN(bidValue) || bidValue <= 0 || bidValue >= 100) {
      alert("Please enter a valid percentage between 0 and 100");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Implement place bid logic
    console.log("Placing bid for loan:", loan.id, "Amount:", bidAmount);
    alert(`Bid of ${bidAmount}% placed for loan ${loan.id}`);
    
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
          <h1 className={styles.heading}>Loan Buying</h1>
          
          <div className={styles.formGrid}>
            {/* Loan ID Row */}
            <div className={styles.fieldRow}>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Loan ID</label>
                <div className={styles.fieldValue}>
                  {loan.id}
                </div>
              </div>
              
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Ask</label>
                <div className={styles.fieldValue}>
                  {loan.ask}
                </div>
              </div>
            </div>

            {/* Offer Row */}
            <div className={styles.fieldRow}>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Offer</label>
                <div className={styles.fieldValue}>
                  {loan.offer}
                </div>
              </div>
            </div>

            {/* Bid Input (conditional) */}
            {isPlacingBid && (
              <div className={styles.fieldRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Your Bid (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className={styles.bidInput}
                    placeholder="Enter bid percentage"
                    autoFocus
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className={styles.buttonRow}>
              {!isPlacingBid ? (
                <>
                  <Button 
                    onClick={handleBuy}
                    disabled={isLoading}
                    className={styles.buyButton}
                  >
                    {isLoading ? "Processing..." : "Buy"}
                  </Button>
                  
                  <Button 
                    onClick={() => setIsPlacingBid(true)}
                    disabled={isLoading}
                    variant="outline"
                    className={styles.placeBidButton}
                  >
                    Place Bid
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    onClick={handlePlaceBid}
                    disabled={isLoading || !bidAmount.trim()}
                    className={styles.submitBidButton}
                  >
                    {isLoading ? "Submitting..." : "Submit Bid"}
                  </Button>
                  
                  <Button 
                    onClick={() => {
                      setIsPlacingBid(false);
                      setBidAmount("");
                    }}
                    disabled={isLoading}
                    variant="outline"
                    className={styles.cancelButton}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}