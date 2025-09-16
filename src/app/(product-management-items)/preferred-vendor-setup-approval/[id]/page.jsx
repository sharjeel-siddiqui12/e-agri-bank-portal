"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import styles from "../PreferredVendorApproval.module.css";

export default function PreferredVendorDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const data = useMemo(() => {
    return {
      recordKey: searchParams.get("recordKey") || "", // productId|inputType|preferredVendor
      productId: searchParams.get("productId") || "",
      productName: searchParams.get("productName") || "",
      inputType: searchParams.get("inputType") || "",
      preferredVendor: searchParams.get("preferredVendor") || "",
      createdDate: searchParams.get("createdDate") || "",
      lastModifiedDate: searchParams.get("lastModifiedDate") || "",
      approvedBy: searchParams.get("approvedBy") || "",
      status: searchParams.get("status") || "Pending",
      isPublished: (searchParams.get("isPublished") || "false") === "true",
      readOnly: (searchParams.get("readOnly") || "false") === "true"
    };
  }, [searchParams]);

  const [isApproved, setIsApproved] = useState(data.status === "Approved");
  const [isPublished, setIsPublished] = useState(data.isPublished);

  const handleSave = () => {
    // queue update for the list page
    const raw = (typeof window !== "undefined" && localStorage.getItem("productApprovalUpdates")) || "[]";
    let updates = [];
    try {
      updates = JSON.parse(raw);
    } catch {
      updates = [];
    }

    updates.push({
      recordKey: data.recordKey,
      isApproved,
      isPublished,
      savedAt: Date.now()
    });

    localStorage.setItem("productApprovalUpdates", JSON.stringify(updates));

    // add a cache-busting ts so the list page re-runs its effect reliably
    router.push(`/preferred-vendor-setup-approval?ts=${Date.now()}`);
  };

  return (
    <div className={styles.detailPage}>
      <h1 className={styles.detailHeading}>Preferred Vendor - Details</h1>
      <div className={styles.productName}>{data.productName || data.productId}</div>

      <div className={styles.detailCard}>
        <div className={styles.detailGrid}>
          {/* Row 1 */}
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Product ID</div>
            <div className={styles.detailValue}>{data.productId || "-"}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Loan Name:</div>
            <div className={styles.detailValue}>{(data.productName && `${data.productName} Farmer Loan`) || "Khush-haal Farmer Loan"}</div>
          </div>

          {/* Row 2 */}
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Category:</div>
            <div className={styles.detailValue}>Agriculture</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Sub-Category:</div>
            <div className={styles.detailValue}>Agri Input Loan</div>
          </div>

          {/* Row 3 */}
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Eligible Agri Inputs</div>
            <div className={styles.detailValue}>{data.inputType ? `${data.inputType}, Seeds, Pesticides` : "Fertilizer, Seeds, Pesticides"}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Eligible Crops</div>
            <div className={styles.detailValue}>Wheat, Maize, Pesticides</div>
          </div>

          {/* Row 4 */}
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Geolocation:</div>
            <div className={styles.detailValue}>Punjab, Sindh</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Loan Term:</div>
            <div className={styles.detailValue}>6 Months</div>
          </div>

          {/* Row 5 */}
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Loan Minimum Value</div>
            <div className={styles.detailValue}>100,000</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Loan Maximum Value:</div>
            <div className={styles.detailValue}>1,500,000 PKR</div>
          </div>

          {/* Row 6 */}
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Interest Mode:</div>
            <div className={styles.detailValue}>Fixed</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Interest Rate:</div>
            <div className={styles.detailValue}>8%</div>
          </div>

          {/* Row 7 */}
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Interest Tenure</div>
            <div className={styles.detailValue}>Crop Cycle</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Security Status:</div>
            <div className={styles.detailValue}>No Collateral</div>
          </div>

          {/* Row 8 */}
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Charge:</div>
            <div className={styles.detailValue}>1st charge on underlying crops</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Repayment Cycle</div>
            <div className={styles.detailValue}>Once</div>
          </div>

          {/* Row 9 */}
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Bank Processing Fee</div>
            <div className={styles.detailValue}>2%</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Offer Valid Date:</div>
            <div className={styles.detailValue}>Dec 25, 2025</div>
          </div>
        </div>

        {/* Documents Required */}
        <div className={styles.detailItem} style={{ marginTop: 8 }}>
          <div className={styles.detailLabel}>Documents Required</div>
          <div className={styles.detailValue} style={{ fontWeight: 400 }}>
            <ol style={{ paddingLeft: 20, margin: 0, color: "#374151", fontSize: "0.875rem" }}>
              <li>CNIC Front</li>
              <li>CNIC Back</li>
              <li>Zarai Passbook</li>
              <li>Fard Inteqal</li>
              <li>Khasra Girdawari</li>
              <li>Tenancy Agreement</li>
              <li>Aks Shajra</li>
            </ol>
          </div>
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
                  disabled={data.readOnly}
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
                  disabled={data.readOnly}
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
                  disabled={data.readOnly}
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
                  disabled={data.readOnly}
                  onChange={() => setIsPublished(false)}
                />
                <span className={styles.radioLabel}>No</span>
              </label>
            </div>
          </div>

          {!data.readOnly && (
            <button className={styles.saveBtn} onClick={handleSave}>Save</button>
          )}
        </div>
      </div>
    </div>
  );
}
 