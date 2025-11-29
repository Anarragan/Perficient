import React from "react";

function Vehicle({ type, capacity }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
      <h3>Vehicle Info</h3>
      <p><strong>Type:</strong> {type}</p>
      <p><strong>Capacity:</strong> {capacity}</p>
    </div>
  );
}

export default Vehicle;
