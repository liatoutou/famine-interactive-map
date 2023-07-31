import React from "react";
import Axios from "axios";
import DrawRegions from "./DrawRegions";
import FeaturesLegend from "./FeaturesLegend";

// const colors = ["#CDFACD", "#FAE61E", "#E67800", "#C80000", "#640000"];

function getColor(value:number) {
    if (value < 10) {
      return '#CBB5B8';
    } else if (value < 20) {
      return '#B29DA0';
    } else if (value < 40) {
        return '#A86068';
    } else if (value < 80) {
        return '#A6545D';
    } else if (value < 100) {
        return '#95414A';
    } else if (value < 150) {
        return '#912E39';
    } else if (value < 200) {
        return '#91202C';
    } else if (value < 250) {
        return '#8E0312';
    }  else  {
        return '#3A0007';
}
}

type Props = {
    setSelectedRegion: (regionList: string[]) => void;
    minDate: Date | null;
    maxDate: Date | null;
    countryselection: string;
    featureselection: string;
    
  };
type sumFeatureDataRow = {
    region: string;
    feature: number;
  };
  
type sumFeature= sumFeatureDataRow[];

function DrawFeatures({ setSelectedRegion, minDate, maxDate, countryselection,featureselection}: Props){
    const [sumData, setSumData] = React.useState<sumFeature>([]);
    React.useEffect(() => {
        if (minDate === null || maxDate === null) {
            setSumData([]);
            return;
        }
        let endpoint;
        if (featureselection === 'violent_events') {
            endpoint = "http://localhost:3001/api/get_acled_count_sum";
        } else if (featureselection === 'fatalities') {
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
        
    }, [featureselection, minDate, maxDate, countryselection]);
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
        <FeaturesLegend />
    </>
  );
}

export default DrawFeatures;