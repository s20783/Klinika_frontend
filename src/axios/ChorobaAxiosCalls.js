import api from "./AuthApi";
import axios from "axios";

export function getChorobaList(source) {
    return api.get('/Choroba', {
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export function getChorobaDetails(Id, source) {
    return api.get(`/Choroba/${Id}`,{
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })
}

export async function addChoroba(choroba,source) {
    const chorobaString = JSON.stringify(choroba)
    await api.post(`/Choroba`, chorobaString,{
        cancelToken: source.token
    }).then((response) => {
        console.log(response)
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }

    })


}

export async function updateChoroba(choroba, Id, source) {
    const chorobaString = JSON.stringify(choroba)
    await api.put(`/Choroba/${Id}`, chorobaString,{
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })

}

export async function deleteChoroba(Id,source) {
    await api.delete(`/Choroba/${Id}`,{
        cancelToken: source.token
    }).then((response) => {
        return response
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        }
    })

}