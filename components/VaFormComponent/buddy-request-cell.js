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
  onView,
  onRequestModification
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

      <div className="flex flex-col gap-1 items-end">
        {status === 0 && (
          <button
            onClick={() => onCancel(request)}
            className="bg-danger hover:bg-red-700 text-white rounded px-3 py-1"
          >
            Cancel
          </button>
        )}

        {status === 1 && (
          <>
            <div className="flex flex-row gap-1 items-end">
              <button
                onClick={() => onView(request)}
                className="bg-primary hover:bg-primaryHover text-white rounded px-3 py-1"
              >
                View Response
              </button>
              <button
                  onClick={() => onRequestModification(request)}
                  className=" bg-gray hover:bg-grayHover text-white rounded px-3 py-1"
                >
                  Request Changes
              </button> 
            </div>
            <div className="flex flex-row gap-1 items-end">
              <button
                onClick={() => onCancel(request)}
                className="bg-danger hover:bg-red-700 text-white rounded px-3 py-1"
              >
                Cancel 
              </button>
              <button
                onClick={() => onPress(request)}
                className="bg-primary hover:bg-primaryHover text-white rounded px-4 py-1"
              >
                Complete & Submit
              </button>
            </div>
          </>
        )}

        {status === 2 && (
          <> 
            <button
              onClick={() => onView(request)}
              className="bg-primary hover:bg-primaryHover text-white rounded px-3 py-1"
            >
             View Submitted Form
            </button>
          </>
        )}
        
        {status === 3 && (
          <>
            <div className="flex flex-row gap-1 items-end">
              <button
                onClick={() => onView(request)}
                className="bg-primary hover:bg-primaryHover text-white rounded px-3 py-1"
              >
                View Response
              </button>
            </div>
          </>
        )}
      </div>

    </div>
  );
};

export default BuddyRequestCell;
