const prod = {
  api: "https://yemit-break.com/api/",
  base: "https://yemit-break.com/",
};
const dev = {
  api: "https://localhost:3443/api/",
  base: "https://localhost:3443/",
};

export default process.env.NODE_ENV === "development" ? dev : prod;
// export default dev;
