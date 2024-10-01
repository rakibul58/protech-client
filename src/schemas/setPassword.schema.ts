import { z } from "zod";

const setPasswordValidationSchema = z.object({
  email: z.string().trim().min(1, "Please enter a Password"),
});

export default setPasswordValidationSchema;
