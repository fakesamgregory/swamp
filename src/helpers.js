export const numberFormat = function (
  num = 0,
  decimals = 0,
  dec_point,
  thousands_sep
) {
  dec_point = typeof dec_point !== "undefined" ? dec_point : ".";
  thousands_sep = typeof thousands_sep !== "undefined" ? thousands_sep : ",";

  var parts = num.toFixed(decimals).split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_sep);

  return parts.join(dec_point);
};

export const parents = function (el, selector) {
  if (el.parentElement) {
    if (el.parentElement.matches(selector)) {
      return el.parentElement;
    }
    return el.parentElement.parents(selector);
  }
  return null;
};
