import { z } from "zod";

const registerValidationSchema = z.object({
  email: z.string().trim().email("Please enter a valid Email").toLowerCase(),
  password: z.string({required_error: "Please add a Password"}).min(1, "Please add a Password").trim(),
  phone: z.string({required_error: "Please add Phone Number"}).min(1, "Please add Phone Number").trim(),
  name: z.string({required_error: "Please add Name"}).min(1, "Please add Name").trim(),
});

export default registerValidationSchema;
