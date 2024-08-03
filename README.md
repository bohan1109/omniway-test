# omniway-test

## 環境配置

### 使用 `.env` 文件

請在項目根目錄下創建一個 `.env` 文件，並添加以下內容：

```plaintext
PORT=5000
JWT_SECRET=your_jwt_secret_key
MONGODB_URI=mongodb://mongo:27017/omniway-test
```

或者，也可以直接複製 .env.example 文件並重命名為 .env：
```sh
cp .env.example .env
```

## Docker 部署
建立並運行 Docker 容器：

```sh
docker-compose up --build
```
檢查應用程序日誌，確保應用已成功連接到 MongoDB 並在指定 port 運行。

## API 端點
1. 用戶註冊 - POST /register
2. 用戶登錄 - POST /login
3. 更改密碼 - POST /change-password
4. 驗證刷新令牌 - POST /validate-refresh-token
5. 獲取虛擬數據 - GET /dummy-data

## 本地開發
1. 安裝依賴：
```sh
npm install
```
2. 編譯 TypeScript 程式碼：
```sh
npm run build
```
3. 運行應用程式：
```sh
npm start
```
4. 使用 npm run dev 進行開發模式下的運行：
```sh
npm run dev
```

## Environment Setup
### Using the .env File
Create a .env file in the root directory of the project and add the following content:
```
PORT=5000
JWT_SECRET=your_jwt_secret_key
MONGODB_URI=mongodb://mongo:27017/omniway-test
```
Alternatively, you can copy the .env.example file and rename it to .env:
```sh
cp .env.example .env
```
## Docker Deployment
Build and run the Docker container:
```sh
docker-compose up --build
```
Check the application logs to ensure the application has successfully connected to MongoDB and is running on the specified port.

## API Endpoints
1. User Registration - POST /register
2. User Login - POST /login
3. Change Password - POST /change-password
4. Validate Refresh Token - POST /validate-refresh-token
5. Get Dummy Data - GET /dummy-data

## Local Development
1. Install dependencies:
```sh
npm install
```
2. Compile TypeScript code:
```sh
npm run build
```
3. Run the application:
```sh
npm start
```
4. For development mode, use:
```sh
npm run dev
```

## API Endpoints
### User Registration
- URL: /register
- Method: POST
- Description: Register a new user
- Request Parameters:
  - username: string
  - password: string

Request Example:
```json
{
    "username": "exampleuser",
    "password": "examplepassword"
}
```

### User Login
- URL: /login
- Method: POST
- Description: User login, returns JWT token and refresh token
- Request Parameters:
  - username: string
  - password: string
- Request Example:
```json
{
    "username": "exampleuser",
    "password": "examplepassword"
}
```

### Change Password
- URL: /change-password
- Method: POST
- Description: Change user password, requires JWT for authentication
- Request Header: Authorization: Bearer <token>
- Request Parameters:
  - newPassword: string
- Request Example:
```json
{
    "newPassword": "newexamplepassword"
}
```

### Validate Refresh Token
- URL: /validate-refresh-token
- Method: POST
- Description: Validate refresh token and issue a new JWT token
- Request Parameters:
  - refreshToken: string
- Request Example:
```json
{
    "refreshToken": "refresh_token"
}
```

### Get Dummy Data
- URL: /dummy-data
- Method: GET
- Description: Get dummy data, requires JWT for authentication
- Request Header: Authorization: Bearer <token>
