(async function () {
    // Check if the data has already been set
    if (!localStorage.getItem("isDataSet")) {
      try {
        // Fetch data from JSON files
        const [sellersResponse, customersResponse, adminsResponse, productsResponse, supportDataResponse, superAdminDataResponse] =
          await Promise.all([
            fetch("../assets/js/sellersData.json"),
            fetch("../assets/js/customersData.json"),
            fetch("../assets/js/adminsData.json"),
            fetch('../assets/js/productsData.json'),
            fetch('../assets/js/supportData.json'),
            fetch('../assets/js/super_adminData.json')
          ]);
  
        // Check if all fetches were successful
        if (!sellersResponse.ok || !customersResponse.ok || !adminsResponse.ok || !productsResponse.ok || !supportDataResponse.ok || !superAdminDataResponse.ok) {
          throw new Error("Failed to fetch one or more JSON files");
        }
  
        // Parse JSON data
        const sellers = await sellersResponse.json();
        const customers = await customersResponse.json();
        const admins = await adminsResponse.json();
        const products = await productsResponse.json();
        const support = await supportDataResponse.json();
        const super_admin = await superAdminDataResponse.json();

        //Encrypt Passwords before saving 

        customers.forEach(customer => {
          customer.password = Encryption.encrypt(customer.password);
        });
  
        sellers.forEach(seller => {
          seller.password = Encryption.encrypt(seller.password);
        });
  
        // Set data in local storage
        localStorage.setItem("sellersRequests", JSON.stringify(sellers));
        localStorage.setItem("users", JSON.stringify(customers));
        localStorage.setItem("admins", JSON.stringify(admins));
        localStorage.setItem('products', JSON.stringify(products));
        localStorage.setItem('support', JSON.stringify(support));
        localStorage.setItem('super_admin', JSON.stringify(super_admin));
  
        // Set a flag indicating the data has been set
        localStorage.setItem("isDataSet", "true");
      } catch (error) {
        console.error("Error setting initial data:", error);
      }
    }
  })();
  