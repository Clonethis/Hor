if (respObject.medium === "ppc") {
  respObject.medium = "cpc";
}
if (["email", "mail", "e-mail"].indexOf(respObject.medium) > -1) {
  respObject.medium = data.default_email_medium;
}
let varSource = computeEffectiveTldPlusOne(respObject.referrer);
log("varSource", varSource, respObject, getUrl());
// SOURCES
var isCampaign = currentUrlHasUtm(getUrl());
if (varSource === "t.co") {
  respObject.source = "twitter.com";
  respObject.medium = "social";
}
if (varSource === "lnkd.in") {
  respObject.source = "linkedin.com";
  respObject.medium = "social";
}
if (varSource === "wt.social") {
  respObject.source = "wt.social";
  respObject.medium = "social";
}

if (data.remove_source_1st_level_domain) {
  if (varSource === "t.co") {
    respObject.source = "twitter";
    respObject.medium = "social";
  }
  if (varSource === "lnkd.in") {
    respObject.source = "linkedin";
    respObject.medium = "social";
  }
  if (varSource === "wt.social") {
    respObject.source = "wt";
    respObject.medium = "social";
  }
}
if (
  respObject.medium !== "referral" &&
  respObject.source &&
  respObject.source.indexOf("www.") === 0
) {
  respObject.source = respObject.source.substring(4);
}

return respObject;
