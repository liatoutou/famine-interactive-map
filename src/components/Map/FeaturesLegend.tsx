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
        display: "block",
        width: "100%",
        textAlign: "center",
        color: "black",
        backgroundColor: "#FFE0B2",
        margin: 0,
      }}
    >
      0-10
    </div>
    <div
      style={{
        display: "block",
        width: "100%",
        textAlign: "center",
        color: "black",
        backgroundColor: "#FFB74D",
        margin: 0,
      }}
    >
      10-20
    </div>
    <div
      style={{
        display: "block",
        width: "100%",
        textAlign: "center",
        color: "black",
        backgroundColor: "#FF9800",
        margin: 0,
      }}
    >
      20-40
    </div>
    <div
      style={{
        display: "block",
        width: "100%",
        textAlign: "center",
        color: "black",
        backgroundColor: "#F57C00",
        margin: 0,
      }}
    >
      <div style={{ color: "white" }}>40-60</div>
    </div>
    <div
      style={{
        display: "block",
        width: "100%",
        textAlign: "center",
        color: "black",
        backgroundColor: "#E65100",
        margin: 0,
      }}
    >
      <div style={{ color: "white" }}>60-80</div>
    </div>
    <div
      style={{
        display: "block",
        width: "100%",
        textAlign: "center",
        color: "black",
        backgroundColor: "#BF360C",
        margin: 0,
      }}
    >
      <div style={{ color: "white" }}>80-100</div>
    </div>
    <div
      style={{
        display: "block",
        width: "100%",
        textAlign: "center",
        color: "black",
        backgroundColor: "#982E0D",
        margin: 0,
      }}
    >
      <div style={{ color: "white" }}>100-150</div>
    </div>
    <div
      style={{
        display: "block",
        width: "100%",
        textAlign: "center",
        color: "black",
        backgroundColor: "#5D200E",
        margin: 0,
      }}
    >
      <div style={{ color: "white" }}>150-200</div>
    </div>
    <div
      style={{
        display: "block",
        width: "100%",
        textAlign: "center",
        color: "black",
        backgroundColor: "#371207",
        margin: 0,
      }}
    >
      <div style={{ color: "white" }}>200+</div>
    </div>
  </div>
);

export default FeaturesLegend;
