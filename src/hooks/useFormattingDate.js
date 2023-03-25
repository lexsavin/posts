import moment from "moment";
import "moment/locale/ru";

export function useFormattingDate(date) {
  moment.locale("ru");

  return moment(date).format("LL");
}
