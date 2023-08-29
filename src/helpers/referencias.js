import { get } from "./api";
import * as url from "./url";

//get user logued
const getReferencias = (q) => get(`${url.REFERENCIAS_GET_LINES}?${q}`);

export { getReferencias };
