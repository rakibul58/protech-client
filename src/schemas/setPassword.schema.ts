import { z } from "zod";

const setPasswordValidationSchema = z.object({
  password: z.string().trim().min(1, "Please enter a Password"),
});

export default setPasswordValidationSchema;
