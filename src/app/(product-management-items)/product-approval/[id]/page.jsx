"use client";


import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import styles from "../ProductApproval.module.css";


function ProductDetailPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const product = useMemo(() => {
    const documentsRaw = searchParams.get("documentsRequired");
    let documentsRequired = [];
    try {
      documentsRequired = documentsRaw ? JSON.parse(documentsRaw) : [];
    } catch (_) {
      documentsRequired = [];
    }

    return {
      productId: searchParams.get("productId") || "",
      bankName: searchParams.get("bankName") || "",
      productName: searchParams.get("productName") || "",
      category: searchParams.get("category") || "",
      subCategory: searchParams.get("subCategory") || "",
      eligibleAgriInputs: searchParams.get("eligibleAgriInputs") || "",
      eligibleCrops: searchParams.get("eligibleCrops") || "",
      geolocation: searchParams.get("geolocation") || "",
      loanTerm: searchParams.get("loanTerm") || "",
      minValue: searchParams.get("minValue") || "",
      maxValue: searchParams.get("maxValue") || "",
      interestMode: searchParams.get("interestMode") || "",
      interestRate: searchParams.get("interestRate") || "",
      interestTenure: searchParams.get("interestTenure") || "",
      securityStatus: searchParams.get("securityStatus") || "",
      charge: searchParams.get("charge") || "",
      bankProcessingFee: searchParams.get("bankProcessingFee") || "",
      repaymentCycle: searchParams.get("repaymentCycle") || "",
      offerValidDate: searchParams.get("offerValidDate") || "",
      documentsRequired,
      status: searchParams.get("status") || "Pending",
      isPublished: (searchParams.get("isPublished") || "false") === "true",
    };
  }, [searchParams]);

  const [isApproved, setIsApproved] = useState(product.status === "Approved");
  const [isPublished, setIsPublished] = useState(product.isPublished);

  const handleSave = () => {
    const raw = (typeof window !== "undefined" && localStorage.getItem("productApprovalUpdates")) || "[]";
    let updates = [];
    try {
      updates = JSON.parse(raw);
    } catch {
      updates = [];
    }
    updates.push({
      productId: product.productId,
      isApproved,
      isPublished,
      savedAt: Date.now(),
    });
    localStorage.setItem("productApprovalUpdates", JSON.stringify(updates));
    router.push("/product-approval");
  };

  return (
    <div className={styles.detailPage}>
      <h1 className={styles.detailHeading}>Loan Product - Details</h1>
      <div className={styles.productName}>{product.productName || product.productId}</div>

      <div className={styles.detailCard}>
        <div className={styles.detailGrid}>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Bank Name</div>
            <div className={styles.detailValue}>{product.bankName || "-"}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Product ID</div>
            <div className={styles.detailValue}>{product.productId}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Category</div>
            <div className={styles.detailValue}>{product.category}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Sub-Category</div>
            <div className={styles.detailValue}>{product.subCategory}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Interest</div>
            <div className={styles.detailValue}>{product.interestRate}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Tenure</div>
            <div className={styles.detailValue}>{product.interestTenure}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Security Status</div>
            <div className={styles.detailValue}>{product.securityStatus}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Geo-Location</div>
            <div className={styles.detailValue}>{product.geolocation || "-"}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Loan Term</div>
            <div className={styles.detailValue}>{product.loanTerm || "-"}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Min-Max</div>
            <div className={styles.detailValue}>{[product.minValue, product.maxValue].filter(Boolean).join(" — ") || "-"}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Interest Mode</div>
            <div className={styles.detailValue}>{product.interestMode || "-"}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Processing Fee</div>
            <div className={styles.detailValue}>{product.bankProcessingFee || "-"}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Repayment Cycle</div>
            <div className={styles.detailValue}>{product.repaymentCycle || "-"}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Offer Valid Till</div>
            <div className={styles.detailValue}>{product.offerValidDate || "-"}</div>
          </div>
        </div>

        <div className={styles.documentsSection}>
          <div className={styles.documentsHeading}>Required Documents</div>
          <ol className={styles.documentsList}>
            {product.documentsRequired && product.documentsRequired.length > 0 ? (
              product.documentsRequired.map((doc, idx) => (
                <li key={idx}>{doc}</li>
              ))
            ) : (
              <li>No documents listed</li>
            )}
          </ol>
        </div>

        <div className={styles.statusSection}>
          <div className={styles.statusGroup}>
            <div className={styles.statusGroupLabel}>Is Approved?</div>
            <div className={styles.radioGroup}>
              <label className={styles.radioItem}>
                <input
                  type="radio"
                  name="isApproved"
                  className={styles.radioInput}
                  checked={isApproved === true}
                  onChange={() => setIsApproved(true)}
                />
                <span className={styles.radioLabel}>Yes</span>
              </label>
              <label className={styles.radioItem}>
                <input
                  type="radio"
                  name="isApproved"
                  className={styles.radioInput}
                  checked={isApproved === false}
                  onChange={() => setIsApproved(false)}
                />
                <span className={styles.radioLabel}>No</span>
              </label>
            </div>
          </div>

          <div className={styles.statusGroup}>
            <div className={styles.statusGroupLabel}>Is Published?</div>
            <div className={styles.radioGroup}>
              <label className={styles.radioItem}>
                <input
                  type="radio"
                  name="isPublished"
                  className={styles.radioInput}
                  checked={isPublished === true}
                  onChange={() => setIsPublished(true)}
                />
                <span className={styles.radioLabel}>Yes</span>
              </label>
              <label className={styles.radioItem}>
                <input
                  type="radio"
                  name="isPublished"
                  className={styles.radioInput}
                  checked={isPublished === false}
                  onChange={() => setIsPublished(false)}
                />
                <span className={styles.radioLabel}>No</span>
              </label>
            </div>
          </div>

          <button className={styles.saveBtn} onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense>
      <ProductDetailPageInner />
    </Suspense>
  );
}

 
