export enum paymentOptions {
  mobile = "mobile",
  cash = "cash",
  paypal = "paypal",
  creditCard = "creditCard",
  all = "all",
}

export enum paymentMoment {
  before = "before",
  after = "after",
  all = "all",
}

export enum paymentStatus {
  paid = "paid",
  unpaid = "unpaid",
}
export type statusOptions =
  | "en attente"
  | "annule"
  | "accepte"
  | "refuse"
  | "reporte"
  | "";
