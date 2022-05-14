const lekURL = 'http://localhost:36989/api/Lek';

export function getLekList(){
    const promise = fetch(lekURL);
    return promise;
}