export interface IServerMessage {
  message: string,
  error?: boolean
}

export function toServerMessage(data: any){
  return{
    message: data.message
  }
}
