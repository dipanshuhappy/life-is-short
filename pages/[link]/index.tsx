import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';

function Link() {
   const Redirect = dynamic(() => import('@/src/components/Redirect'))
   return (
      <div>
         <Redirect />
      </div>
   )
}

export default Link;