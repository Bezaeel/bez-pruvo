import "dotenv/config";
import joi from "joi";

const envVarsSchema = joi
  .object()
  .keys({
    NODE_ENV: joi.string().valid("production", "development", "testing").required(),
    RABBITMQ_URL: joi.string().required(),
    PORT: joi.string().required(),
    ALLOWED_HOSTS: joi.string().optional(),
  })
  .unknown();

const { error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
