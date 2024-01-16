export interface DataType {
  type?: string | null;
  idealHourlyRate?: number | FormDataEntryValue | null;
  gigPayment?: number | FormDataEntryValue | null;
  gigHours?: number | FormDataEntryValue | null;
  mileage?: number | FormDataEntryValue | null;
  babysittingHours?: number | FormDataEntryValue | null;
  babysittingHourlyRate?: number | FormDataEntryValue | null;
  gasCost?: number | FormDataEntryValue | null;
  babysittingCost?: number | FormDataEntryValue | null;
  totalCost?: number | FormDataEntryValue | null;
  hopefulIncomePreExpense?: number | FormDataEntryValue | null;
  hopefulIncomeTotal?: number | FormDataEntryValue | null;
  difference?: number | FormDataEntryValue | null;
}

export interface Errors {
  type?: string | null;
  idealHourlyRate?: string | null;
  gigPayment?: string | null;
  gigHours?: string | null;
  mileage?: string | null;
  babysittingHours?: string | null;
  babysittingHourlyRate?: string | null;
  gasCost?: string | null;
  babysittingCost?: string | null;
  totalCost?: string | null;
  hopefulIncomePreExpense?: string | null;
  hopefulIncomeTotal?: string | null;
  difference?: string | null;
}

export interface FetcherData {
  errors?: Errors;
}
