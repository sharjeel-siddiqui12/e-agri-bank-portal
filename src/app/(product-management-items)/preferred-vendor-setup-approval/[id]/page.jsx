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
    router.push(`/preferred-vendor-setup-approval-copy?ts=${Date.now()}`);
  };

  return (
    <div className={styles.detailPage}>
      <h1 className={styles.detailHeading}>Preferred Vendor - Details</h1>
      <div className={styles.productName}>{data.productName || data.productId}</div>

      <div className={styles.detailCard}>
        <div className={styles.detailGrid}>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Product ID</div>
            <div className={styles.detailValue}>{data.productId || "-"}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Product Name</div>
            <div className={styles.detailValue}>{data.productName || "-"}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Input Type</div>
            <div className={styles.detailValue}>{data.inputType || "-"}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Preferred Vendor</div>
            <div className={styles.detailValue}>{data.preferredVendor || "-"}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Created date</div>
            <div className={styles.detailValue}>{data.createdDate || "-"}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Last Modified date</div>
            <div className={styles.detailValue}>{data.lastModifiedDate || "-"}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Approved by</div>
            <div className={styles.detailValue}>{data.approvedBy || "-"}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Status</div>
            <div className={styles.detailValue}>{data.status || "-"}</div>
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
 