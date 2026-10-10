
protect();shell("Properties");

const id=new URLSearchParams(location.search).get("id"),p=getProperties().find(x=>x.id===id)||getProperties()[0];
const d=document.getElementById("detailPage");
if(!p)d.innerHTML="<div class='form-card'>Property not found.</div>";
else d.innerHTML=`<a href="properties.html" class="detail-back">← Back to properties</a><div class="detail-hero">
<div class="detail-photo">
<img src="${p.image}" alt="${p.title}">
</div>
<div class="detail-card">
<span class="eyebrow">
${p.purpose} • ${p.type}
</span><h1>${p.title}
</h1><p>⌖ ${p.area}, ${p.city}
</p><div class="price">
${money(p.price)}${p.purpose==="For Rent"?"/month":""}
</div>
<div class="detail-specs">
<div class="detail-spec">
<small>Bedrooms</small><b>
${p.beds}
</b></div>
<div class="detail-spec">
<small>Bathrooms</small><b>
${p.baths}
</b></div>
<div class="detail-spec">
<small>Area</small><b>${p.sqft} ft²</b>
</div>
<div class="detail-spec">
<small>Listing</small>
<b>Verified</b>
</div></div>
<p class="detail-description">${p.description}</p>
<div class="detail-actions">
<button class="btn btn-primary" onclick="toast('Enquiry sent successfully!')">Contact owner</button>
<a class="btn btn-glass" href="map.html">View map</a>
</div>
</div>
</div>`;
