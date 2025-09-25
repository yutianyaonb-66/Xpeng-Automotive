
# Xpeng Clone Project

This is a practice project inspired by the official **Xpeng Automotive** website.  
It is built with **Next.js** and demonstrates modern frontend development, server-side rendering, and database integration using Prisma and MySQL.

---
![Alt text](public/images/webContent.png)

## Project Stack

- **Frontend:** Next.js (React framework)  
- **Backend / ORM:** Prisma  
- **Database:** MySQL  
- **Language:** TypeScript / JavaScript  
- **Node.js:** v20+ (recommended)  
- **npm:** v10+ (recommended)  

---

## Project Structure

```
.
├── prisma/               # Prisma schema and migrations
│   └── schema.prisma
├── src/                  # Next.js source code
│   ├── app/              # Pages and components
│   └── server/           # Server actions and Prisma queries
├── package.json
└── README.md
```

---

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/yutianyaonb-66/Xpeng-Automotive.git
cd Xpeng-Automotive
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure the environment
Create a `.env` file in the root directory:
```env
DATABASE_URL="mysql://root:123456@localhost:3306/testdb"
```
- Make sure you have a running MySQL server.
- Update the credentials if necessary.

### 4. Initialize the database
Use Prisma to create tables based on the schema:
```bash
npx prisma migrate dev --name init
# or, for a quick push without migrations
npx prisma db push
```

### 5. Run the development server
```bash
npm run dev
```
The project should now be accessible at: `http://localhost:3000`

---

## Notes

- This project is for learning and practice purposes only.  
- It simulates parts of the Xpeng car website interface.  
- All database tables (`users`, `nav_car_models`, `home_sliders`) are defined in `prisma/schema.prisma`.  

---

## Useful Commands

- Generate Prisma client:
```bash
npx prisma generate
```

- Check database connection:
```bash
npx prisma db pull
```

- Open Prisma Studio (GUI to view database):
```bash
npx prisma studio
```

---

## License

This project is for personal practice and does not have a specific license.
