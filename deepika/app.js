const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://madhukar:madhukar@aith.iebemsz.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define MongoDB schemas
const teamMemberSchema = new mongoose.Schema({
//   _id: mongoose.ObjectId,
  student_name: String,
  role: String,
  email: String,
});

// const taskSchema = new mongoose.Schema({
// //   _id: mongoose.ObjectId,
//   title: String,
//   description: String,
//   status: String,
//   due_date: Date,
//   assigned_to: { type: mongoose.ObjectId, ref: 'TeamMember' },
// });

const projectSchema = new mongoose.Schema({
  
//   _id: new mongoose.Types.ObjectId(),
  name: String,
  description: String,
  start_date: String,
  end_date: String,
  team: [String],
  assigned_to: [String]
  // tasks: [{ type: mongoose.ObjectId, ref: 'Task' }],
});

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);
// const Task = mongoose.model('Task', taskSchema);
const Project = mongoose.model('Project', projectSchema);

// Middleware
app.use(bodyParser.json());

// API endpoint to add a project
app.post('/add-project', async (req, res) => {
  try {
    // Create a new project
    const project = new Project(req.body);

    // Save the project to the database
    await project.save();

    const { name, description, start_date, end_date, team } = req.body;

    // Create a new project with the extracted details
    // const newProject = await Project.create({
    //   name,
    //   description,
    //   start_date,
    //   end_date,
    //   team,
    // });

    res.status(201).json({ message: 'Project added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
