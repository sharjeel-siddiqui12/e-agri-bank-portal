"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import styles from "../PreferredVendorApproval.module.css";

export default function VendorDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const vendor = useMemo(() => {
    return {
      productId: searchParams.get("productId") || "",
      productName: searchParams.get("productName") || "",
      inputType: searchParams.get("inputType") || "",
      preferredVendor: searchParams.get("preferredVendor") || "",
      bankCommission: searchParams.get("bankCommission") || "2.00",
      createdDate: searchParams.get("createdDate") || "",
      lastModifiedDate: searchParams.get("lastModifiedDate") || "",
      approvedBy: searchParams.get("approvedBy") || "",
      status: searchParams.get("status") || "Pending",
      isPublished: (searchParams.get("isPublished") || "false") === "true",
    };
  }, [searchParams]);

  const [isApproved, setIsApproved] = useState(vendor.status === "Approved");
  const [isPublished, setIsPublished] = useState(vendor.isPublished);

  const handleSave = () => {
    const raw = (typeof window !== "undefined" && localStorage.getItem("vendorApprovalUpdates")) || "[]";
    let updates = [];
    try {
      updates = JSON.parse(raw);
    } catch {
      updates = [];
    }
    updates.push({
      vendorId: parseInt(searchParams.get("id")),
      isApproved,
      isPublished,
      savedAt: Date.now(),
    });
    localStorage.setItem("vendorApprovalUpdates", JSON.stringify(updates));
    router.push("/preferred-vendor-setup-approval");
  };

  return (
    <div className={styles.detailPage}>
      <h1 className={styles.detailHeading}>Preferred Vendor Setup - Details</h1>
      <div className={styles.productName}>{vendor.productName || vendor.productId}</div>

      <div className={styles.detailCard}>
        <div className={styles.detailGrid}>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Product ID</div>
            <div className={styles.detailValue}>{vendor.productId}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Product Name</div>
            <div className={styles.detailValue}>{vendor.productName}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Input Type</div>
            <div className={styles.detailValue}>{vendor.inputType}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Preferred Vendor</div>
            <div className={styles.detailValue}>{vendor.preferredVendor}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Bank Commission</div>
            <div className={styles.detailValue}>{vendor.bankCommission}%</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Created Date</div>
            <div className={styles.detailValue}>{vendor.createdDate}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Last Modified Date</div>
            <div className={styles.detailValue}>{vendor.lastModifiedDate}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Approved By</div>
            <div className={styles.detailValue}>{vendor.approvedBy}</div>
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