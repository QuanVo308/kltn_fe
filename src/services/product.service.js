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
                // console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getSimilarProduct(productId, images) {
        return axios.post(`/product/${productId}/get_similar_product/`, {
            images: images,
        })
            .then(function (response) {
                // console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getProduct(productId) {
        return axios.get(`/product/${productId}/`)
            .then(function (response) {
                // console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getPlatFormLogo (platform) {
        if (platform === 'shopee') {
            return require(`../static/shopee_logo.png`)
        }
        return require(`../static/shopee_logo.png`)
    }
}

export default new ProductService();