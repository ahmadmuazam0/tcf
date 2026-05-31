# This file holds all your energy and protein bar products. You can easily add or edit them here!

PRODUCTS = [
    {
        "id": "bar_1",
        "name": "PhytoCore Bar",
        "flavor": "Chocolate",
        "description": "Blend of Barley, Dates, Nuts, Seeds and chocolate. The combo contains all essential Amino Acids as well as healthy fats.",
        "price": 300,  
        "nutrition": "210 kcal | 25.9g Carbs | 6.93g Protein | 4.48g Fiber",
        "image_url": "/static/images/Phytocore Bar.jpeg"
    },
    {
        "id": "bar_3",
        "name": "RTM NutriBoom",
        "weight": "100g",
        "description": "Rich chocolate and naturally sweet dates for a healthy boost.",
        "price": 500,
        "nutrition": "210 kcal | 10g Protein | 6g Fiber",
        "image_url": "/static/images/RTM NutriBoom.png"
    }
]

def get_all_products():
    return PRODUCTS

def get_product_by_id(product_id):
    for p in PRODUCTS:
        if p["id"] == product_id:
            return p
    return None
