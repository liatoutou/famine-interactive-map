import { Select } from "antd";
import { LatLngTuple } from "leaflet";
import React from "react";

const { Option } = Select;

const locDict: { [key: string]: LatLngTuple } = {
  Somalia: [5.152149, 46.199615],
  Kenya: [0.1768696, 37.9083264],
  "South Sudan": [7.8626845, 29.6949232],
  Sudan: [15.7860696,30.1995791],
  Ethiopia:[9.149175, 40.498867],
  Uganda:[1.3707295, 32.3032414]  
};

const onSearch = (value: string) => {
  console.log("search:", value);
};

type Props = {
  setMapCenter: React.Dispatch<React.SetStateAction<LatLngTuple>>;
  setCountrySelection: (countrySelection: string) => void;
};

const CountrySelection = ({ setMapCenter, setCountrySelection }: Props) => {
  const onChange = (value: string) => {
    console.log(locDict[value])
    setMapCenter(locDict[value])
    setCountrySelection(value);
  };
  return (
    <Select
      showSearch
      placeholder="Select a country"
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={(input, option) =>
        (option!.children as unknown as string)
          .toLowerCase()
          .includes(input.toLowerCase())
      }
    >
      <Option value="Somalia">Somalia</Option>
      <Option value="Kenya">Kenya</Option>
      <Option value="Somalia">Somalia</Option>
      <Option value="South Sudan">South Sudan</Option>
      <Option value="Sudan">Sudan</Option>
      <Option value="Uganda">Uganda</Option>

    </Select>
  );
};

export default CountrySelection;
