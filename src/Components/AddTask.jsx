import React, { Component } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectid: props.projectid,
      taskname: '',
      taskdescription: '',
      priority: '',
      status: '',
      deadline: '',
      
    };
  }

  handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send files along with other form data
    const formData = new FormData();
    
    formData.append('taskname', this.state.taskname);
    formData.append('taskdescription', this.state.taskdescription);
    formData.append('priority', this.state.priority);
    formData.append('status', this.state.status);
    formData.append('deadline', this.state.deadline);
    formData.append('projectid', this.state.projectid);

    try {
      // Make a POST request using Axios
      const response = await axios.post('http://localhost:8081/newtask', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toast.success('Task added successfully', {
        duration: 4000, 
        position: 'top-center',
        // Display for 4 seconds
      });
      // Handle the response as needed (e.g., show a success message)
      console.log('Response:', response.data);

      setTimeout(() => {
        // Navigate to the success page after 4 seconds
        location.href = `/post/TasksDash/${this.props.projectid}`; // Use the relative URL of the success page
      }, 2000);

      console.log('executed....');
    } catch (error) {
      // Handle errors (e.g., display an error message)
      console.error('Error:', error);
      toast.error('Error adding task! Please try again', {
        duration: 4000,
        position: 'bottom-center', 
        icon: '😔',
      });
    }
  };

  render() {
    return (
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10"> 
        <form onSubmit={this.handleSubmit} className="mb-0 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Task Name:</label>
            <input
              type="text"
              name="taskname"
              value={this.state.taskname}
              onChange={this.handleInputChange}
              className="p-2 rounded-xl border mt-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Task Description:</label>
            <textarea
              name="taskdescription"
              value={this.state.taskdescription}
              onChange={this.handleInputChange}
              className="p-2 rounded-xl border mt-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Priority:</label>
            <input
              type="text"
              name="priority"
              value={this.state.priority}
              onChange={this.handleInputChange}
              className="p-2 rounded-xl border mt-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status:</label>
            <input
              type="text"
              name="status"
              value={this.state.status}
              onChange={this.handleInputChange}
              className="p-2 rounded-xl border mt-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Deadline:</label>
            <input
              type="text"
              name="deadline"
              value={this.state.deadline}
              onChange={this.handleInputChange}
              className="p-2 rounded-xl border mt-2 w-full"
            />
          </div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#ea580c] hover:scale-110 duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</button>
        </form>
        </div>
      </div>
    );
  }
}

export default AddTask;
