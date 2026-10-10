
protect();
shell("Properties");
const params=new URLSearchParams(location.search);
const search=document.getElementById("propertySearch"),
type=document.getElementById("typeFilter"),
purpose=document.getElementById("purposeFilter"),
price=document.getElementById("priceFilter"),
sort=document.getElementById("sortFilter");
search.value=params.get("search")||"";
type.value=params.get("type")||"";
function render(){
let a=getProperties(),q=search.value.toLowerCase().trim();
a=a.filter(p=>(!q||`${p.title} ${p.city} ${p.area}`.toLowerCase().includes(q))&&(!type.value||p.type===type.value)&&(!purpose.value||p.purpose===purpose.value)&&(!price.value||Number(p.price)<=Number(price.value)));
if(sort.value==="low")a.sort((x,y)=>x.price-y.price);
if(sort.value==="high")a.sort((x,y)=>y.price-x.price);
document.getElementById("resultCount").textContent=`${a.length} propert${a.length===1?"y":"ies"}`;
document.getElementById("propertiesGrid").innerHTML=a.length?a.map(card).join(""):`<div class="form-card" style="grid-column:1/-1;
text-align:center;
padding:60px">
<h3>No properties found</h3>
<p>Try another search or filter.</p>
</div>`;
}
[search,type,purpose,price,sort].forEach(x=>x.addEventListener("input",render));
render();
