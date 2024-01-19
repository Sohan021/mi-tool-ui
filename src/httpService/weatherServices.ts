import { GET } from "./service";

export const getWeather = (cityId: number, isHourly: boolean, isPastData: boolean, dateTime: string) => {
  return GET(`/api/Weather/canada?Location=${cityId}&isHourly=${isHourly}&isPastData=${isPastData}&date=${dateTime}`);
};
