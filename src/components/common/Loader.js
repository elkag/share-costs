import React from 'react';
import MessageSnackbar from './MessageSnackbar';
import PageBackdrop from './PageBackdrop';

/**
 * 
 * @param {*} props {loading, isError, error}, 
 */
const Loader = ({loading, isError, error}) => {


  return (
        <div>
            <PageBackdrop loading={loading}/>
            <MessageSnackbar isError={isError} error={error}/>
        </div>
  )
}


export default Loader;