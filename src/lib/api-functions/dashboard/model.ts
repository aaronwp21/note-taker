import mongoose from 'mongoose';
const { Schema } = mongoose;

export const dashboardSchema = new Schema({
  owner: {
    type: String,
    required: true,
  },
  NOTES: {
    type: Array,
    required: true,
  },
  TAGS: {
    type: Array,
    required: true,
  },
});

const Dashboard = mongoose?.models.Dashboard || mongoose.model('Dashboard', dashboardSchema);
export default Dashboard;