import { AnyAction, createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { getWeather } from "../../httpService/weatherServices";

interface WeatherState {
  tempList: any[];
  loading: boolean;
}

const initialState: WeatherState = {
  tempList: [],
  loading: false,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    getTempListStart(state) {
      state.loading = true;
    },
    getTempListSuccess(state, action: PayloadAction<any>) {
      state.tempList = action.payload;
      state.loading = false;
    },
  },
});

export const { getTempListStart: getWeatherListStart, getTempListSuccess: getTempListSuccess } = weatherSlice.actions;

export default weatherSlice.reducer;

export const fetchTempList =
  (cityId: number, isHourly: boolean, isPastData: boolean, dateTime: string): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    try {
      dispatch(getWeatherListStart());
      const data = await getWeather(cityId, isHourly, isPastData, dateTime);
      const pload = data.data;
      dispatch(getTempListSuccess(pload));
    } catch (error) {
      console.log("error", error);
    }
  };
