//Page1 (Home Page)

# List of All City (GET)
* http://localhost:8777/location

# LIST of All Restaurants (GET)
* http://localhost:8777/restaurants

# Restaurants WRT City (GET)
* http://localhost:8777/restaurants?stateId=3

# List of All Meal (GET)
* http://localhost:8777/mealType

//Page2 (Listing Page)
# List of Rest wrt mealType (GET)
* http://localhost:8777/filters/1

# List of Rest wrt mealType + cuisine (GET)
* http://localhost:8777/filters/2?cuisineId=2

# List of Rest wrt mealType + cost (GET)
* http://localhost:8777/filters/1?lcost=500&hcost=1000

# sort on the basis price (GET)
* http://localhost:8777/filters/1?sort=-1

# Pagination
* http://localhost:8777/filters/1?skip=2&limit=2

//Page3 (Details Page)
# Details of Rest wrt to Id (GET)
* http://localhost:8777/details/11
* http://localhost:8777/details/651394d817e34ede35314a4c

# Menu wrt to id (GET)
* http://localhost:8777/menu/3


//page4

# Details of selected Item (POST)
* http://localhost:8777/menuDetails
> body = {"id":[1,2,3]}

# Place the order (POST)
* http://localhost:8777/placeOrder
 {
        "orderId": 4,
        "name": "Rohit",
        "email": "rohit@gmail.com",
        "address": "Hom 65",
        "phone": 8934645457,
        "cost": 931,
        "menuItem": [
            9,4,5
        ],
        "status": "Pending"
    }

//page5
# List of order wrt email (GET)
* http://localhost:8777/orders?email=rohit@gmail.com

# Update order status (PUT)
* http://localhost:8777/updateOrder
{
    "_id":"66aef42cb5f85eb0370fe7ab",
    "status":"Delivered"
}


# Delete Order (Delete)
* http://localhost:8777/deleteOrder
> {
    "_id":"66aef42cb5f85eb0370fe7ab"
}