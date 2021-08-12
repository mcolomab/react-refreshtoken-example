import {axiosInstance} from "../axios"

export function getAllPosts() {
    return axiosInstance.get('posts')
        .then(res => res.data)
        .catch(err => console.log(err))
}