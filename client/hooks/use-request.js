import axios from 'axios';
import { useState } from 'react';

export default ({ url, method, body, onSuccess })=> {
    const [errors, setErrors] = useState(null);

    const doRequest = async (props = {}) => {
        try {
            setErrors(null);
            const response = await axios[method.toLowerCase()](url, {
                ...body, ...props
            });
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