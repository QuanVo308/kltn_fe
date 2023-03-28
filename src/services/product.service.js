/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

class ProductService {
    getFindProduct(selectedCate = [], searchKey='', page = 1) {
        return axios.post('/product/find_product/', {
            categories: selectedCate,
            name: searchKey,
            page: page,
        })
            .then(function (response) {

                console.log(response.data);

                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export default new ProductService();