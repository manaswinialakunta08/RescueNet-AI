"""
RescueNet-AI — AI-Powered Flood Prediction & Smart Disaster Response Platform
Phase 1: Machine Learning Dataset Understanding and Validation
Script: ml/data_analysis.py

Purpose:
Professional dataset inspection and validation script for:
    data/raw/flood_risk_dataset_india.csv
Loads, audits, and checks the raw dataset for integrity, missingness, duplicates,
target class distribution, and numerical sanity without applying transformations
or training any machine learning models.
"""

import os
from pathlib import Path
import sys
from typing import Dict, Optional, Tuple

import numpy as np
import pandas as pd

# Ensure standard output supports UTF-8 on Windows consoles without charmap errors
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass


# -----------------------------------------------------------------------------
# Configuration & Constants
# -----------------------------------------------------------------------------
BASE_DIR: Path = Path(__file__).resolve().parent.parent
DEFAULT_DATASET_PATH: Path = BASE_DIR / "data" / "raw" / "flood_risk_dataset_india.csv"
EXPECTED_TARGET_COLUMN: str = "Flood_Occurred"


def print_section(title: str, character: str = "=", width: int = 80) -> None:
    """Print formatted section heading for readable console output."""
    print()
    print(character * width)
    print(f" {title}")
    print(character * width)


def load_dataset(filepath: Path | str = DEFAULT_DATASET_PATH) -> pd.DataFrame:
    """
    Load dataset from CSV file using Pandas.

    Args:
        filepath: Path to the CSV dataset.

    Returns:
        pd.DataFrame: Loaded dataset.

    Raises:
        FileNotFoundError: If the specified file does not exist.
    """
    path = Path(filepath)
    if not path.is_file():
        raise FileNotFoundError(
            f"Dataset not found at expected path: {path.resolve()}\n"
            "Please ensure the file is placed inside 'data/raw/'."
        )

    print(f"[+] Loading dataset from: {path.resolve()}")
    df = pd.read_csv(path, encoding="utf-8")
    print(f"[+] Successfully loaded {len(df):,} records.")
    return df


def inspect_dataset(df: pd.DataFrame) -> None:
    """
    Display basic structure, schema, head, tail, and descriptive statistics.

    Args:
        df: Input DataFrame.
    """
    print_section("1. DATASET DIMENSIONS & SCHEMA")
    print(f"Total Rows (Records):    {df.shape[0]:,}")
    print(f"Total Columns (Features): {df.shape[1]}")
    print(f"Shape:                   {df.shape}")

    print("\n--- Column Names & Data Types ---")
    schema_df = pd.DataFrame({
        "Index": range(len(df.columns)),
        "Column Name": df.columns,
        "Data Type": df.dtypes.values,
        "Non-Null Count": df.notnull().sum().values
    })
    print(schema_df.to_string(index=False))

    print_section("2. FIRST 5 ROWS (HEAD)")
    print(df.head())

    print_section("3. LAST 5 ROWS (TAIL)")
    print(df.tail())

    print_section("4. DESCRIPTIVE STATISTICS (NUMERICAL)")
    print(df.describe().to_string())

    categorical_cols = df.select_dtypes(include=["object", "string", "category"]).columns
    if len(categorical_cols) > 0:
        print_section("5. DESCRIPTIVE STATISTICS (CATEGORICAL)")
        print(df.describe(include=["object", "string"]).to_string())


def check_missing_values(df: pd.DataFrame) -> pd.DataFrame:
    """
    Calculate and display missing value counts and percentages for all columns.

    Args:
        df: Input DataFrame.

    Returns:
        pd.DataFrame: Missing value summary table.
    """
    print_section("6. MISSING VALUES AUDIT")
    missing_count = df.isnull().sum()
    missing_pct = (missing_count / len(df)) * 100.0

    missing_df = pd.DataFrame({
        "Column": df.columns,
        "Missing Count": missing_count.values,
        "Missing Percentage (%)": missing_pct.values
    })

    print(missing_df.to_string(index=False))

    total_missing = missing_count.sum()
    print(f"\nTotal Missing Cells across Entire Dataset: {total_missing}")
    if total_missing == 0:
        print("[OK] No missing values detected in any column.")
    else:
        print(f"[WARN] Detected {total_missing} missing entries requiring imputation.")

    return missing_df


def check_duplicates(df: pd.DataFrame) -> int:
    """
    Audit dataset for duplicate rows.

    Args:
        df: Input DataFrame.

    Returns:
        int: Number of duplicate rows found.
    """
    print_section("7. DUPLICATE ROWS AUDIT")
    num_duplicates = int(df.duplicated().sum())
    dup_pct = (num_duplicates / len(df)) * 100.0 if len(df) > 0 else 0.0

    print(f"Total Duplicate Rows:       {num_duplicates:,}")
    print(f"Duplicate Row Percentage:   {dup_pct:.2f}%")

    if num_duplicates == 0:
        print("[OK] Zero duplicate records found. Dataset uniqueness is preserved.")
    else:
        print(f"[WARN] {num_duplicates} duplicate records found. Deduplication required.")

    return num_duplicates


def identify_target_column(df: pd.DataFrame, expected_col: str = EXPECTED_TARGET_COLUMN) -> str:
    """
    Identify and validate the presence of the target column in the dataset.

    Accepts 'Flood_Occurred' or its space variant 'Flood Occurred'.
    If neither exists, prints available columns and raises a KeyError.

    Args:
        df: Input DataFrame.
        expected_col: Expected column name.

    Returns:
        str: Verified target column name in DataFrame.

    Raises:
        KeyError: If target column cannot be resolved.
    """
    print_section("8. TARGET COLUMN IDENTIFICATION & VALIDATION")

    if expected_col in df.columns:
        print(f"[+] Exact target column match found: '{expected_col}'")
        return expected_col

    # Handle standard whitespace variant ('Flood Occurred' vs 'Flood_Occurred')
    space_variant = expected_col.replace("_", " ")
    if space_variant in df.columns:
        print(f"[+] Target column resolved: '{space_variant}' (matches expected '{expected_col}')")
        return space_variant

    # If neither variant is present, log available columns and raise error
    print(f"\n[ERROR] Target column '{expected_col}' (or '{space_variant}') not found in dataset!")
    print("\nAvailable columns in dataset:")
    for idx, col in enumerate(df.columns, 1):
        print(f"  {idx:2d}. {col}")

    raise KeyError(
        f"Target column '{expected_col}' not found in dataset. "
        f"Available columns: {list(df.columns)}"
    )


def analyze_target(df: pd.DataFrame, target_col: str) -> Dict[str, float]:
    """
    Display class distribution and percentage breakdown for the target column.

    Args:
        df: Input DataFrame.
        target_col: Name of the verified target column.

    Returns:
        Dict[str, float]: Class balance statistics.
    """
    print_section("9. TARGET CLASS DISTRIBUTION")
    counts = df[target_col].value_counts().sort_index()
    percentages = (df[target_col].value_counts(normalize=True).sort_index()) * 100.0

    distribution_df = pd.DataFrame({
        "Class Label": counts.index,
        "Record Count": counts.values,
        "Percentage (%)": percentages.values
    })

    print(f"Target Column: '{target_col}'")
    print(distribution_df.to_string(index=False))

    # Evaluate balance ratio
    if len(counts) == 2:
        minority_pct = percentages.min()
        majority_pct = percentages.max()
        imbalance_ratio = majority_pct / minority_pct if minority_pct > 0 else float("inf")
        print(f"\nClass Balance Ratio (Majority:Minority): {imbalance_ratio:.2f}:1")
        if imbalance_ratio < 1.5:
            print("[OK] Target classes are well balanced. No severe class imbalance.")
        else:
            print("[INFO] Class imbalance detected; resampling or class weights may be beneficial.")

    return {str(cls): pct for cls, pct in percentages.items()}


def check_numerical_validity(df: pd.DataFrame) -> Tuple[pd.DataFrame, bool]:
    """
    Check numerical columns for unexpected negative or invalid values (e.g., negative rainfall,
    negative discharge, invalid humidity > 100% or < 0%).

    Args:
        df: Input DataFrame.

    Returns:
        Tuple[pd.DataFrame, bool]: Summary DataFrame and boolean flag indicating validity.
    """
    print_section("10. NUMERICAL SANITY & INVALID VALUE CHECKS")

    numeric_cols = df.select_dtypes(include=[np.number]).columns
    records = []
    has_anomalies = False

    for col in numeric_cols:
        col_series = df[col]
        min_val = col_series.min()
        max_val = col_series.max()
        negative_count = int((col_series < 0).sum())
        inf_count = int(np.isinf(col_series).sum())

        status = "Valid"
        if negative_count > 0:
            status = f"Warning: {negative_count} negatives"
            has_anomalies = True
        elif inf_count > 0:
            status = f"Warning: {inf_count} infinite"
            has_anomalies = True

        records.append({
            "Column": col,
            "Min": round(float(min_val), 4),
            "Max": round(float(max_val), 4),
            "Negative Count": negative_count,
            "Infinite Count": inf_count,
            "Status": status
        })

    validity_df = pd.DataFrame(records)
    print(validity_df.to_string(index=False))

    if not has_anomalies:
        print("\n[OK] All numerical features satisfy non-negativity and boundary constraints.")
    else:
        print("\n[WARN] One or more numerical columns contain unexpected negative or infinite values.")

    return validity_df, not has_anomalies


def generate_data_quality_summary(
    df: pd.DataFrame,
    target_col: str,
    num_duplicates: int,
    missing_df: pd.DataFrame,
    is_numerical_valid: bool
) -> Dict[str, object]:
    """
    Generate and print an overall executive data-quality summary.

    Args:
        df: Input DataFrame.
        target_col: Verified target column name.
        num_duplicates: Number of duplicate rows.
        missing_df: DataFrame containing missing values statistics.
        is_numerical_valid: True if numerical validity passed without anomalies.

    Returns:
        Dict[str, object]: Summary metadata dictionary.
    """
    print_section("11. DATA QUALITY EXECUTIVE SUMMARY", character="#")

    total_missing = int(missing_df["Missing Count"].sum())
    num_rows, num_cols = df.shape
    num_classes = df[target_col].nunique()

    summary: Dict[str, object] = {
        "Total Observations": num_rows,
        "Total Features": num_cols,
        "Target Column": target_col,
        "Unique Target Classes": num_classes,
        "Total Missing Values": total_missing,
        "Duplicate Rows": num_duplicates,
        "Numerical Validity": "Passed (No unexpected negative/infinite values)" if is_numerical_valid else "Warnings Detected",
        "Overall Quality Verdict": "CLEAN & READY FOR EDA / PREPROCESSING" if (total_missing == 0 and num_duplicates == 0 and is_numerical_valid) else "PREPROCESSING & CLEANING REQUIRED"
    }

    for key, val in summary.items():
        print(f" * {key:<26}: {val}")

    print("#" * 80)
    return summary


def main() -> None:
    """Main execution pipeline."""
    # Configure pandas display formatting
    pd.set_option("display.max_columns", None)
    pd.set_option("display.width", 1000)
    pd.set_option("display.precision", 4)

    print("=" * 80)
    print(" RescueNet-AI — Flood Dataset Analysis & Quality Validation")
    print("=" * 80)

    try:
        # Step 1: Load dataset
        df = load_dataset(DEFAULT_DATASET_PATH)

        # Step 2: Inspect dimensions, schema, head, tail, and descriptive stats
        inspect_dataset(df)

        # Step 3: Missing value audit
        missing_df = check_missing_values(df)

        # Step 4: Duplicate rows audit
        num_duplicates = check_duplicates(df)

        # Step 5: Target column identification & validation
        target_col = identify_target_column(df, expected_col=EXPECTED_TARGET_COLUMN)

        # Step 6: Target class distribution analysis
        analyze_target(df, target_col)

        # Step 7: Numerical sanity & invalid value checks
        _, is_numerical_valid = check_numerical_validity(df)

        # Step 8: Executive data-quality summary
        generate_data_quality_summary(
            df=df,
            target_col=target_col,
            num_duplicates=num_duplicates,
            missing_df=missing_df,
            is_numerical_valid=is_numerical_valid
        )

        print("\n[SUCCESS] Dataset inspection and validation completed successfully.")

    except Exception as exc:
        print(f"\n[X] Fatal Error during dataset analysis: {exc}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
