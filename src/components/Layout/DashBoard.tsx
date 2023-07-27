import { Col, Layout, Row, Checkbox } from "antd";
import MapComponent from "../Map/MapComponent";
import CountrySelection from "../Controls/CountrySelection";
import GranularitySlider from "../Controls/GranularitySlider";
import TestBar from "../charts/TestBar";
import React from "react";
import { LatLngTuple } from "leaflet";
import DateSelection from "./DateSelection";
import Line from "../charts/Line";
import MyResponsiveLine from "../charts/MyResponsiveLine";
import Axios from "axios";
import dataSet from "../DataTypes";
import ExampleComponent from "./ExampleComponent"

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

  const [drawIPC, setDrawIPC] = React.useState(false);
  const [drawMap, setDrawMap] = React.useState(true);
  const [selectedRegion, setSelectedRegion] = React.useState<string[]>([]);
  const [data, setData] = React.useState<dataSet[]>([]);
  const [countryselection, setCountrySelection] = React.useState<string>('Somalia');

  const dateTostring = (date: Date) => date.toISOString().split("T")[0];
  React.useEffect(() => {
    if (countryToZoom.hasOwnProperty(countryselection)) {
      setMapZoom(countryToZoom[countryselection]);
    } else {
      // Set to default zoom level if country is not in the mapping
      setMapZoom(startMapZoom);
    }
  },[countryselection]);

  React.useEffect(() => {
    if (startDate === null || endDate === null) {
      setData([]);
      return;
    }
    console.log(startDate.toISOString());
    console.log(selectedRegion);
    Axios.get("http://localhost:3001/api/get_mean_ipc_date_by_region_new", {
      params: {
        minDate: startDate.getTime() / 1000,
        maxDate: endDate.getTime() / 1000,
        regions: selectedRegion,
      },
    }).then((response) => {
      setData([{ id: "IPC", data: response.data }])
    });
  }, [startDate, endDate, selectedRegion, countryselection]);

  return (
    <>
      <Content style={{ margin: "16px", height: "100%" }}>
        <div
          className="site-layout-background"
          style={{ padding: 24, height: "100%", width: "100%" }}
        >
          {countryselection}
          <Row style={{ height: "100%" }}>
            <Col span={12}>
              <CountrySelection setMapCenter={setMapCenter} setCountrySelection={setCountrySelection}/>
              <DateSelection
                setStartDate={setStartDate}
                setEndDate={setEndDate}
              />
              <GranularitySlider setN={setN} />
              <div style={{ height: "70%" }}>
                {data.length > 0 && <MyResponsiveLine N={N} data={data} />}
                <Checkbox
                  onChange={(e) => setDrawMap(e.target.checked)}
                  defaultChecked={true}
                >
                  show Map
                </Checkbox>
                <Checkbox onChange={(e) => setDrawIPC(e.target.checked)}>
                  show IPC
                </Checkbox>
                <h1>{selectedRegion}</h1>
              </div>
            </Col>
            <Col span={12}>
              <MapComponent
                center={mapCenter}
                zoom={mapZoom}
                drawIPC={drawIPC}
                drawMap={drawMap}
                setSelectedRegion={setSelectedRegion}
                startDate={startDate}
                endDate={endDate}
                countryselection={countryselection}
              />
            </Col>
          </Row>
        </div>
      </Content>
    </>
  );
};

export default DashBoard;
