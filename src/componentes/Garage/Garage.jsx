import React from "react";
import Vehicle from "../Vehicle/Vehicle"; // Asegúrate de que la ruta sea correcta

function Garage() {
  // Array de vehículos
  const vehicles = [
    { type: "Car", capacity: 4 },
    { type: "Bus", capacity: 40 },
    { type: "Motorcycle", capacity: 2 },
  ];

  return (
    <div>
      <h1>Garage</h1>
      {vehicles.map((v, index) => (
        <Vehicle key={index} type={v.type} capacity={v.capacity} />
      ))}
    </div>
  );
}

export default Garage;
