const prod = {
  api: "https://yemit-break.com/api/",
};
const dev = {
  api: "https://localhost:3443/api/",
};

export default process.env.NODE_ENV === "development" ? dev : prod;
