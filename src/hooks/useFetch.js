import axios from "axios";
import { useState, useEffect } from 'react';

const useFetch = ( url ) => {

    const [ response, setResponse ] = useState( {  } )

    useEffect( (  ) => {
        axios.get( url )
        .then( res => { setResponse( res.data ) } )
    }, [ url ] )

    return response;
}

export default useFetch;