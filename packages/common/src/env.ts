import * as z from 'zod'

export const createEnv= <TSchema extends z.ZodRawShape>(schema:z.ZodObject<TSchema>)=>{
        const source = process.env;
        const parsed = schema.safeParse(source);
        if(!parsed.success){
            const error = parsed.error;
            console.log(error);
            throw error;
        }
        return parsed.data;
}
