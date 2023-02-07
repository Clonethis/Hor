const getUrl = require('getUrl');
const getReferrerUrl = require('getReferrerUrl');
const getQueryParameters = require('getQueryParameters');
const templateStorage = require('templateStorage');
const log = require('logToConsole');
const getTimestampMillis = require('getTimestampMillis');
const getType = require('getType');


log('MH: Session Source Evaluation', data);


const PROCESSED_SOURCES = 'processedSources';
const now = getTimestampMillis();


let respObject = {
    'utm_id': null,
    'source': null,
    'medium': null,
    'campaign': null,
    'source_platform': null,
    'campaign_id': null,
    'term': null,
    'content': null,
    'creative_format': null,
    'marketing_tactic': null,
    'referrer': null,
    'ignore_referrer': null,
    'time': now
};


let result = data.debug_mode ? null : templateStorage.getItem(PROCESSED_SOURCES);
if (result && data.cache_timeout) {
  return (result.time + data.cache_timeout * 1000 > now) ? respObject : result;
}



const comparatorList = ['heureka', 'hledejceny', 'nizkeceny', 'koupe', 'koupis',
    'mojse', 'monitor', 'nakup', 'naakup', 'nejlepsiceny', 'nejnakup', 'nakup',
    'seznamzbozi', 'seznamobchodu', 'najdi', 'najdislevu', 'shopy', 'srovname',
    'srovnanicen', 'zbozi', 'domodi', 'hyperzbozi',
    'shopalike', 'zalevno', 'shop-mania', 'zbozomat', 'najduzbozi'
];


const organicList = [
  'google', 'seznam', 'bing', 'yahoo', 'ask', 'baidu', 'aol', 'daum', 'virgilio', 'biglobe', 'lycos', 'naver', 'yandex', 'duckduckgo', 'ecosia', 'qwant'
];
const localOrganicList = [
  'centrum.cz', 'volny.cz'
];


const gatesList = [
    'paypal.com', 'payu.com', 'secure.avangate.com', 'merchant.webmoney.ru',
    'checkout.wirecard.com', 'worldpay.com', 'ups.com',
    'sofort.com', 'fio.cz', 'mbank.eu', 'internetbanka.cz',
    'mojeplatba.cz', 'erasvet.cz', 'paysec.cz', 'gpesecure.com',
    'i-shop.homecredit.cz', 'gopay', 'gpwebpay', 'servis24.cz',
    'klient1.rb.cz', 'klient2.rb.cz', 'unicreditbanking.net',
    'tatrabanka.sk', 'platebnibrana.csob.cz', 'mbank.pl',
    '3dsecure.mbank', 'bankmillennium.pl', 'online.ingbank.pl',
    'ebank.db-pbc.pl', 'ingbank.pl', 'aliorbank.pl',
    'cap.attempts.securecode.com', '3dsecure2.csas.cz',
    '3dsecure.csas.cz', 'ib24.csob.cz', '3dsecure.slsp.sk',
    'ib.slsp.sk', '3dseure.slsp.sk', 'acs4.3dsecure.no'
];


const socialNetworkList = [
'bubbly', 'caffeine', 'caringbridge', 'clubhouse', 'couchsurfing', 'crunchyroll', 'ello', 'elpha', 'facebook', 'filmaffinity', 'flickr', 'flip', 'foursquare', 'gab', 'getpocket', 'giphy', 'goodreads', 'houseparty', 'imgur', 'influenster', 'instagram', 'italki', 'kuaishou', 'linkedin', 'lnkd', 'medium', 'mewe', 'mocospace', 'netvibes', 'opendiary', 'pavlinaspeaks', 'peanut', 'pinterest', 'plurk', 'polyvore', 'popbase', 'rumble', 'soundcloud', 'steemit', 'tribe', 'triller', 'tumblr', 'twitch', 'twitter', 't', 'valence', 'vimeo', 'vk', 'wattpad', 'wattpad', 'wt', 'wtsocial', 'youtube', 'yubo'
];

/************************/

function loadParam(param) {
    let value = getQueryParameters(param, false);
    return value ? value.toLowerCase() : undefined;
}


function getTaggingErrors(respObject) {
  let errors = [];

  let utmCount = 0;
  if (respObject.medium) utmCount++;
  if (respObject.source) utmCount++;
  if (respObject.campaign) utmCount++;
  if (utmCount > 0 && utmCount < 3) {
    errors.push('Source, medium and campaign are required');
  }
   log("Gettagging errors",respObject,errors);


  return errors;
}


/**
 * Check available data and resolve if source is organic / cpc / social / ...
 *
 * @param object respObject
 * @returns object respObject - the same object, updated
 */
function resolveSources(respObject) {
  
  
    let referrerParts = null;
    let refDomain = null;
    let refDomain2 = null;
    let refDomName = null;
    if (respObject.referrer) {
      referrerParts = respObject.referrer.split('/');
      refDomain = referrerParts[2];                                // www.bbc.co.uk
      refDomain2 = computeEffectiveTldPlusOne(respObject.referrer);// bbc.co.uk
      refDomName = refDomain2 ? refDomain2.split('.')[0] : null;   // bbc
    }
  
  
  
    // UTM PARAMS ARE SET
    if (respObject.medium && respObject.source) {
      return respObject;
    }
  
  
    // FACEBOOK
    if (getQueryParameters('fbclid', false)) {
      respObject.source = 'facebook.com';
      respObject.medium = respObject.medium || data.default_social_network_medium;
      respObject.campaign = respObject.campaign || referrerParts[2];
      return respObject;
    }
  
  
  
    // DIRECT TRAFFIC
    if (!respObject.referrer) {
      return respObject;
    }

  
  
    // CPC
    if (getQueryParameters('gclid', false)) {
      respObject.medium = respObject.medium || 'cpc';
      respObject.source = respObject.source || 'google';
      return respObject;
    }
  
  
    // PAYMENT GATE
    if (gatesList.indexOf(refDomain) > -1 || gatesList.indexOf(refDomain2) > -1) {
      respObject.ignore_referrer = true;
      return respObject;
    }

    
    // PRODUCT COMPARATOR
    if (comparatorList.indexOf(refDomain2) > -1) {
      respObject.medium = respObject.medium || data.default_product_comparator_medium;
      respObject.source = respObject.source ||  refDomain2;
      respObject.campaign = respObject.campaign || refDomain;
      return respObject;
    }


    // FACEBOOK
    if (getQueryParameters('fbclid', false)) {
      respObject.source = 'facebook.com';
      respObject.medium = respObject.medium || data.default_social_network_medium;
      respObject.campaign = respObject.campaign || refDomain;
      return respObject;
    }
  

    // EMAIL
    if (respObject.referrer.indexOf('mail') > -1) {
      respObject.source = respObject.source || data.default_email_other_source;
      respObject.medium = data.default_email_medium;
      return respObject;
    }
  
  
    // SOCIAL NETWORK
    if (socialNetworkList.indexOf(refDomName) > -1) {
      respObject.medium = data.default_social_network_medium;
      respObject.source = refDomain2;
      return respObject;
    }
  
    // SKLIK
    if (respObject.referrer.indexOf('imedia.cz') > -1) {
      respObject.source = respObject.source || 'seznam.cz';
      respObject.medium = respObject.medium || 'cpc';
      if (respObject.referrer.indexOf('hsa.') > -1) {
        respObject.campaign = 'sklik-display-network';
      } else {
        respObject.campaign = respObject.campaign || 'sklik-search';
      }
      return respObject;
    }
  
  
    // MOBILE APPLICATION
    if (respObject.referrer.indexOf('android-app') === 0) {
      respObject.source = respObject.source || refDomain;
      respObject.campaign = respObject.campaign || refDomain;
      respObject.medium = respObject.medium || data.default_mobile_app_medium;
      return respObject;
    }
 

    // ORGANIC
    if (organicList.indexOf(refDomName) > -1) {
      respObject.source = refDomName;
      respObject.medium = 'organic';
      return respObject;
    } else if (localOrganicList.indexOf(refDomain2) > -1) {
      respObject.source = refDomain2;
      respObject.medium = 'organic';
      return respObject;
    }
  
  
    // SAME DOMAIN
    if(data.ignore_subdomain_referrer){
      let currentUrl = getUrl();
      let currentUrlName = computeEffectiveTldPlusOne(currentUrl).slice("."); 
      respObject.ignore_referrer = true;
      if(refDomName === currentUrlName){
        respObject.ignore_referrer = true;
        return respObject;
      }
      else if(refDomain === getUrl()){
        respObject.ignore_referrer = true;
        return respObject;
      }
      return respObject;
    }
    
  
    // EVELUATE CUSTOM REFERRER TABLE
    const referrer_table = data.referrer_table || [];
    for (let i = 0; i < referrer_table.length; i++) {
      let row = data.referrer_table[i];
      if (row.referrer === refDomain2 || row.referrer === refDomain) {
        respObject.medium = row.medium;
        respObject.source = row.source_is_domain ? refDomain2 : row.source;
        return respObject;
      }
    }
  
    return respObject;
}


/**
 * Loads data from UTM and referrer
 *
 * @param object respObject
 * @returns object respObject - the same object, updated
 */
function loadData(respObject) {
  respObject.utm_id = loadParam('utm_id');
  respObject.source = loadParam('utm_source');
  respObject.medium = loadParam('utm_medium');
  respObject.campaign = loadParam('utm_campaign');
  respObject.source_platform = loadParam('utm_source_platform');
  respObject.campaign_id = loadParam('utm_campaign_id');
  respObject.term = loadParam('utm_term');
  respObject.content = loadParam('utm_content');
  respObject.creative_format = loadParam('utm_creative_format');
  respObject.marketing_tactic = loadParam('utm_marketing_tactic');
  respObject.referrer = getReferrerUrl();
  respObject.ignore_referrer = false;
  respObject.time = now;
  return respObject;
}



/**
 * Evaluates efective 2nd level domain. Examples:
 * 
 * http://www.foo.example.com/a?b=c -> example.com
 * www.foo.example.co.uk            -> example.co.uk
 */
function computeEffectiveTldPlusOne(url) {
  if (!url) return;
  let urlParts = url.split('/');
  if (urlParts[0].substring(0, 4) === 'http') {
      urlParts = urlParts.slice(2);

  }
  let domainParts = urlParts[0].split('.');
  let level = (domainParts[domainParts.length - 2] === 'co') ? 3 : 2;
  if (domainParts.length < level) return;
  
  return domainParts.slice(-level).join('.');
}



/**
 * Renames social media 
 */
function filterValues(respObject) {

  if (respObject.medium === 'ppc') {
    respObject.medium = 'cpc';
  }
  if (['email', 'mail', 'e-mail'].indexOf(respObject.medium) > -1) {
    respObject.medium = data.default_email_medium;
  }
  let varSource = computeEffectiveTldPlusOne(respObject.referrer);

  if (varSource === 't.co') {
    respObject.source = 'twitter.com';
  }
  if (varSource === 'lnkd.in') {
    respObject.source = 'linkedin.com';
  }
  if(varSource === 'wt.social'){
    respObject.source = 'wt.social';
  }

  if (respObject.medium !== 'referral' && respObject.source && respObject.source.indexOf('www.') === 0) {
    respObject.source = respObject.source.substring(4);
  }
  if (data.remove_source_1st_level_domain) {
    if(respObject.source){
      let newSource = respObject.source.split('.')[0];
      if (organicList.indexOf(newSource) > -1 || socialNetworkList.indexOf(newSource) > -1) {
        respObject.source = newSource;
      }
    }
  }

  return respObject;
}


/**
 *
 */
function checkTagging(respObject) {  
  // TODO - tests fails here - lock is applied to all tests and mock does not work


  const taggingErrors = getTaggingErrors(respObject);
  log("I did get that many errors: ",taggingErrors);
  if (taggingErrors.length > 0) {
    log('MH: Tagging errors', taggingErrors);
    if (data.error_function && getType(data.error_function) === 'function') {
      data.error_function('tracking/utm', 'Invalid UTM:'+taggingErrors.join(','));
    }
  }
}

/* ********************************************* */

respObject = loadData(respObject);
checkTagging(respObject);
respObject = resolveSources(respObject);
respObject = filterValues(respObject);

if (getType(data.transform_function) === 'function') {
  respObject = data.transform_function(respObject);
}

templateStorage.setItem(PROCESSED_SOURCES, respObject);
return respObject;


/* ********************************************* */