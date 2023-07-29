import React from "react";
import Axios from "axios";
import DrawRegions from "./DrawRegions";

// const colors = ["#CDFACD", "#FAE61E", "#E67800", "#C80000", "#640000"];

function getColor(value:number) {
    if (value < 20) {
      return '#CDFACD';
    } else if (value < 50) {
      return '#E67800';
    } else {
      return '#640000';
    }
}

type Props = {
    setSelectedRegion: (regionList: string[]) => void;
    minDate: Date | null;
    maxDate: Date | null;
    countryselection: string;
    
  };
type sumFeatureDataRow = {
    region: string;
    feature: number;
  };
  
type sumFeature= sumFeatureDataRow[];

function DrawFeatures({ setSelectedRegion, minDate, maxDate, countryselection}: Props){
    const [sumData, setSumData] = React.useState<sumFeature>([]);
    const [selectedFeature, setSelectedFeature] = React.useState<string | null>(null);
    React.useEffect(() => {
        if (minDate === null || maxDate === null) {
            setSumData([]);
            return;
        }
        let endpoint;
        if (selectedFeature === 'violent_events') {
            endpoint = "http://localhost:3001/api/get_acled_count_sum";
        } else if (selectedFeature === 'fatalities') {
            endpoint = "http://localhost:3001/api/get_acled_fatalities_sum";
        } else {
            return;
        }
        Axios.get(endpoint, {
            params: {
                minDate: minDate.getTime() / 1000,
                maxDate: maxDate.getTime() / 1000,
                country: countryselection,
            },
        }).then((response) => {
            setSumData(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log("An error occurred: ", error);
        });
        
    }, [selectedFeature, minDate, maxDate, countryselection]);
    return (
        <>
        <DrawRegions
            countryselection={countryselection}
            data={sumData.map((row) => ({
            region: row.region,
            feature: row.feature,
            color: getColor(row.feature),
            }))}
            setSelectedRegion={setSelectedRegion}
        />
    </>
  );
}

export default DrawFeatures;