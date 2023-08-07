import React from "react";
import Axios from "axios";
import DrawRegions from "./DrawRegions";
import FeaturesLegend from "./FeaturesLegend";


function getColor(value:number) {
    if (value < 10) {
      return '#FFE0B2';
    } else if (value < 20) {
      return '#FFB74D';
    } else if (value < 40) {
        return '#FF9800';
    } else if (value < 60) {
        return '#F57C00';
    } else if (value < 80) {
        return '#E65100';
    } else if (value < 100) {
        return '#BF360C';
    } else if (value < 150) {
        return '#982E0D';
    } else if (value < 200) {
        return '#5D200E';
    }  else  {
        return '#371207';
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