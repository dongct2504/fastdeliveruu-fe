import { TimeRangeEnum } from "../../enums/time-range.enum";
import { DefaultParams } from "../DefaultParams";

export interface OrderParams extends DefaultParams {
    timeRange: TimeRangeEnum;
}