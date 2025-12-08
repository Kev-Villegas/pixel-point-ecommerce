import { userRegisterSchema } from "../app/_schemas/validationSchemas";

const invalidEmail = "test@gmail.con";
const resultInvalid = userRegisterSchema.safeParse({
  email: invalidEmail,
  password: "password123",
  confirmPassword: "password123",
  name: "Test",
  lastname: "User",
});

if (resultInvalid.success) {
  console.error("FAILED: Schema accepted invalid email ending in .con");
  process.exit(1);
} else {
  console.log("SUCCESS: Schema rejected .con email.");
  const msg = resultInvalid.error.issues.find((e) =>
    e.path.includes("email"),
  )?.message;
  console.log("Error message:", msg);
}

const typoEmail = "test@gmil.com";
const resultTypo = userRegisterSchema.safeParse({
  email: typoEmail,
  password: "password123",
  confirmPassword: "password123",
  name: "Test",
  lastname: "User",
});

if (resultTypo.success) {
  console.error("FAILED: Schema accepted typo domain gmil.com");
  process.exit(1);
} else {
  console.log("SUCCESS: Schema rejected gmil.com email.");
  const msg = resultTypo.error.issues.find((e) =>
    e.path.includes("email"),
  )?.message;
  console.log("Error message:", msg);
}

const fuzzyTypoEmail = "test@gmil.co";
const resultFuzzy = userRegisterSchema.safeParse({
  email: fuzzyTypoEmail,
  password: "password123",
  confirmPassword: "password123",
  name: "Test",
  lastname: "User",
});

if (resultFuzzy.success) {
  console.error("FAILED: Schema accepted fuzzy typo domain gmil.co");
  process.exit(1);
} else {
  console.log("SUCCESS: Schema rejected fuzzy typo gmil.co email.");
  const msg = resultFuzzy.error.issues.find((e) =>
    e.path.includes("email"),
  )?.message;
  console.log("Error message:", msg);
}

const validEmail = "test@gmail.com";
const resultValid = userRegisterSchema.safeParse({
  email: validEmail,
  password: "password123",
  confirmPassword: "password123",
  name: "Test",
  lastname: "User",
});

if (!resultValid.success) {
  console.error("FAILED: Schema rejected valid email");
  console.error(resultValid.error);
  process.exit(1);
} else {
  console.log("SUCCESS: Schema accepted valid email.");
}
