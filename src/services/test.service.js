/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

class TestProductService {
    test() {
        return axios.get('/product_test/test/')
            .then(function (response) {
                // console.log(response.data);
                return response;
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getAll() {
        return axios.get('/product_test/')
            .then(function (response) {
                // console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    getSimilarImages(name) {
        return axios.get('/product_test/get_similar_image/', {
            params: {
                name: name
            }
        })
            .then(function (response) {
                // console.log(response.data.detail);
                return response.data.detail;
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export default new TestProductService();