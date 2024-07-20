# Furniture E-Commerce System

Welcome to the Furniture E-Commerce System! This project is designed for an online furniture store where users can register as customers or sellers, and admins can manage seller registrations and perform other administrative tasks. The system uses local storage and Bootstrap 5 for a modern, responsive user experience.

## Project Overview

This furniture e-commerce system is built using HTML, CSS, and JavaScript, and follows the Model-View-Controller (MVC) architectural pattern. It includes features for customers, sellers, and administrators, along with protected routes for security.

## Project Structure

- **`views/`**: Contains HTML files for different views of the application.
  - **`home.html`**: The homepage where users can choose to register as a customer or a seller and users can view products, manage their cart, place orders, and access their wishlist.
  - **`adminlogin.html`**: The admin login page where admins can log in to manage seller registrations and perform other administrative tasks.
  - **`sellerdashboard.html`**: The seller dashboard where authorized sellers can manage their furniture products and orders.

- **`controllers/`**: Contains JavaScript files that handle the application's logic and interactions.
  - **`authController.js`**: Manages user registrations (both customer and seller) and sends registration requests.
  - **`adminController.js`**: Handles admin login, seller approval processes, account management, and support requests.
  - **`productController.js`**: Manages furniture product and order functionalities for sellers.
  - **`userController.js`**: Handles customer interactions, including viewing products, cart management, orders, wishlist, and help requests.

- **`models/`**: Contains JavaScript files representing the data structures and interactions with local storage.

- **`assets/css/`**: Contains CSS files for styling the application, utilizing Bootstrap 5 for responsive design.

## Features

### General Features

- **Customer Registration**: Allows users to register as customers to browse and purchase furniture.
- **Seller Registration**: Allows users to register as sellers of furniture, with a pending approval process by the admin.
- **Admin Login**: Provides a secure login for admins to manage seller registrations and perform other administrative tasks.

### Seller Dashboard

- **Furniture Management**:
  - **Display Furniture**: Shows all furniture products with details such as name, description, price, and image.
  - **Add New Furniture**: Allows sellers to add new furniture items to the catalog.
  - **Edit Furniture**: Enables modification of existing furniture details.
  - **Delete Furniture**: Provides functionality to remove furniture items.

- **Order Management**:
  - **View Orders**: Displays orders for furniture products sold by the seller.
  - **Filter Orders**: Allows filtering of orders by ID and status.
  - **Change Order Status**: Enables updating the status of orders (e.g., pending, shipped, delivered).

- **Analytics**:
  - **Order Status Analysis**: Provides analysis of the number of orders by status.
  - **Monthly Profit Analysis**: Displays profit earned by the seller each month.

- **Authentication**:
  - **Logout**: Allows sellers to log out of their dashboard.
  - **Authorization**: Ensures that only authorized sellers can access the dashboard.

### Customer 

- **Product Management**:
  - **View Products**: Allows users to browse and view detailed information about furniture products.
  - **Add to Cart**: Users can add products to their shopping cart for purchase.
  - **Place Orders**: Users can make orders for products in their cart, but must be logged in to do so.
  - **Add to Wishlist**: Users can add products to their wishlist for future reference.

- **Catalog Filtering**:
  - **Filter Products**: Provides options to filter products based on various criteria such as category, price, and more.

- **Help Requests**:
  - **Send Help Requests**: Users can send requests for assistance to the admin.
  - **Follow Up**: Users can track the status and follow up on their help requests.
  - 
- **Authentication**:
  - **Logout**: Allows customers to log out of their account.
  - **Authorization**: Ensures that only authorized customers can access the account.
 
### SuperAdmin Dashboard

- **admins Management**:
  - **Display all admins .
  - **can delete and add admin.

### Admin Dashboard

- **Seller Management**:
  - **Display Seller Requests**: Shows pending seller registration requests.
  - **Accept or Remove Requests**: Allows admins to accept or remove seller registration requests.
  - **Manage Seller Accounts**: Admins can manage seller accounts and can deactivate seller.

- **User Management**:
  - **Manage User Accounts**: Admins can view, modify, suspend, and reset passwords for user accounts.

- **Product Management**:
  - **Manage Products**: Allows admins to view, modify, and delete products from all sellers.

- **Support Requests**:
  - **Display Support Requests**: Shows support requests sent by users.
  - **Resolve Requests**: Allows admins to resolve support requests.

- **Authentication**:
  - **Logout**: Allows admins to log out of their dashboard.
  - **Authorization**: Ensures that only authorized admins can access the dashboard.

## Security

- **Protected Routes**: All routes for the admin dashboard, seller dashboard, and customer dashboard are protected to ensure secure access based on user roles.

## Technologies Used

- **HTML**: For structuring the web pages.
- **CSS**: For styling the application, utilizing Bootstrap 5 for responsive design.
- **JavaScript**: For client-side scripting and interactivity.
- **Local Storage**: For storing data on the client-side.
- **MVC Architecture**: For organizing the project into models, views, and controllers.

## How to Run the Project

1. **Open the Application:**
   - Navigate to the `views` directory.
   - Open `home.html` in your web browser to start using the application.


2. **Register as a Customer or Seller:**
   - On the homepage (`home.html`), choose to register as a customer or a seller.
   - If registering as a seller, a registration request will be sent to the admin.

3. **Admin Actions:**
   - To manage seller registrations and perform other administrative tasks, open `adminlogin.html` in your web browser.
   - Log in using the admin credentials.
   - Manage seller registrations, user accounts, products, and support requests as needed.
   - analyze sellers and customer nums , opened and closed nums of support requests

4. **Seller Dashboard:**
   - Once registered as a seller and approved, open `home.html` , login as seller and go to sellerDashboard.html.
   - Manage furniture products(can add product , edit product , filter products and delete product ).
   - view and filter orders.
   - analyze order statistics and monthly profit, and log out as needed.

5. **Customer :**
   - After registering as a customer, open `home.html`.
   - Browse products, manage your cart and wishlist, place orders (logged-in users only), filter the product catalog, send help requests, and follow up on requests.

## Future Enhancements

- Integration with a backend database for persistent data storage.
