import axios from "axios";

const BASE_URL = "https://fit-commerce-api.onrender.com/api";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjE3NzFlZDVlMTBiNmNhYTczMzc3NCIsImlhdCI6MTY2NzMzMTg3NywiZXhwIjoxNjY4MTk1ODc3fQ.TFwkeIRg6imAubmsqlmxKtdlPOY2eKwM1MA4v9v4lp4";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  token: { TOKEN },
});
