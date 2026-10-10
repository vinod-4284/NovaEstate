
protect();shell("Home");
document.getElementById("featuredGrid").innerHTML=getProperties().slice(0,3).map(card).join("");
document.querySelectorAll(".quick-pills button").forEach(b=>b.addEventListener("click",()=>{location.href="properties.html?type="+encodeURIComponent(b.dataset.filter)}));
document.getElementById("homeSearchBtn").onclick=()=>{const q=document.getElementById("homeSearch").value.trim();location.href="properties.html?search="+encodeURIComponent(q)};
document.getElementById("homeSearch").addEventListener("keydown",e=>{if(e.key==="Enter")document.getElementById("homeSearchBtn").click()});
