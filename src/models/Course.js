import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  level: { type: String, required: true },
  duration: { type: String, required: true },
  image: { type: String, required: true },
});

export default mongoose.models.Course || mongoose.model("Course", CourseSchema);
