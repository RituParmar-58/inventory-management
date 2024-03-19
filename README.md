# Inventory Management App
## Description
This is a simple web application for inventory management. It allows users to view, edit, and manage products in the inventory. The app has two modes: admin and user. In admin mode, users can edit, delete, and disable products, while in user mode, users can only view the products.

## Features
1. View all products in the inventory
2. Edit product details (name, category, price, quantity)
3. Delete products from the inventory
4. Disable/Enable products in the inventory
5. Switch between admin and user modes
## Components
### 1. App.js
This is the main component of the application. It handles the mode toggle functionality and renders the Inventory component.

###  2. Inventory.js
This component displays the list of products in the inventory. It allows users to perform CRUD operations on the products.   
a) Fetches inventory data from the API. 
b) Renders the list of products in a table. 
c) Allows editing, deleting, and disabling/enabling products. 
d) Passes down mode state to child components. 

### 3. EditProductModal.js
This component is a modal that allows users to edit product details. It appears when the user clicks on the edit button for a specific product.    

a) Displays input fields for editing product details (category, price, quantity). 
b) Allows users to save or cancel the changes. 

## Installation
Clone the repository:
git clone https://github.com/RituParmar-58/inventory-management.git

Install dependencies:
npm i react-switch

Run the application:
npm start


## Usage
1. Upon running the application, the user is presented with the list of products in the inventory.
2. Users can switch between admin and user modes using the toggle button in the navigation bar.
3. In admin mode, users can edit, delete, and disable products.
4. In user mode, users can only view the products without any editing capabilities.

