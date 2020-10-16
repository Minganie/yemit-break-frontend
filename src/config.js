const prod = {
  api: "api/",
};
const dev = {
  api: "https://localhost:3443/api/",
};

export default process.env.NODE_ENV === "development" ? dev : prod;
