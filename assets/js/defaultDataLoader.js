(async function() {
    // Check if the data has already been set
    if (!localStorage.getItem('isDataSet')) {
        try {
            // Fetch data from JSON files
            const [sellersResponse, customersResponse, adminsResponse, productsResponse, cartResponse] = await Promise.all([
                fetch('../assets/js/sellersData.json'),
                fetch('../assets/js/customersData.json'),
                fetch('../assets/js/adminsData.json'),
                fetch('../assets/js/productsData.json'),
                fetch('../assets/js/cartData.json')
            ]);

            // Check if all fetches were successful
            if (!sellersResponse.ok || !customersResponse.ok || !adminsResponse.ok ||!productsResponse.ok || !cartResponse.ok) {
                throw new Error('Failed to fetch one or more JSON files');
            }

            // Parse JSON data
            const sellers = await sellersResponse.json();
            const customers = await customersResponse.json();
            const admins = await adminsResponse.json();
            const products = await productsResponse.json();
            const cart = await cartResponse.json();

            // Set data in local storage
            localStorage.setItem('sellersRequests', JSON.stringify(sellers));
            localStorage.setItem('users', JSON.stringify(customers));
            localStorage.setItem('admins', JSON.stringify(admins));
            localStorage.setItem('products', JSON.stringify(products));
            localStorage.setItem('cart', JSON.stringify(cart));

            // Set a flag indicating the data has been set
            localStorage.setItem('isDataSet', 'true');
        } catch (error) {
            console.error('Error setting initial data:', error);
        }
    }
})();