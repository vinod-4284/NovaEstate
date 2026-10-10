
protect();shell("Profile");
const u=getUser(),form=document.getElementById("profileForm");
document.getElementById("profileName").textContent=u.name;document.getElementById("profileEmail").textContent=u.email;document.getElementById("profileAvatar").textContent=initials(u.name);
for(const [k,v] of Object.entries(u)){if(form.elements[k])form.elements[k].value=v}
form.addEventListener("submit",e=>{e.preventDefault();const f=new FormData(form);const n={...u,name:f.get("name"),email:f.get("email"),phone:f.get("phone"),city:f.get("city"),bio:f.get("bio")};localStorage.setItem("novaUser",JSON.stringify(n));document.getElementById("profileName").textContent=n.name;document.getElementById("profileEmail").textContent=n.email;document.getElementById("profileAvatar").textContent=initials(n.name);shell("Profile");toast("Profile saved successfully.")});
document.getElementById("logoutBtn").onclick=logout;
