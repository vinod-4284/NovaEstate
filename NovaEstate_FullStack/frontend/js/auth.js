if(localStorage.getItem("novaLoggedIn")==="true" && location.pathname.endsWith("login.html"))location.href="index.html";
const form=document.getElementById("loginForm");
document.getElementById("togglePassword")?.addEventListener("click",()=>{
    const p=document.getElementById("password");
    p.type=p.type==="password"?"text":"password";
    document.getElementById("togglePassword").textContent=p.type==="password"?"Show":"Hide"});

form?.addEventListener("submit",async e=>{
    e.preventDefault();
    try{
        await apiLogin(document.getElementById("email").value.trim(),document.getElementById("password").value);
        location.href="index.html"
    }
    catch(err){toast(err.message)}
});

document.getElementById("demoBtn")?.addEventListener("click",async()=>{
    try{
        await apiLogin("demo@novaestate.com","123456");
        location.href="index.html"
    }catch(err){toast(err.message)}
});
document.getElementById("forgot")?.addEventListener("click",e=>{
    e.preventDefault();
    toast("Password reset can be connected to email service later.")
});
document.getElementById("signupLink")?.addEventListener("click",e=>{
    e.preventDefault();
    toast("Use the backend /api/auth/register endpoint for account creation.")
});
