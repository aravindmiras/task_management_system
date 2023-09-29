import React, { useState } from 'react';
import axios from 'axios';
function NewTask(props) {
  const [formData, setFormData] = useState({
    
    task: [
      {
        taskid:'',
        taskname: '',
        taskdescription: '',
        priority: '',
        status: '',
        deadline: '',
      },
    ],
  });

  const handleInputChange = (e, projectIndex, competitorIndex) => {
    const { name, value } = e.target;
    const newProjects = [...formData.task];
  
    if (projectIndex >= 0 && projectIndex < newProjects.length) {
      if (name === 'competitorname' || name === 'picurl' || name=='competitorid') {
        // Update the competitor field within the project
        newProjects[projectIndex].competitor[competitorIndex][name] = value;
      } else {
        // Update other project fields
        newProjects[projectIndex][name] = value;
      }
  
      // Update the form data with the new project array
      setFormData((prevFormData) => ({
        ...prevFormData,
        task: newProjects,
      }));
    }
  };
  


  const addNewProject = () => {
    setFormData({
      ...formData,
      task: [
        ...formData.task,
        {
          taskid:'',
          taskname: '',
          taskdescription: '',
          priority: '',
          status: '',
          deadline: '',
        },
      ],
    });
  };


  const addNewCompetitor = (projectIndex) => {
    const newProjects = [...formData.project];
    newProjects[projectIndex].competitor.push({
      competitorid: '',
      competitorname: '',
      picurl: '',
    });

    setFormData({
      ...formData,
      project: newProjects,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8081/addtask/${userid}/${projectid}`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        // Handle success here, e.g., redirect or display a success message
        console.log('Success:', response.data);
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10"> 
    <form onSubmit={handleSubmit} className="mb-0 space-y-6">
    <div>
      {formData.task.map((task, projectIndex) => (
        <div key={projectIndex}>
          
          <p className="block text-sm font-medium text-gray-700">Task #{projectIndex + 1}</p>
          <input
            type="text"
            name="taskid"
            value={task.taskid}
            onChange={(e) => handleInputChange(e, projectIndex)}
            placeholder="Task Id"
            className="p-2 rounded-xl border mt-2 w-full"
          />
          <input
            type="text"
            name="taskname"
            value={task.taskname}
            onChange={(e) => handleInputChange(e, projectIndex)}
            placeholder="Task Name"
            className="p-2 rounded-xl border mt-2 w-full"
          />
          <input
            type="text"
            name="taskdescription"
            value={task.description}
            onChange={(e) => handleInputChange(e, projectIndex)}
            placeholder="Task description"
            className="p-2 rounded-xl border mt-2 w-full"
          />
          <input
            type="text"
            name="priority"
            value={task.priority}
            onChange={(e) => handleInputChange(e, projectIndex)}
            placeholder="Priority"
            className="p-2 rounded-xl border mt-2 w-full"
          />
          <input
            type="text"
            name="status"
            value={task.status}
            onChange={(e) => handleInputChange(e, projectIndex)}
            placeholder="Status"
            className="p-2 rounded-xl border mt-2 w-full"
          />
          <input
            type="text"
            name="deadline"
            value={task.deadline}
            onChange={(e) => handleInputChange(e, projectIndex)}
            placeholder="Deadline"
            className="p-2 rounded-xl border mt-2 w-full"
          />
        </div>
      ))}
    </div>
      <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#ea580c] hover:scale-110 duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="button" onClick={addNewProject}>
        Add Project
      </button>
      <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#ea580c] hover:scale-110 duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="submit" onClick={handleSubmit}>Submit</button>
    </form>
    </div>
    </div>
  
  );
}
export default NewTask;
