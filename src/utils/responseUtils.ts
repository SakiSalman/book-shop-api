export class ResponseUtils {


    static successResponse (statusCode:number, message:string, dataKey? : (string | null), data?:any):any{
        let responseResult : {
            status : String;
            statusCode? : Number;
            message? : String;
            [key : string] : any
        }={
            status : 'success',
            statusCode:statusCode,
            message : message
        }

        if (dataKey && data) responseResult[dataKey] = data
        if (!dataKey && data) responseResult= {...responseResult, ...data}

        return responseResult
    }
}