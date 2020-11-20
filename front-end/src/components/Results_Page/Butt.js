import React from 'react'
import { useLightbox } from 'simple-react-lightbox'

/*
We can use the provided hook in case you want
to open the lightbox from a button or anything :)
*/

// import React from 'react';
// import { useScreenWidth } from '../hooks/useScreenWidth';

export const withHooksHOC = (Component: any) => {
  return (props: any) => {
    const {openLightbox} = useLightbox();
    // const openLightbox2 = openLightbox(props.imageToOpen);
    return <Component width={openLightbox(props.imageToOpen)} {...props} />;
  };
};

// const Button = props => {
//   const { openLightbox } = useLightbox()

//   return (
//     <button
//       style={{margin:"5%"}}
//       onClick={() => {let a=openLightbox();console.log(a)}}
//     >
//       Open the lightbox
//     </button>
//   )
// }

// export default Button
