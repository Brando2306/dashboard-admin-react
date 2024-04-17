import { useState } from "react";
import { getListAttachment } from "../services/getListAttachment";
import { Attachment } from "../interfaces/attachment.interface";

export const useGetAttachment = () => {
    const [isLoading, setIsloading] = useState(false)
    const [error, setError] = useState('')
    const [attachment, setAttachment] = useState<Attachment[]>([]);

    const getAttachments = async () => {
        setIsloading(true);
        try {
            const response = await getListAttachment();
            setAttachment(response.data); 
        } catch (error) {
            setError('Error al obtener la lista de attachments '+error);
        } finally {
            setIsloading(false);
        }
    }

    // useEffect(() => {
    //     getAttachments();
    // }, [])
    
    return {
        isLoading,
        error,
        attachment,
        getAttachments
    };
}