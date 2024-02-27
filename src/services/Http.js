import axios from "axios";
import { Base_API } from "../shared/constants/app";

const Http= axios.create({
    baseURL:Base_API,
});
export default Http;