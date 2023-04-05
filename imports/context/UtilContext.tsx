import { createContext } from "react";
import UtilModel from "../models/system/UtilModel";

const UtilContext = createContext<UtilModel | null>(null);

export default UtilContext;
