// YourComponent.jsx

import React from 'react';
import { Button } from '@chakra-ui/react';
import { toast, Toaster } from 'react-hot-toast';

const YourComponent = () => {
  const handleSuccessClick = () => {
    console.log("bruh");
    // Trigger a success notification
    toast.success('Success notification triggered!', {
      duration: 4000, // Display for 4 seconds
    })
    console.log("bruh1");
  };

  return (
    <div>
        <Toaster/>
      <Button onClick={handleSuccessClick}>Trigger Success Notification</Button>
    </div>
  );
};

export default YourComponent;
