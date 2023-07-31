const FeaturesLegend = () => (
  <div
    style={{
      position: "absolute",
      top: "0px",
      right: "0px",
      zIndex: 1000,
      fillOpacity: 0,
    }}
  >
    <div
      style={{
        display: "inline-block",
        width: "100%",
        textAlign: "center",
        color: "black",
        backgroundColor: "#CBB5B8",
        margin: 0,
      }}
    >
      "Less than 10"
    </div>
    <div
      style={{
        display: "inline-block",
        width: "100%",
        textAlign: "center",
        color: "black",
        backgroundColor: "#B29DA0",
        margin: 0,
      }}
    >
      10-20
    </div>
    <div
      style={{
        display: "inline-block",
        width: "100%",
        textAlign: "center",
        color: "black",
        backgroundColor: "#A86068",
        margin: 0,
      }}
    >
      20-40
    </div>
    <div
      style={{
        display: "inline-block",
        width: "100%",
        textAlign: "center",
        color: "black",
        backgroundColor: "#A6545D",
        margin: 0,
      }}
    >
      <div style={{ color: "white" }}>40-80</div>
    </div>
    <div
      style={{
        display: "inline-block",
        width: "100%",
        textAlign: "center",
        color: "black",
        backgroundColor: "#8F4850",
        margin: 0,
      }}
    >
      <div style={{ color: "white" }}>80-100</div>
    </div>
    <div
      style={{
        display: "inline-block",
        width: "100%",
        textAlign: "center",
        color: "black",
        backgroundColor: "#912E39",
        margin: 0,
      }}
    >
      <div style={{ color: "white" }}>100-150</div>
    </div>
    <div
      style={{
        display: "inline-block",
        width: "100%",
        textAlign: "center",
        color: "black",
        backgroundColor: "#91202C",
        margin: 0,
      }}
    >
      <div style={{ color: "white" }}>150-200</div>
    </div>
    <div
      style={{
        display: "inline-block",
        width: "100%",
        textAlign: "center",
        color: "black",
        backgroundColor: "#8E0312",
        margin: 0,
      }}
    >
      <div style={{ color: "white" }}>200-250</div>
    </div>
    <div
      style={{
        display: "inline-block",
        width: "100%",
        textAlign: "center",
        color: "black",
        backgroundColor: "#3A0007",
        margin: 0,
      }}
    >
      <div style={{ color: "white" }}>250+</div>
    </div>
  </div>
);

export default FeaturesLegend;
