// Seeds demo data for local development.
//   npm run seed        -> insert demo courses + accounts
//   npm run seed:clear  -> remove everything this script created
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "./config.js/db.js";
import Course from "./models/Course.js";
import User from "./models/User.js";
import { COURSES, ACCOUNTS } from "./seedData.js";

dotenv.config();

const run = async () => {
  await connectDB();

  const clearing = process.argv.includes("--clear");
  const titles = COURSES.map((c) => c.title);
  const emails = ACCOUNTS.map((a) => a.email);

  await Course.deleteMany({ title: { $in: titles } });
  await User.deleteMany({ email: { $in: emails } });

  if (clearing) {
    console.log("Demo data removed.");
  } else {
    await Course.insertMany(COURSES);
    for (const a of ACCOUNTS) {
      await User.create({ ...a, password: await bcrypt.hash(a.password, 10) });
    }
    const lessons = COURSES.reduce((n, c) => n + c.lessons.length, 0);
    console.log(`Seeded ${COURSES.length} courses (${lessons} lessons) and ${ACCOUNTS.length} accounts:`);
    ACCOUNTS.forEach((a) => console.log(`  ${a.role.padEnd(5)}  ${a.email} / ${a.password}`));
  }

  console.log("courses:", await Course.countDocuments(), "| users:", await User.countDocuments());
  await mongoose.disconnect();
};

run();
