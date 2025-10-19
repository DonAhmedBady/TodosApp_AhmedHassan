from flask import Flask, render_template, request, redirect, url_for, flash
import json, bcrypt

app = Flask(__name__)
app.secret_key = "123456789"

def load_users():
    with open("users.json", "r") as f:
        return json.load(f)["users"]

def verify_user(email, password):
    users = load_users()
    for user in users:
        if user["email"] == email:
            hashed = user["password"].encode()
            if bcrypt.checkpw(password.encode(), hashed):
                return True
    return False

@app.route("/", methods=["GET", "POST"])
def login():
    lang = request.args.get("lang", "en")  
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]
        if verify_user(email, password):
             return redirect("http://localhost:3000")
        else:
            flash("Invalid email or password" if lang=="en" else "البريد الإلكتروني أو كلمة المرور غير صحيحة")
            return redirect(url_for("login", lang=lang))
    return render_template("login.html", lang=lang)

if __name__ == "__main__":
   
    res = verify_user("donahmedbady@gmail.com", "Password123")
    print (res)
    app.run(port = 3002)
