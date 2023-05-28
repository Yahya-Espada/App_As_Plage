import http from "./interceptor/Axiosinterceptor";
export default class PlagePubliqueService {
    GetAllPlagesPubliques() {
        return http.get(`/plage_publique/GetAllPlagesPubliques`)
    }
}