export type AnalyticsEvent =
  | "whatsapp_click"
  | "quote_click"
  | "price_list_submit"
  | "contact_form_submit"
  | "search_submit"
  | "filter_apply";

export type AnalyticsParams = Record<
  string,
  string | number | boolean | undefined
>;
