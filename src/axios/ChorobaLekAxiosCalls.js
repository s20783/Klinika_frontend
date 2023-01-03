import api from "./Api";
import axios from "axios";

export async function addChorobaLek(IdChoroba, IdLek, source) {
    await api.post(`/ChorobaLek/${IdChoroba}/${IdLek}`,{
        cancelToken: source.token
    }).then((response) => {
        console.log(response)
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
        else {
            console.log(thrown.message)
        }
    })
}

export async function deleteChorobaLek(IdChoroba, IdLek,source) {
    await api.delete(`/ChorobaLek/${IdChoroba}/${IdLek}`,{
        cancelToken: source.token
    }).then((response) => {
        console.log(response)
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
        else {
            console.log(thrown.message)
        }
    })
}