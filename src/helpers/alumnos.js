import { get } from "./api";
import * as url from "./url";

const getAlumnosById = (id) => get(`${url.QUERY_ALUMNOS}/${id}`);

export { getAlumnosById };
