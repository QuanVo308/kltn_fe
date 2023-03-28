/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

class CategoryService {
    getRandom(number = 15) {
        return axios.get('/category/get_random/', {
            params: {
                quantity: number
            }
        })
            .then(function (response) {
                var categories = []
                response.data.forEach((category) => {
                    categories.push(category)
                })
                // console.log(categories);

                return categories;
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    search(words = '', number = 15) {
        return axios.get('/category/search/', {
            params: {
                quantity: number,
                search: words
            }
        })
            .then(function (response) {
                var categories = []
                response.data.forEach((category) => {
                    categories.push(category)
                })
                // console.log(categories);

                return categories;
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    test(selectedCate = []) {
        return axios.post('/category/test/', {

            categories: selectedCate

        })
            .then(function (response) {
                var categories = []
                response.data.forEach((category) => {
                    categories.push(category.name)
                })
                // console.log(categories);

                return categories;
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export default new CategoryService();