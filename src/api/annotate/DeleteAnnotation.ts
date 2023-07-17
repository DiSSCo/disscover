/* Import Dependencies */
import axios from 'axios';


const DeleteAnnotation = async (handle?: string, token?: string) => {
    let response

    if (handle && token) {
        const endPoint = `annotations/${handle}`;

        try {
            const result = await axios({
                method: "delete",
                url: endPoint,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            response = result.data;
        } catch (error) {
            console.warn(error);
        }
    }

    return response;
}

export default DeleteAnnotation;