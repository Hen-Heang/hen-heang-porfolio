// The only account allowed into the admin UI. The real security boundary is
// the portfolio_is_owner() RLS check in the database — this constant just
// keeps the UI honest.
export const OWNER_EMAIL = "henheang15@gmail.com"
