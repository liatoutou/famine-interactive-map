import { Col, Layout, Row, Checkbox } from "antd";
import MapComponent from "../Map/MapComponent";
import CountrySelection from "../Controls/CountrySelection";
import React from "react";
import { LatLngTuple } from "leaflet";
import DateSelection from "./DateSelection";
import Axios from "axios";
import dataSet from "../DataTypes";
import DrawPredictions from "../Map/DrawPredictions";


const { Content } = Layout;

const DashBoard = () => {
  const startMapCenter: LatLngTuple = [5.152149, 46.199615];
  const startMapZoom: number = 5.2;
  interface CountryZoomMapping {
    [key: string]: number;
  }
  const countryToZoom: CountryZoomMapping = {
    'Somalia': 6,
    'Uganda': 6.8,
    'South Sudan':6,
    'Sudan':5.2,
    'Ethiopia':5.8,
    'Kenya': 6.4
  };
  const [mapCenter, setMapCenter] = React.useState(startMapCenter);
  const [mapZoom, setMapZoom] = React.useState(startMapZoom);
  const [N, setN] = React.useState(1);

  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);

  const [drawIPC, setDrawIPC] = React.useState(true);
  const [drawMap, setDrawMap] = React.useState(true);
  const [selectedRegion, setSelectedRegion] = React.useState<string[]>([]);
  const [data, setData] = React.useState<dataSet[]>([]);
  const [countryselection, setCountrySelection] = React.useState<string>("");
  const [drawFeatures, setDrawFeatures] = React.useState(false);
  const [featureselection, setSelectedFeature] = React.useState<string>("");
  const [modelselection, setSelectedModel] = React.useState<string>("");
  const [month, setMonth] = React.useState<Date | null>(null);
  const [drawPredictions, setDrawPredictions] = React.useState(false);
  // const dateTostring = (date: Date) => date.toISOString().split("T")[0];

  React.useEffect(() => {
    console.log("effect called")
    if (countryToZoom.hasOwnProperty(countryselection)) {
      setMapZoom(countryToZoom[countryselection]);
    } else {
      // Set to default zoom level if country is not in the mapping
      setMapZoom(startMapZoom);
    }
  },[countryselection]);

  return (
    <>
      <Content style={{ margin: "0px", height: "100%" }}>
        <div
          className="site-layout-background"
          style={{ padding: 0, height: "100%", width: "100%" }}
        >          
          <Row style={{ height: "100%", position: "relative" }}>
            <div className="overlay-controls">
              <CountrySelection setMapCenter={setMapCenter} setCountrySelection={setCountrySelection} />
              <DateSelection
                setStartDate={setStartDate}
                setEndDate={setEndDate}
              />
              
            </div>
            <Col span={24}>
              <MapComponent
                center={mapCenter}
                zoom={mapZoom}
                drawIPC={drawIPC}
                drawMap={drawMap}
                setSelectedRegion={setSelectedRegion}
                startDate={startDate}
                endDate={endDate}
                countryselection={countryselection}
                drawFeatures={drawFeatures}
                featureselection={featureselection}
                modelselection={modelselection}
                month={month}
                drawPredictions={drawPredictions}
              />
            </Col>
          </Row>
        </div>
      </Content>
    </>
  );
};

export default DashBoard;
