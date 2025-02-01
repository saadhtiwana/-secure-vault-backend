


# Secure Vault Backend

Welcome to the **Secure Vault Backend**! This project demonstrates a secure web application that utilizes a password-based authentication system to control access to a "secret vault" of sensitive information. The backend is built with **Node.js** and **Express**, while the frontend is simple and minimal, relying on static HTML and CSS.

## Features:
- **Password Authentication**: The backend validates user input and grants access to the vault based on the correct password.
- **Simple Express Server**: The app is powered by Node.js and Express, handling HTTP requests for both public and private routes.
- **Basic Security System**: The application is a demonstration of how to implement authentication and authorization in web apps.

## Technologies Used:
- **Backend**: Node.js, Express
- **Authentication**: Password-based authentication (for demonstration purposes)
- **Frontend**: Static HTML and CSS (embedded directly in the HTML files)

## How It Works:
1. **Homepage (`index.html`)**: Users are prompted to enter a password.
2. **Authentication**: When the user submits the form with the password, the backend checks if it matches the predefined password. If correct, the user is granted access to the secret vault.
3. **Vault Access (`secret.html`)**: Once authenticated, users can view the secret content on the vault page.
4. **Error Handling**: If the password is incorrect, users are shown an error message and remain on the homepage.

## Setup Instructions:

### Step 1: Clone the repository
Clone the repository to your local machine:

```bash
git clone https://github.com/saadhtiwana/secure-vault-backend.git
```

### Step 2: Install Dependencies
Navigate to the project directory and install the required dependencies using npm:

```bash
cd secure-vault-backend
npm install
```

### Step 3: Run the Server
Start the Express server by running the following command:

```bash
npm start
```

The server will run locally on port `3000`. Open your browser and go to `http://localhost:3000` to use the application.

### Step 4: Access the Vault
- On the homepage, enter the password **`SaadisTopG;`** to gain access to the secret vault page.
- If the password is incorrect, you will stay on the homepage and can try again.

## Example Requests:
- **GET `/`** - Displays the homepage where the user can enter the password.
- **POST `/check`** - Handles the password authentication. If correct, redirects the user to `/secret.html`.

## Contributing:
Contributions are welcome! If you'd like to improve this project, feel free to fork it and submit a pull request.

### Steps to Contribute:
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push your branch to your fork (`git push origin feature/your-feature`).
5. Submit a pull request.

## License:
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Created with ❤️ by Saad Tiwana  
Email: [saadhayat799@gmail.com](mailto:saadhayat799@gmail.com)  
GitHub: [@saadhtiwana](https://github.com/saadhtiwana)

