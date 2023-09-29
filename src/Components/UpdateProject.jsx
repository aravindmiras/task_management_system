import React, { Component } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
class UpdateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: props.userid,
      projectname: this.props.projectname,
      desci: this.props.desci,
      domain: this.props.domain,
      deadline:  this.props.deadline,
      target: this.props.target,
      logo:this.props.logo,
    };
  }
//   componentDidMount() {
//     // Set the default value for userid in the component state
//     this.setState({ 
//         projectname: this.props.projectname,
//       desci: this.props.desci,
//       domain: this.props.domain,
//       deadline: this.props.deadline,
//       target: this.props.target,
//       logo: this.props.logo,
//      });
//   }


  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send files along with other form data
    const formData = new FormData();
    formData.append('userid', this.state.userid);
    formData.append('projectname', this.state.projectname);
    formData.append('desci', this.state.desci);
    formData.append('domain', this.state.domain);
    formData.append('deadline', this.state.deadline);
    formData.append('target', this.state.target);
    formData.append('logo', this.state.logo);

    try {
      // Make a POST request using Axios
      const response = await axios.put(`http://localhost:8081/editproject/${this.props.projectid}`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toast.success('Project updated successfully', {
        duration: 4000, 
        position: 'top-center',
        
      });
      setTimeout(() => {
        // Navigate to the success page after 4 seconds
        location.href = `/post/ProjectDashboard/${props.username}`; // Use the relative URL of the success page
      }, 3000);
      // Handle the response as needed (e.g., show a success message)
      console.log('Response:', response.data);
    } catch (error) {
      // Handle errors (e.g., display an error message)
      console.error('Error:', error);
      toast.error('Error updating! Please try again', {
        duration: 4000,
        position: 'top-center', 
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
            <label className="block text-sm font-medium text-gray-700">Project Name:</label>
            <input
              type="text"
              name="projectname"
              value={this.state.projectname}
              onChange={this.handleInputChange}
              className="p-2 rounded-xl border mt-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description:</label>
            <textarea
              name="desci"
              value={this.state.desci}
              onChange={this.handleInputChange}
              className="p-2 rounded-xl border mt-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Domain:</label>
            <input
              type="text"
              name="domain"
              value={this.state.domain}
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
          <div>
            <label className="block text-sm font-medium text-gray-700">Target:</label>
            <input
              type="text"
              name="target"
              value={this.state.target}
              onChange={this.handleInputChange}
              className="p-2 rounded-xl border mt-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Logo:</label>
            <input
              type="text"
              name="logo"
              value={this.state.logo}
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

export default UpdateProject;
