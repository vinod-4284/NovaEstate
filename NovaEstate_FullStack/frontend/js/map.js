
protect();shell("Smart Map");
const map=L.map("map").setView([17.385,78.4867],11);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OpenStreetMap contributors"}).addTo(map);
const props=getProperties();const markers=[];
props.forEach(p=>{const m=L.marker([p.lat,p.lng]).addTo(map).bindPopup(`<b>${p.title}</b><br>${p.area}, ${p.city}<br>${money(p.price)}`);markers.push({p,m})});
document.getElementById("nearbyList").innerHTML=props.slice(0,6).map((p,i)=>`<div class="nearby-item" data-i="${i}"><b>${p.title}</b><small>${p.area} • ${money(p.price)}</small></div>`).join("");
document.querySelectorAll(".nearby-item").forEach(x=>x.onclick=()=>{const z=markers[x.dataset.i];map.setView([z.p.lat,z.p.lng],15);z.m.openPopup()});
let userMarker;
document.getElementById("locateBtn").onclick=()=>
    {
        if(!navigator.geolocation){
            toast("Geolocation is not supported by this browser.");
            return
        }
            document.getElementById("locationStatus").textContent="Detecting location…";
            navigator.geolocation.getCurrentPosition(pos=>{
                const {
                    latitude:lat,longitude:lng
                }=pos.coords;
                if(userMarker)map.removeLayer(userMarker);
                userMarker=L.circleMarker([lat,lng],{
                    radius:10,color:"#8b5cf6",fillColor:"#22d3ee",fillOpacity:.9}).addTo(map).bindPopup("<b>You are here</b>").openPopup();
                    map.setView([lat,lng],14);
                    document.getElementById("statusDot").classList.add("live");
                    document.getElementById("locationStatus").textContent="Location detected";
                    document.getElementById("coords").textContent=`${lat.toFixed(5)}, ${lng.toFixed(5)}`;
                    toast("Your location was detected.")},()=>{
                        document.getElementById("locationStatus").textContent="Location permission denied";
                        document.getElementById("coords").textContent="Enable browser location access and try again.";toast("Location permission was not granted.")},{enableHighAccuracy:true,timeout:10000})};
