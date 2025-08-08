import "dotenv/config";
// importamos la Variable de Entorno de Nuestro archivo .env y luego lo Exportamos hacia el modulo Index.ts 
export const PORT: number = process.env.PORT?parseInt(process.env.PORT,10) : 3001;

export const DB_TYPE: "postgres" =  "postgres"
export const DB_HOST: string | undefined = process.env.DB_HOST
export const DB_PORT: number | undefined= process.env.DB_PORT? parseInt(process.env.DB_PORT): undefined 
export const DB_USERNAME: string | undefined = process.env.DB_USERNAME
export const DB_PASSWORD: string | undefined = process.env.DB_PASSWORD 
export const DB_NAME: string | undefined = process.env.DB_NAME
export const DB_DROPSCHEMA: boolean = process.env.DB_DROPSCHEMA ? process.env.DB_DROPSCHEMA === "false" : true
export const DB_SYNCHRONIZE: boolean = process.env.DB_SYNCHRONIZE ? process.env.DB_SYNCHRONIZE === "true" : true
export const DB_LOGGING: boolean = process.env.DB_LOGGING ? process.env.DB_LOGGING === "true" : true 
// export const DB_ENTITIES: string[] = process.env.DB_ENTITIES ? process.env.DB_ENTITIES.split(","): ["src/entities/**/*.ts"]
export const DB_ENTITIES: string[] = [process.env.DB_ENTITIES || "src/entities/**/*.ts"]
