import React from "react";

function User({ id, age, name, email, phone, cc, img }) {
  return (
    
    <div style={{
      border: "1px solid #ccc",
      padding: "15px",
      margin: "10px 0",
      borderRadius: "8px",
      maxWidth: "400px"
    }}>
      <img 
        src={img} 
        alt={name} 
        style={{ width: "100%", borderRadius: "8px", marginBottom: "10px" }}
      />
      <h3>{name} (ID: {id})</h3>
      <p><strong>Age:</strong> {age}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Phone:</strong> {phone}</p>
      <p><strong>CC:</strong> {cc}</p>
    </div>
  );
}

export default User;
