import { Attachment } from "../interfaces/attachment.interface";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || 'api'

export function getListAttachment() {
    const url = `${API_URL}/api/attachment/list`;
    return axios.get<Attachment[]>(url)
}