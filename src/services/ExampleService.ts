import ApiHelper from '../helper/ApiHelper';

class ExampleService extends ApiHelper{
    getExample = async () => {
        const api = this.callApi('https://animechan.vercel.app/api/random', {})
        return api
    }
} 
const exampleService: ExampleService = new ExampleService();
export default exampleService;