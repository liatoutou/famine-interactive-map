import React from "react";
import IPCLegend from "./IPCLegend";
import Axios from "axios";
import DrawRegions from "./DrawRegions";

const colors = ["#CDFACD", "#FAE61E", "#E67800", "#C80000", "#640000"];
type Props = {
  setSelectedRegion: (regionList: string[]) => void;
  minDate: Date | null;
  maxDate: Date | null;
  countryselection: string
};

type meanIpcDataRow = {
  region: string;
  ipc: number;
};

type meanIpcData = meanIpcDataRow[];

const dateTostring = (date: Date) => date.toISOString().split("T")[0];

function DrawIPC({ setSelectedRegion, minDate, maxDate, countryselection}: Props) {
  const [ipcData, setIpcData] = React.useState<meanIpcData>([]);

  React.useEffect(() => {
    if (minDate === null || maxDate === null) {
      setIpcData([]);
      return;
    }
    console.log(minDate.toISOString());
    Axios.get("http://localhost:3001/api/get_ipc_mean_new", {
      params: {
        minDate: minDate.getTime() / 1000,
        maxDate: maxDate.getTime() / 1000,
        country: countryselection
      },
    }).then((response) => {
      setIpcData(response.data);
      console.log(response.data);
    });
  }, [minDate, maxDate]);

  return (
    <>
      <DrawRegions
        data={ipcData.map((row) => ({
          region: row.region,
          ipc: row.ipc,
          color: colors[Math.round(row.ipc) - 1],
        }))}
        setSelectedRegion={setSelectedRegion}
      />
      <IPCLegend />
    </>
  );
}

export default DrawIPC;
