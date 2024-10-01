import { z } from "zod";

const resetPasswordValidationSchema = z.object({
  email: z.string().trim().email("Please enter a valid email").toLowerCase(),
});

export default resetPasswordValidationSchema;
