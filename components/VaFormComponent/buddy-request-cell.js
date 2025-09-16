import React from "react";

const ButtonComp = ({ title, onClick, style }) => (
  <button onClick={onClick} style={style}>
    {title}
  </button>
);

const getStatusText = (status) => {
  switch (status) {
    case "email_sent": return "Pending";
    case "witness_submitted": return "Witness Submitted";
    case "completed": return "Completed";
    case "modification_requested": return "Modification Requested";
    default: return "Pending";
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "email_sent": return "#016092";
    case "witness_submitted": return "#7f6d3d";
    case "completed": return "green";
    case "modification_requested": return "#c1272d";
    default: return "#016092";
  }
};

const getStatusNumber = (status) => {
  switch (status) {
    case "email_sent": return 0;
    case "witness_submitted": return 1;
    case "completed": return 2;
    case "modification_requested": return 3;
    default: return 0;
  }
};

// BuddyRequestCell Component
const BuddyRequestCell = ({ 
  request, 
  onPress, 
  onCancel, 
  onView 
}) => {
  const status = getStatusNumber(request.status);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12,
        borderBottom: "1px solid #ccc",
        borderRadius: 8,
        marginBottom: 5,
        backgroundColor: "#fff",
      }}
    >
      <div>
        <div><strong>Name:</strong> {request.witness_first_name} {request.witness_last_name}</div>
        <div><strong>Email:</strong> {request.witness_primary_email || "N/A"}</div>
        <div style={{ color: getStatusColor(request.status) }}>
          <strong>Status:</strong> {getStatusText(request.status)}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 5, alignItems: "flex-end" }}>
        {status === 0 && (
          <ButtonComp
            title="Cancel"
            onClick={() => onCancel(request)}
            style={{ backgroundColor: "#c1272d", color: "#fff", width: 70, height: 30, border: "none", borderRadius: 4 }}
          />
        )}
        {status !== 0 && (
          <ButtonComp
            title="View"
            onClick={() => onView(request)}
            style={{ backgroundColor: "#016092", color: "#fff", width: 70, height: 30, border: "none", borderRadius: 4 }}
          />
        )}
        {status !== 0 && status !== 2 && (
          <ButtonComp
            title="Complete & Submit"
            onClick={() => onPress(request)}
            style={{ backgroundColor: "#016092", color: "#fff", width: 140, height: 30, border: "none", borderRadius: 4 }}
          />
        )}
      </div>
    </div>
  );
};

export default BuddyRequestCell;
