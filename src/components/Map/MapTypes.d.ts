type ControlProps2 = {
  center: LatLngTuple;
  zoom: number;
  drawIPC: boolean;
  drawMap: boolean;
  setSelectedRegion: (regionList: string[]) => void;
  startDate: Date | null;
  endDate: Date | null;
  countryselection: string;
};

type ControlProps = {
  center: LatLngTuple;
  zoom: number;
};
