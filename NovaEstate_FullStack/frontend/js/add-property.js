
protect();shell("Add Property");
document.getElementById("propertyForm").addEventListener("submit",e=>{
    e.preventDefault();
    const f=new FormData(e.target);
    const p={id:"p"+Date.now(),title:f.get("title"),type:f.get("type"),purpose:f.get("purpose"),price:Number(f.get("price")),city:f.get("city"),area:f.get("area"),beds:Number(f.get("beds")),baths:Number(f.get("baths")),sqft:Number(f.get("sqft")),lat:Number(f.get("lat"))||17.385,lng:Number(f.get("lng"))||78.4867,
        image:f.get("image")||"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85",
        description:f.get("description")||"A newly added NovaEstate property."
    };
    const a=getProperties();
    a.unshift(p);
    saveProperties(a);
    toast("Property published successfully!");
    setTimeout(()=>
        location.href="properties.html",700)
});
