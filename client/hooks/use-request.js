import axios from 'axios';
import { useState } from 'react';

export default ({ url, method, body, onSuccess })=> {
    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
        try {
            setErrors(null);
            const response = await axios[method](url, body);
            if(onSuccess) {
                onSuccess(response.data);
            }
            return response.data;
        }
        catch(err) {
            setErrors(
                <div className="alert alert-danger">
                    { err.response.data.errors.map( (err) => err.message ) }
                </div>
            )
        }
    };

    return { doRequest, errors }
}