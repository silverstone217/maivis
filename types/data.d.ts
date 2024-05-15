export enum paymentOptions {
  mpesa = "mpesa",
  cash = "cash",
  paypal = "paypal",
  creditCard = "creditCard",
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
