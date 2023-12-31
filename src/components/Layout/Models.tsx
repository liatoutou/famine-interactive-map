import React, { useState } from "react";
import { Select, Checkbox} from "antd";
import { Layout, Row, Col } from "antd";
import { LatLngTuple } from "leaflet";
import MapComponentPreds from "../Map/MapComponentPreds";
import CountrySelection from "../Controls/CountrySelection";
import DateSelection from "./DateSelection";
import ModelSelection from "../Controls/ModelSelection";
import MonthSelection from "./MonthSelection";

const { Option } = Select;
const { Content } = Layout;

const Models = () => {
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
  const [featureselection, setSelectedFeature] = useState<string>("");
  const [drawFeatures, setDrawFeatures] = React.useState(false);
  const [modelselection, setSelectedModel] = useState<string>("");
  const [month, setMonth] = React.useState<Date | null>(null);
  const [drawPredictions, setDrawPredictions] = React.useState(true);


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
              <CountrySelection setMapCenter={setMapCenter} setCountrySelection={setCountrySelection}/>
              <ModelSelection setSelectedModel={setSelectedModel}/>
              <MonthSelection setMonth={setMonth}/>
             
            </div>
            <Col span={24}>
              <MapComponentPreds
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

export default Models;
