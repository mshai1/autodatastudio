### 🚗 AutoData Studio

A modern vehicle data explorer that allows users to search official vehicle models by make and year, preview results, and export data in JSON or CSV format.

Built with Next.js and designed with a clean SaaS-style interface.

🔗 **Live Demo:** https://autodatastudio.vercel.app
💻 Tech Stack: Next.js · TypeScript · Node API Routes · Tailwind CSS

---

### ✨ Features

-🔎 Search vehicle models by Make & Year
-📄 Preview data in:
  - JSON view
  - Table (CSV-style) view
- ⬇️ Download results as:
   - JSON
   - CSV
- 🔐 Server-side API proxy (endpoint hidden from client)
- ⚡ Debounced searchable dropdown
- 📱 Fully responsive (desktop + mobile)
- 🧠 Clean component-based architecture

---

### 🏗️ Architecture Overview

This project intentionally focuses on backend concepts while maintaining a clean UI.

### 1️⃣ API Proxy Layer

Instead of calling the external vehicle API directly from the browser, requests are routed through:
  - /api/makes
  - /api/vehicles

This allows:
- Hiding the third-party endpoint
- Controlling traffic
- Adding rate limiting (future-ready)
- Logging and monitoring capability
- Preventing direct client-side API exposure

---

### 2️⃣ Data Flow
```
Client UI
   ↓
Next.js API Route (Server)
   ↓
External Vehicle API
   ↓
Server transforms data
   ↓
Client preview (JSON / Table)
```
---

### 3️⃣ CSV Transformation

Data returned in JSON is converted to CSV on the client side for Excel compatibility.

```ts
function jsonToCSV(data: any[]) {
  const headers = Object.keys(data[0]);
  const rows = data.map(row =>
    headers.map(h => `"${row[h] ?? ""}"`).join(",")
  );
  return [headers.join(","), ...rows].join("\n");
}
```

---

### 📁 Project Structure
```
app/
  ├── components/
  │     ├── MakeDropdown.tsx
  │     ├── YearDropdown.tsx
  │     ├── ToggleView.tsx
  │     ├── JSONViewer.tsx
  │     ├── DataTable.tsx
  │     ├── DownloadButtons.tsx
  │     ├── Navbar.tsx
  │     └── Footer.tsx
  │
  ├── api/
  │     ├── makes/route.ts
  │     └── vehicles/route.ts
  │
  ├── layout.tsx
  └── page.tsx
```
The main page is structured using reusable components for scalability and maintainability.

---

### 🎯 Why This Project?

This project demonstrates:
- Backend API proxying
- Controlled request handling
- Data transformation
- Component-based frontend architecture
- Responsive UI design
- Production deployment (Vercel)
- Git workflow management

---

### 🚀 Deployment
This project is deployed using Vercel.

To run locally:
```
npm install
npm run dev
```
To build:
```
npm run build
```
---

### 🛣️ Roadmap

- VIN Decoder
- Advanced filtering
- Bulk export support
- Rate limiting middleware
- Basic request logging

---

### 🧠 Lessons Learned
- Proper API proxying prevents exposing third-party endpoints
- Separating UI components improves scalability
- Real-device mobile testing is essential (Safari differs from Chrome)
- Structuring backend logic early improves maintainability

---

### 👨‍💻 Author
Mohammad Shaikh
