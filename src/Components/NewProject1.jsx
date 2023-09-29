import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function NewProject1(props) {
  const [formData, setFormData] = useState({
    
    project: [
      {
        projectid:'',
        projectname: '',
        desci: '',
        domain: '',
        deadline: '',
        target: '',
        logo: '',
        competitor: [
          {
            competitorid: '',
            competitorname: '',
            picurl: '',
          },
        ],
      },
    ],
  });

  const handleInputChange = (e, projectIndex, competitorIndex) => {
    const { name, value } = e.target;
    const newProjects = [...formData.project];
  
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
        project: newProjects,
      }));
    }
  };
  


  const addNewProject = () => {
    setFormData({
      ...formData,
      project: [
        ...formData.project,
        {
          projectid: '',
          projectname: '',
          desci: '',
          domain: '',
          deadline: '',
          target: '',
          logo: '',
          competitor: [
            {
            competitorid: '',
            competitorname: '',
            picurl: '',
            },
          ],
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
      const response = await axios.put(`http://localhost:8081/addproject/${props.userid}`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        // Handle success here, e.g., redirect or display a success message
        console.log('Success:', response.data);
        toast.info('This is a toast message!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        throw new Error('Network response was not ok');
        
      }
    } catch (error) {
      console.error('Error:', error);
      toast.info('This is a toast message!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     let response;
  
  //     // Check if projectid is present in the first project
  //     if (formData.project[0].projectid) {
  //       // If projectid exists, make a PUT request to update an existing project
  //       response = await axios.put(`http://localhost:8081/9/updateproject`, formData, {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       });
  //     } else {
  //       // If projectid is not present, make a POST request to create a new project
  //       response = await axios.post(`http://localhost:8081/1/addproject`, formData, {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       });
  //     }
  
  //     if (response.status === 200) {
  //       // Handle success here, e.g., redirect or display a success message
  //       console.log('Success:', response.data);
  //     } else {
  //       throw new Error('Network response was not ok');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };
  
  
  return (
    
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10"> 
    <form onSubmit={handleSubmit} className="mb-0 space-y-6">
<div>
      {formData.project.map((project, projectIndex) => (
        <div key={projectIndex}>
          <p className="block text-sm font-medium text-gray-700">Project #{projectIndex + 1}</p>
          <input
            type="text"
            name="projectid"
            value={project.projectid}
            onChange={(e) => handleInputChange(e, projectIndex)}
            placeholder="Project Id"
            className="p-2 rounded-xl border mt-2 w-full"
          />
          <input
            type="text"
            name="projectname"
            value={project.projectname}
            onChange={(e) => handleInputChange(e, projectIndex)}
            placeholder="Project Name"
            className="p-2 rounded-xl border mt-2 w-full"
          />
          <input
            type="text"
            name="desci"
            value={project.desci}
            onChange={(e) => handleInputChange(e, projectIndex)}
            placeholder="desc"
            className="p-2 rounded-xl border mt-2 w-full"
          />
          <input
            type="text"
            name="domain"
            value={project.domain}
            onChange={(e) => handleInputChange(e, projectIndex)}
            placeholder="domain"
            className="p-2 rounded-xl border mt-2 w-full"
          />
          <input
            type="text"
            name="deadline"
            value={project.deadline}
            onChange={(e) => handleInputChange(e, projectIndex)}
            placeholder="deadline"
            className="p-2 rounded-xl border mt-2 w-full"
          />
          <input
            type="text"
            name="target"
            value={project.target}
            onChange={(e) => handleInputChange(e, projectIndex)}
            placeholder="target"
            className="p-2 rounded-xl border mt-2 mb-4 w-full"
          />
          <input
            type="text"
            name="logo"
            value={project.logo}
            onChange={(e) => handleInputChange(e, projectIndex)}
            placeholder="Logo"
            className="p-2 rounded-xl border mt-2 mb-4 w-full"
          />
          {/* Add similar inputs for other project fields */}
          {project.competitor.map((competitor, competitorIndex) => (
            <div key={competitorIndex}>
              <p className="block text-sm font-medium text-gray-700">Competitor #{competitorIndex + 1}</p>
              <input
                type="text"
                name="competitorid"
                value={competitor.competitorid}
                onChange={(e) =>
                  handleInputChange(e, projectIndex, competitorIndex)
                }
                placeholder="Competitor Id"
                className="p-2 rounded-xl border mt-2 w-full"
              />
              <input
                type="text"
                name="competitorname"
                value={competitor.competitorname}
                onChange={(e) =>
                  handleInputChange(e, projectIndex, competitorIndex)
                }
                placeholder="Competitor Name"
                className="p-2 rounded-xl border mt-2 w-full"
              />
              <input
                type="text"
                name="picurl"
                value={competitor.picurl}
                onChange={(e) =>
                  handleInputChange(e, projectIndex, competitorIndex)
                }
                placeholder="Competitor URL"
                className="p-2 rounded-xl border mt-2 mb-4 w-full"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => addNewCompetitor(projectIndex)}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#ea580c] hover:scale-110 duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Competitor
          </button>
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

export default NewProject1;
