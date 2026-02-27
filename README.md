# 🛒 Online Shop

A full-stack e-commerce platform built with modern web technologies.

## ✨ Features

- User authentication & authorization (User / Admin roles)
- Product catalog with categories, search, filtering & infinite scroll
- Shopping cart & favorites/wishlist
- Order management & checkout
- Product reviews, ratings & comments
- Image uploads stored on AWS S3
- Notifications system
- Rich product descriptions (CKEditor)
- Responsive design with Angular Material + Bootstrap
- Data visualization (charts)

## 🛠 Tech Stack

### Frontend (Main)
- Angular 17
- Angular Material, Bootstrap 5
- RxJS, ngx-infinite-scroll, ngx-toastr
- CKEditor 5, ng2-charts
- Redux / Redux-Thunk (state management)

### Backend
- Node.js + Express
- MySQL (with mysql / mongoose)
- AWS SDK (@aws-sdk/client-s3, presigner)
- Authentication: JWT + bcrypt
- File uploads: multer / express-fileupload
- Logging, rate limiting, cron jobs, Redis cache

### Database
- MySQL – full schema in storeDB.sql

## 📁 Project Structure

```bash
shop/
├── angular-client/          # Main Angular frontend (recommended)
├── API/                     # Node.js + Express backend
├── Client/                  # Alternative client implementation
├── Client-Product/client/   # Product-focused client
├── Comments/                # Review & comment module
├── storeDB.sql              # Database schema + initial data
├── package.json
├── package-lock.json
└── test.js
🚀 Quick Start
1. Clone & Navigate
Bashgit clone https://github.com/sasha-k1234/online-shop.git
cd online-shop/shop
2. Database Setup
Bash# Create database
mysql -u your_username -p -e "CREATE DATABASE store;"

# Import schema
mysql -u your_username -p store < storeDB.sql
3. Backend (API)
Bashcd API
npm install

# Create .env file in API/ folder with:
# DB_HOST=localhost
# DB_USER=...
# DB_PASSWORD=...
# DB_NAME=store
# AWS_ACCESS_KEY_ID=...
# AWS_SECRET_ACCESS_KEY=...
# AWS_BUCKET_NAME=...
# PORT=5000

npm run devStart   # uses nodemon DataApi.js
4. Frontend (Angular)
Bashcd ../angular-client
npm install
ng serve
Open http://localhost:4200 in your browser.
🔧 Environment Variables (Backend)
Create .env inside the API folder with your credentials (see example above).
📌 Notes

The project is in active development (early stage).
Use the angular-client as the primary frontend.
AWS S3 is required for product photos.
Default roles (user, admin) are seeded in storeDB.sql.

🤝 Contributing

Fork the project
Create your feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request

📄 License
This project is open-source and available under the MIT License.
