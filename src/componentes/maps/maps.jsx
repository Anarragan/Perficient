
  

import NavBar from "../NavBar/NavBar";

function Maps() {
   
  return (
      
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <NavBar/>
      
      <h1>Maps</h1>
      <img 
        src="https://via.placeholder.com/600x400?text=Mapa" 
        alt="Mapa" 
        style={{ maxWidth: "100%", height: "auto", border: "1px solid #ccc" }}
      />
    </div>
  );
}

export default Maps;
