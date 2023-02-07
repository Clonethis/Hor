
const socialNetworkAltNames = {
  "twitter.com":["t","twitter.com",],
  "linkedin.com":["lnkd.in","l"],
  "pinterest.com":["pin"],
  "instagram.com":["ig"],
  "youtube.com":["youtu","yt"],
};

/************************/
function isSocialMediaShortened(link){
  const domName = respObject.refDomName;
  for (const key in socialNetworkAltNames) {
    const altNames = socialNetworkAltNames[key];
    
    altNames.forEach(altName=>{
      if(altName===link)
        return true;
      }
    )
    
  }
}
isSocialMediaShortened("fb");
isSocialMediaShortened("fb.nice");
isSocialMediaShortened("www.fb.nice");
isSocialMediaShortened("www.social.fb.nice");
isSocialMediaShortened("https://www.fb.nice");
isSocialMediaShortened("https://social.fb.nice");
isSocialMediaShortened("https://social.fb.nice/hoteu/oetu");