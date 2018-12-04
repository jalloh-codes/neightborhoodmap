class Source {
    static baseURL(){
        return 'https://api.foursquare.com/v2';
    }
    static auth(){
        const keys ={
            client_id: 'QYUZY0I3WVSOB0P0PT3LZ4VILEVPS4RP3A1JCFIYBUYP3P4O',
            client_secret: 'ASB14XYFPHQBRIUWGATIHKH03J3Y3AQP1AQ31VXPI4V1BZ1M',
            v: '20182507'
        }
        return Object.keys(keys)
            .map(key => `${key}=${keys[key]}`)
            .join('&')
    }
    static header(){
        return{
            Accept: "application/json"
        }
    }
    static simpleFetch(endPiont, method, url){
        // let requestData = {
        //     method,
        //     header: Source.header()
        // };
        return fetch(`${Source.baseURL()}${endPiont}?${Source.auth()}&${Source.urlBuilder(
            url
        )}`).then(res => res.json())
    }
    static urlBuilder(url){
        if(!url){
            return "";
        }
        return Object.keys(url)
            .map(key => `${key}=${url[key]}`)
            .join('&');
    }

}

export default class API {
    static search(url) {
        return Source.simpleFetch("/venues/search", "GET", url);
    }
    static getVenuesDetails(VID){
        return Source.simpleFetch(`/venues/${VID}`, "GET");
    }
    static getVenuesPhoto(VID){
        return Source.simpleFetch(`/venues/${VID}/photos`, "GET");
    }
}
// venues Data from FourSquare
