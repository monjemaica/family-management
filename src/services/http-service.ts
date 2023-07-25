import apiClient from "./api-client";

class HttpService {
    endpoint: string;

    constructor(endpoint: string){
        this.endpoint = endpoint;
    }

    getAll<T>(){
        const controller = new AbortController();
        const request = apiClient.get<T[]>(this.endpoint, { signal: controller.signal })
        return{request, cancel: () => controller.abort()}
    }

    create<T>(entity: T){
        return apiClient.post(this.endpoint, entity)
    }

    delete(id:string){
        return apiClient.delete(`${this.endpoint }/${id}`)
    }

    update<T>(entity:T, id:string){
        return apiClient.patch(`${this.endpoint}/${id}`, entity)
    }
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;