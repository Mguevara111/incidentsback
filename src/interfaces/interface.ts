import type { Status } from "../types/types.js";
import type { Severity } from "../types/types.js";

export interface Incident{
    id:string,
    title:string,
    description:string,
    severity:Severity,
    status:Status,
    assignedTo:string,
    attachmentUrl:string | null,
    createAt:string
}

export interface Resapi{
    success:boolean,
    message:string | null,
    data:Incident[] | null
}