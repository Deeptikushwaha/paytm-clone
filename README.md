
# PayLite - A Digital Payment & Wallet System

PayLite is basically a payTM like application that let's users send money to each other given an initial dummy balance. It is a fully functional digital payment and wallet system built using React.js, Redux, Node.js, Express.js, JWT, Mongoose, and TailwindCSS. It replicates the core functionalities of modern digital wallets, enabling seamless transactions with a responsive and intuitive interface.

# 🚀 Features
- **JWT-based User Authentication** (Sign up & Sign in securely)
- **Input Validation using Zod** for ensuring data integrity
- **MongoDB Transactions** for safe and reliable money transfers
- **User Search Functionality** to find and interact with other users
- **Money Transfer Between Accounts** with instant updates
- **Secure API** with Express.js and JWT
- **Responsive UI** with TailwindCSS

# 🛠️ Tech Stack

- Client: ReactJS, Redux, TailwindCSS

- Server: NodeJS, ExpressJS

- Database: MongoDB with Mongoose

- Authentication: JSON Web Tokens (JWT)

- State Management: Redux

- Payment Integration: Razorpay API (optional for future integration)

- Hosting: Vercel (Frontend), Render/Heroku (Backend)
## 🔧 Installation & Setup

1. Clone the repository

```bash
git clone https://github.com/Deeptikushwaha/paylite.git
cd paylite
```
2. Install dependencies for frontend and backend

```bash
cd client  # Navigate to frontend
npm install
cd ../server  # Navigate to backend
npm install
```
3. Set up environment variables
- To run this you will need to add the given environment variables to a .env file.
- Create a .env file in the server directory and add the following
```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

4. Start the backend server
```bash
cd backend
npm start
```

5. Start the frontend development server
 ```bash
cd frontend
npm start
```
## API Reference (backend url - https://pay-lite.onrender.com)

**Signup - Create new user**

POST ```http
   /api/v1/user/signup ```

Body: 
```bash
{
    username: string (email),
    password: string,
    firstName: string,
    lastName: string
}
```
**Signin** 

POST ```http
   /api/v1/user/signin ```

Body: 
```bash
{
    username: string (email),
    password: string
}
```
**Update user info (requires auth)** 

PUT ```http /api/v1/user```

Body: 
```bash  
{
    password?: string,
    firstName?: string,
    lastName?: string
}
```

**Search users** 

GET ```http /api/v1/user/get ```
```bash  
Query params: filter (searches firstName and lastName)
```

**Check balance (requires auth)** 

GET ```http /api/v1/account/balance ```

Response:
```bash  
 {
    balance: number
}
```
**Transfer money (requires auth)** 

POST ```http
   /api/v1/account/transfer ```

Body: 
```bash
{
    to: userId,
    amount: number
}
```




## Authors

- [@Deeptikushwaha](https://www.github.com/Deeptikushwaha)


## Contributing

Contributions are always welcome!

- Fork the repository

- Create a new branch (feature-name)

- Commit your changes (git commit -m 'Add new feature')

- Push to your branch (git push origin feature-name)

- Open a Pull Request


