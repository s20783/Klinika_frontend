const lekURL = 'http://localhost:36989/api/Lek';

export function getLekList(){
    const promise = fetch(lekURL);
    return promise;
}

export function getLekDetailsList(Id){
    const url = `${lekURL}/${Id}`;
    const promise = fetch(url);
    return promise;
}