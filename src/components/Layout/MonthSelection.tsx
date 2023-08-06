import { DatePicker} from "antd";
const { MonthPicker } = DatePicker;

type Props = {
  setMonth: (month: Date | null) => void;
  };

export const MonthSelection = ({ setMonth }: Props) => {
  const onChangeDate = (
    month: Date | undefined,
  ) => {
    if (!(month)) {
      setMonth(null);
      return;
    }
    month = new Date(Date.UTC(month.getFullYear(), month.getMonth(), 1, 0, 0, 0));
    setMonth(month);
  };

  return (
    <MonthPicker
      onChange={(values:any) =>
        values
          ? onChangeDate(values?.toDate())
          : setMonth(null)
      }
    />
  );
};

export default MonthSelection;
