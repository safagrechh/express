
const mongoose = require("mongoose");

const EmployeSchema = new mongoose.Schema(
    {
    FullName : {
        type: String,
        required: [true, "Group Name is required !!"],
      },
     Rank : {
        type: Number,
        required: [true, "Group Name is required !!"],
      },
      Salary: {
        type: Number,
        required: [true, "Group Name is required !!"],
      }
    }
);
module.exports = mongoose.model("Employe", EmployeSchema);