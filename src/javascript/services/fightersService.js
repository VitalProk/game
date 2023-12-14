import callApi from '../helpers/apiHelper';

class FighterService {
    #endpoint = 'fighters.json';

    #endpoint2 = 'details/fighter/';

    async getFighters() {
        try {
            const apiResult = await callApi(this.#endpoint);
            return apiResult;
        } catch (error) {
            throw error;
        }
    }

    async getFighterDetails(id) {
        // todo: implement this method
        // endpoint - `details/fighter/${id}.json`;
        try {
            const endpoint = `${this.#endpoint2}${id}.json`;
            const apiResult = await callApi(endpoint);
            return apiResult;
        } catch (error) {
            throw error;
        }
    }
}

const fighterService = new FighterService();

export default fighterService;
