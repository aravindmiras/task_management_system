import React, { useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
function DeleteTask(props) {
  const [message, setMessage] = useState('');
  const apiUrl = `http://localhost:8081/deletetask/${props.taskid}`; // Replace with your API endpoint URL
  

  const handleDeleteClick = () => {
    axios
      .delete(apiUrl)
      .then(response => {
        setMessage('Element deleted successfully');
        console.log('Element deleted successfully:', response.data);
        toast.success('Task deleted successfully', {
            duration: 4000, 
            position: 'top-center',
            icon:'🗑️'// Display for 4 seconds
          });
          setTimeout(() => {
            // Navigate to the success page after 4 seconds
            location.href = `/post/TasksDash/${props.projectid}`; // Use the relative URL of the success page
          }, 2000);
      })
      .catch(error => {
        setMessage('Error deleting element');
        console.error('Error deleting element:', error);
        toast.error('Error deleting! Please try again', {
            duration: 4000,
            position: 'bottom-center', 
            icon: '😔',
          });
      });
  };

  return (
    
      <button className="w-1/2 block mx-auto rounded-full bg-white hover:scale-110 duration-200 font-semibold text-[#ea580c] px-6 py-2 mt-3" onClick={handleDeleteClick}>Delete</button>
   
  );
}

export default DeleteTask;
