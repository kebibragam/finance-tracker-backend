const allowedOrigins = ["https://localhost:3000"];

const corsOptions = {
  origin: allowedOrigins,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

export default corsOptions;
