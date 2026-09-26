import "dotenv/config";
import env from "env-var";

const envs = {
  POSTGRES_URL: env.get("POSTGRES_URL").required().asString(),
};

export default envs;
