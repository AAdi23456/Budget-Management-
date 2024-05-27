```markdown
# Budget Management API

This project provides an API for managing budgets, transactions, and currency conversions.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/AAdi23456/Budget-Management-
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file based on the `.env.example` template.
   - Update the values in the `.env` file as needed.

## Usage

### Start the Server

Run the following command to start the server:
```
npm start
```

The server will start listening on port 3000 by default.

### API Endpoints

#### Authentication


- **POST https://budget-management-n4bf.onrender.com/auth/register**: Register a new user with name, email, and password.
  - Request Body:
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "password": "password"
    }
    ```
  - Response:
    ```json
    {
      "id": 2,
      "email": "user@example.com",
      "name": "aadi",
      "password": "$2a$10$yv/16gxPCpR.Q5D8jDZd6OYI/fIm07ZNsXbiF4aJ7w.VOnhm0EAVa"
    }
    ```


- **POST https://budget-management-n4bf.onrender.com/auth/login**: Log in with email and password to receive a JWT token.
  - Request Body:
    ```json
    {
      "email": "john.doe@example.com",
      "password": "password"
    }
    ```
  - Response:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNjcyMzIyOSwiZXhwIjoxNzE2NzI2ODI5fQ.0vwuj6lpfdPWH0mCv8BjeY-vr0hzri0yNNcJAz8dTyE"
    }
    ```



#### Budget Management

- **GET https://budget-management-n4bf.onrender.com/budgets**: Get all budgets for the authenticated user.
  - Response:
    ```json
   [
  {
    "id": 3,
    "amount": 500,
    "categoryId": 3,
    "userId": 2,
    "startDate": "2024-05-01T00:00:00.000Z",
    "endDate": "2024-05-31T00:00:00.000Z"
  },
  {
    "id": 4,
    "amount": 900,
    "categoryId": 3,
    "userId": 2,
    "startDate": "2024-05-01T00:00:00.000Z",
    "endDate": "2024-05-31T00:00:00.000Z"
  }
]
    ```

- **POST https://budget-management-n4bf.onrender.com/budgets**: Add a new budget for the authenticated user.
  - Request Body:
    ```json
    {
      "amount": 500,
      "startDate": "2024-05-01",
      "endDate": "2024-05-31",
      "categoryId": 3
    
    }

    ```
  - Response:
    ```json
    {
       "id": 3,
       "amount": 500,
       "categoryId": 3,
       "userId": 2,
       "startDate": "2024-05-01T00:00:00.000Z",
       "endDate": "2024-05-31T00:00:00.000Z"
}
    ```

- **PUT https://budget-management-n4bf.onrender.com/budgets/2**: Update an existing budget.
  - Request Body:
    ```json
   {
    "amount": 10000,
    "categoryId": 3,
    "userId": 2,
    "startDate": "2024-05-01T00:00:00.000Z",
    "endDate": "2024-05-31T00:00:00.000Z"
  }
    ```
  - Response:
    ```json
   {
  "id": 4,
  "amount": 10000,
  "categoryId": 3,
  "userId": 2,
  "startDate": "2024-05-01T00:00:00.000Z",
  "endDate": "2024-05-31T00:00:00.000Z"
}
    ```

- **DELETE  https://budget-management-n4bf.onrender.com/budgets/2**: Delete a budget.

#### Transaction Management

- **GET /transactions**: Get all transactions for the authenticated user.
  - Response:
    ```json
   [
  {
    "id": 9,
    "amount": 1000,
    "date": "2024-05-01T00:00:00.000Z",
    "type": "Income",
    "categoryId": 1,
    "userId": 2
  },
  {
    "id": 10,
    "amount": 9000,
    "date": "2024-05-01T00:00:00.000Z",
    "type": "Expense",
    "categoryId": 1,
    "userId": 2
  }
]
    ```

- **POST https://budget-management-n4bf.onrender.com/transactions**: Add a new transaction for the authenticated user.
  - Request Body:
    ```json
  {
      "amount": 9000,
      "date": "2024-05-01",
      "type": "Expense",
      "categoryId": 1
    }
    ```
  - Response:
    ```json
   {
  "id": 10,
    "amount": 9000,
    "date": "2024-05-01T00:00:00.000Z",
    "type": "Expense",
    "categoryId": 1,
    "userId": 2
}
    ```

- **PUT https://budget-management-n4bf.onrender.com/transactions/:id**: Update an existing transaction.
  - Request Body:
    ```json
   {
      "amount": 9000,
      "date": "2024-05-01",
      "type": "Income",
      "categoryId": 1
      
    }
    ```
  - Response:
    ```json
  {
  "id": 10,
  "amount": 9000,
  "date": "2024-05-01T00:00:00.000Z",
  "type": "Income",
  "categoryId": 1,
  "userId": 2
}
    ```

- **DELETE https://budget-management-n4bf.onrender.com/transactions/:id**: Delete a transaction.


#### Monthly Report

- **GET https://budget-management-n4bf.onrender.com/reports/monthly?month=6&year=2024**: Get the monthly financial report for the authenticated user.

 Request url-  https://budget-management-n4bf.onrender.com/reports/monthly?month=6&year=2024

  - Query Parameters:
    - `month`: The month for the report (1-12).
    - `year`: The year for the report (e.g., 2023).
  - Example Request:
    ```
    GET https://budget-management-n4bf.onrender.com/reports/monthly?month=5&year=2023
    ```
  - Response:
    ```json
    {
      "income": 5000,
      "expenses": 3000,
      "balance": 2000
    }
    ```


#### Currency Conversion

- **GET /currency-conversion**: Convert an amount from one currency to another.
Request Query = https://budget-management-n4bf.onrender.com/currency/convert?amount=500&fromCurrency=INR&toCurrency=USD
  - Query Parameters:
    - amount: Amount to convert
    - fromCurrency: Currency to convert from
    - toCurrency: Currency to convert to
  - Response:
    ```json
    {
  "convertedAmount": 6
}
    ```

## Logging

The application uses Winston for logging. Logs are written to the console and files (`error.log` and `combined.log`).

## Error Handling

Errors are handled gracefully with appropriate status codes and error messages.

## Dependencies

- Node.js
- Express
- Prisma
- bcryptjs
- jsonwebtoken
- axios
- Winston

## Contributing

Contributions are welcome! Please follow the [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

