import React, { useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css'
function NewProject() {
  const [formData, setFormData] = useState({
    username: '',
    password:'',
    name: '',
    email: '',
    profile: '',
    theme: '',
    role: '',
    bio: '',
    
  });

  const handleInputChange = (e, projectIndex, competitorIndex) => {
  const { name, value } = e.target;

  if (name === 'compname' || name === 'compurl') {
    // Update the competitor field within the project
    const newProjects = [...formData.project];
    newProjects[projectIndex].competitors[competitorIndex][name] = value;
    setFormData({
      ...formData,
      project: newProjects,
    });
  } else {
    // Update the top-level fields
    setFormData({
      ...formData,
      [name]: value,
    });
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("trying...bruh...")
      toast.loading('Creating new user, Appreciating patience',{
        duration: 2000,
        position: 'bottom-center', 
      });
      const response = await axios.post('http://localhost:8081/newuser', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
  
      if (response.status === 200) {
        // Handle success here, e.g., redirect or display a success message
        console.log('Success:', response.data);
        toast.success('Account created successfully', {
          duration: 4000, 
          position: 'bottom-center',
          icon:'🔥'// Display for 4 seconds
        });
        setTimeout(() => {
          // Navigate to the success page after 4 seconds
          location.href = '/'; // Use the relative URL of the success page
        }, 3000);
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error creating account! Please try again', {
        duration: 4000,
        position: 'bottom-center', 
        icon: '😔',
      });
      console.log("so frienssss");
     
    }
  };
  
  
  return (
    <div className="">
     
      <div>
      
    <form onSubmit={handleSubmit} className="mb-0 space-y-6">
      <div>
      <label className="block text-sm font-medium text-gray-700">Username</label>
        <div className="mt-1">
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
          className="p-2 rounded-xl border w-full"
        />
        </div>
      </div>

      <div>
      <label className="block text-sm font-medium text-gray-700">Password</label>
        <div className="mt-1">
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          className="p-2 rounded-xl border w-full"
        />
        </div>
      </div>

      <div>
      <label className="block text-sm font-medium text-gray-700">Name</label>
        <div className="mt-1">
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="p-2 rounded-xl border w-full"
        />
        </div>
      </div>

      <div>
      <label className="block text-sm font-medium text-gray-700">Email Id</label>
        <div className="mt-1">
        <input
          type="email"
          id="emailid"
          name="emailid"
          value={formData.emailid}
          onChange={handleInputChange}
          required
          className="p-2 rounded-xl border w-full"
        />
        </div>
      </div>

      <div>
      <label className="block text-sm font-medium text-gray-700">Profile</label>
        <div className="mt-1">
        <input
          type="text"
          id="profile"
          name="profile"
          value={formData.profile}
          onChange={handleInputChange}
          required
          className="p-2 rounded-xl border w-full"
        />
        </div>
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700">Theme</label>
        <div className="mt-1">
        <input
          type="text"
          id="theme"
          name="theme"
          value={formData.theme}
          onChange={handleInputChange}
          required
          className="p-2 rounded-xl border w-full"
        />
        </div>
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700">Role</label>
        <div className="mt-1">
        <input
          type="text"
          id="role"
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          required
          className="p-2 rounded-xl border w-full"
        />
        </div>
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700">About Yourself</label>
        <div className="mt-1">
        <input
          type="text"
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          required
          className="p-4 rounded-xl border w-full"
        />
        </div>
      </div>
      <div className="flex items-center">
            
            <label className="ml-2 block text-sm text-gray-900"
              >Get started for organized and compact
              <a href="/" className="text-indigo-600 hover:text-indigo-500">{" "}workspace{" "}</a>
             
              
            </label>
          </div>
           
          <div>
         
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#ea580c] hover:scale-110 duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleSubmit}>Create User</button>
           
          </div>
          
    </form>
    </div>
    </div>
  );
}

export default NewProject;
