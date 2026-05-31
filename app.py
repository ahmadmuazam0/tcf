from flask import Flask, render_template, request, jsonify
import inventory

app = Flask(__name__)
app.secret_key = 'nutribites_secret' # Needed for flash messages or session if added later

@app.route('/')
def home():
    # Get all products from our inventory file
    products = inventory.get_all_products()
    return render_template('index.html', products=products)

@app.route('/checkout', methods=['GET', 'POST'])
def checkout():
    if request.method == 'POST':
        # This is where we handle the order submission
        # In a real app, we'd save this to a database
        data = request.json
        print("Received Order:", data)
        return jsonify({"status": "success", "message": "Order placed successfully!"})
    
    return render_template('checkout.html')

if __name__ == '__main__':
    # Start the server!
    app.run(debug=True, port=5000)
