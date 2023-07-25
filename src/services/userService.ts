import create from "./http-service";

export interface Member {
    _id: string,
    name: string,
    age: number,
    role: string,
    birthday: string,
    isDeleted: string
}

export default create('/families');