import React from "react";
import Axios from "axios";
import DrawRegions from "./DrawRegions";
import IPCLegend from "./IPCLegend";

const colors = ["#CDFACD", "#FAE61E", "#E67800", "#C80000", "#640000"];


type Props = {
    setSelectedRegion: (regionList: string[]) => void;
    month: Date|null;
    countryselection: string;
    modelselection: string;
    
  };
  type meanIpcDataRow = {
    region: string;
    ipc: number;
  };
  
  type meanIpcData = meanIpcDataRow[];

function DrawPredictions({ setSelectedRegion, month, countryselection,modelselection}: Props){
    const [ipcData, setIpcData]  = React.useState<meanIpcData>([]);
    React.useEffect(() => {
        if (month === null) {
            setIpcData([]);
            return;
        }
        console.log(month.getTime() / 1000);

        let endpoint;
        if (modelselection === 'bert') {
            endpoint = "http://localhost:3001/api/get_predictions_bert";
        } else if (modelselection === 'zero_shot') {
            endpoint = "http://localhost:3001/api/get_predictions_zero";
        } else {
            return;
        }
        Axios.get(endpoint, {
            params: {
                month: month.getTime() / 1000,
                country: countryselection,
            },
        }).then((response) => {
            setIpcData(response.data);
            console.log(month);
        }).catch(error => {
            console.log("An error occurred: ", error);
        });
        
    }, [month, modelselection, countryselection]);
    return (
        <>
        <DrawRegions
            countryselection={countryselection}
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

export default DrawPredictions;