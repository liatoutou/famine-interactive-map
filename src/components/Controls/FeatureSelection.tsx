import { Select } from 'antd';

const { Option } = Select;

type Props = {
  setSelectedFeature: (featureselection: string) => void;
};

const FeatureSelection = ({ setSelectedFeature }: Props) => {
  const onChange = (value: string) => {
    setSelectedFeature(value);
  };
  return (
    <Select
      placeholder="Select a feature"
      onChange={onChange}
    >
      <Option value="violent_events">Violent Events</Option>
      <Option value="fatalities">Fatalities</Option>
    </Select>
  );
};

export default FeatureSelection;
