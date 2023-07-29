import React, { useState } from "react";
import { Select, Checkbox, Button } from "antd";
import { Layout, Row, Col } from "antd";
import { LatLngTuple } from "leaflet";
import MapComponent from "../Map/MapComponent";
import CountrySelection from "../Controls/CountrySelection";
import DateSelection from "./DateSelection";

const { Option } = Select;
const { Content } = Layout;

const Anomalies = () => {
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

  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);
  const [drawIPC, setDrawIPC] = React.useState(false);
  const [mapCenter, setMapCenter] = React.useState(startMapCenter);
  const [mapZoom, setMapZoom] = React.useState(startMapZoom);
  const [drawMap, setDrawMap] = React.useState(true);
  const [selectedRegion, setSelectedRegion] = React.useState<string[]>([]);
  const [countryselection, setCountrySelection] = React.useState<string>("");
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [drawFeatures, setDrawFeatures] = React.useState(false);


  React.useEffect(() => {
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
              <Select defaultValue="Select a feature" style={{ width: 120 }} onChange={setSelectedFeature}>
                <Option value="violent_events">Violent events</Option>
                <Option value="fatalities">Fatalities</Option>
              </Select>
              <DateSelection setStartDate={setStartDate} setEndDate={setEndDate} />
              <Checkbox onChange={(e) => setDrawFeatures(e.target.checked)}>
                Show Numbers
              </Checkbox>
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
              />
            </Col>
          </Row>
        </div>
      </Content>
    </>
  );
};

export default Anomalies;