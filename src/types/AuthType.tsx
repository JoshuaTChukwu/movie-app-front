import { type } from "os"

export type LoginType ={
userName:string,
password:string
}
export type StatusFormat = {
    isSuccess: boolean,
    friendlyMessage: string,
}
export type AuthResponse ={
    token: string,
    status : StatusFormat
}