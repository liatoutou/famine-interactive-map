import { Select } from 'antd';

const { Option } = Select;

type Props = {
  setSelectedModel: (modelselection: string) => void;
};

const ModelSelection = ({ setSelectedModel }: Props) => {
  const onChange = (value: string) => {
    setSelectedModel(value);
  };
  return (
    <Select
      placeholder="Select a model"
      onChange={onChange}
    >
      <Option value="bert">BertTopic and Regression</Option>
      <Option value="zero_shot">Zero shot Classification</Option>
    </Select>
  );
};

export default ModelSelection;