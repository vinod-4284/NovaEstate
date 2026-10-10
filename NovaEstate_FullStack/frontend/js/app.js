
const demoUser={name:"Vinod",email:"demo@novaestate.com",phone:"+91 98765 43210",city:"Hyderabad",bio:"Exploring smart spaces and future-ready homes."};
const seedProperties=[
{id:"p1",title:"Skyline Glass Villa",type:"Villa",purpose:"For Sale",price:28500000,city:"Hyderabad",area:"Gachibowli",beds:4,baths:4,sqft:3600,lat:17.4401,lng:78.3489,image:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85",description:"A futuristic glass villa with expansive living spaces, natural light, premium finishes and a private garden."},
{id:"p2",title:"Azure Heights Residence",type:"Apartment",purpose:"For Sale",price:14200000,city:"Hyderabad",area:"Kondapur",beds:3,baths:3,sqft:1850,lat:17.4697,lng:78.3716,image:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85",description:"Contemporary high-rise living with skyline views, smart-home controls and premium community amenities."},
{id:"p3",title:"The Urban Nest",type:"House",purpose:"For Rent",price:65000,city:"Hyderabad",area:"Jubilee Hills",beds:3,baths:3,sqft:2400,lat:17.4239,lng:78.4071,image:"https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=85",description:"A stylish urban home in a sought-after neighborhood, ideal for modern family living."},
{id:"p4",title:"Neo Park Offices",type:"Commercial",purpose:"For Sale",price:36000000,city:"Hyderabad",area:"Financial District",beds:0,baths:4,sqft:4200,lat:17.4169,lng:78.3372,image:"https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85",description:"Premium office floor designed for high-growth teams with excellent connectivity and a modern business environment."},
{id:"p5",title:"Emerald Courtyard",type:"Villa",purpose:"For Sale",price:19800000,city:"Hyderabad",area:"Narsingi",beds:4,baths:4,sqft:3100,lat:17.3850,lng:78.3370,image:"https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1000&q=85",description:"Elegant courtyard villa with calm interiors, landscaped outdoor areas and generous bedrooms."},
{id:"p6",title:"Metroline Studio",type:"Apartment",purpose:"For Rent",price:32000,city:"Hyderabad",area:"HITEC City",beds:1,baths:1,sqft:850,lat:17.4435,lng:78.3772,image:"https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=85",description:"Compact premium studio near technology campuses, cafés and transit."}
];
if(!localStorage.getItem("novaProperties"))localStorage.setItem("novaProperties",JSON.stringify(seedProperties));
if(!localStorage.getItem("novaUser"))localStorage.setItem("novaUser",JSON.stringify(demoUser));
function getUser(){
    return JSON.parse(localStorage.getItem("novaUser")||JSON.stringify(demoUser))
}
function getProperties(){return JSON.parse(localStorage.getItem("novaProperties")||"[]")}
function saveProperties(x){
    localStorage.setItem("novaProperties",JSON.stringify(x))
}
function toast(msg){const t=document.getElementById("toast");if(!t)return;t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2800)}
function initials(name){return (name||"V").split(" ").map(x=>x[0]).join("").slice(0,2).toUpperCase()}
function money(n){n=Number(n);if(n>=10000000)return "₹"+(n/10000000).toFixed(2)+" Cr";if(n>=100000)return "₹"+(n/100000).toFixed(1)+" L";return "₹"+n.toLocaleString("en-IN")}
function card(p){return `<article class="property-card" onclick="location.href='property-details.html?id=${p.id}'"><div class="property-img"><img src="${p.image}" alt="${p.title}" loading="lazy"><span class="tag">${p.purpose.replace("For ","")} • ${p.type}</span><button class="heart" onclick="event.stopPropagation();toast('Saved to favourites ♡')">♡</button></div><div class="property-body"><h3>${p.title}</h3><div class="location">⌖ ${p.area}, ${p.city}</div><div class="specs"><span>⌂ ${p.beds} Beds</span><span>◫ ${p.baths} Baths</span><span>▦ ${p.sqft} ft²</span></div><div class="price-row"><span class="price">${money(p.price)}${p.purpose==="For Rent"?"/mo":""}</span><span class="view-arrow">View →</span></div></div></article>`}
function shell(active){
const u=getUser();
const nav=[
    ["index.html","⌂","Home"],
    ["properties.html","⌂","Properties"],
    ["map.html","⌖","Smart Map"],
    ["add-property.html","＋","Add Property"],
    ["profile.html","◉","Profile"],
    ["owner.html","✦","Founder"]
];
document.getElementById("sidebar").innerHTML=`<div class="brand"><span class="brand-mark">N</span><span>NOVA<span>ESTATE</span></span></div><nav class="side-nav">${nav.map(x=>`<a class="${active===x[2]?"active":""}" href="${x[0]}"><span>${x[1]}</span><span>${x[2]}</span></a>`).join("")}</nav><div class="side-bottom"><div class="user-mini"><div class="avatar">${initials(u.name)}</div><div><b>${u.name}</b><small>${u.city||"Member"}</small></div></div><a class="side-nav logout-link" href="logout.html">↪ <span>Log out</span></a></div>`;
document.getElementById("topbar").innerHTML=`<button class="icon-btn" onclick="toggleSidebar()">☰</button><div class="profile-chip"><div class="avatar">${initials(u.name)}</div><div><b>${u.name}</b><small>Member</small></div></div>`;
}
function toggleSidebar(){
    document.getElementById("sidebar").classList.toggle("open")
}
function protect(){
    if(localStorage.getItem("novaLoggedIn")!=="true")location.href="login.html"
}

function logout(){
    localStorage.removeItem("novaLoggedIn");
    location.href="logout.html"
}
