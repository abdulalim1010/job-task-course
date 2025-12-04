// createAdmin.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import path from "path";

// Explicitly load .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const MONGO_URI = process.env.MONGODB_URI;
if (!MONGO_URI) {
  console.error("❌ MONGODB_URI is not defined in .env.local");
  process.exit(1);
}

// MongoDB connect
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// Admin schema
const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "admin" },
  createdAt: { type: Date, default: Date.now },
});

const Admin = mongoose.model("Admin", adminSchema);

// Admin credentials
const ADMIN_NAME = "Super Admin";
const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "supersecret";

async function createAdmin() {
  try {
    const existingAdmin = await Admin.findOne({ email: ADMIN_EMAIL });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists!");
      return process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    const admin = new Admin({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: hashedPassword,
    });

    await admin.save();
    console.log("✅ Admin created successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating admin:", err);
    process.exit(1);
  }
}

createAdmin();
