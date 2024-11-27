# Photography Website Project Plan

This document outlines the project plan for developing a **Photography Website** using the following tech stack:  
**Next.js 15, Auth.js v5, Hono.js, React Query, Tailwind CSS, and ShadCN UI**.

---

## Project Objectives

1. Build a responsive and modern photography website.
2. Implement user authentication with credentials.
3. Integrate features like photo management and photo exif data.
4. Deploy the project for public access.

---

## Milestones and Tasks

### **1. Project Setup**
- [x] Create the project repository.
- [x] Set up Next.js 15 environment.
- [x] Install necessary dependencies (Auth.js, React Query, Hono.js, etc.).

### **2. Initialize ShadCN and Tailwind CSS**
- [x] Install and configure Tailwind CSS.
- [x] Initialize ShadCN components.

### **3. Set up Hono API**
- [x] Initialize Hono API.

### **4. User Authentication**
- [x] Integrate Auth.js for user authentication.
- [x] Initialize Auth.js with Hono API.
- [x] Set up Hono.js server for API routes.
- [x] Create endpoints for user authentication (login).

### **5. Create user screens**
- [x] Login page.

### **5. Photo Management System**
- [ ] Build a photo upload feature with preview.
- [ ] Add photo metadata handling (e.g., EXIF data).
- [ ] Implement filters and sorting options for photo galleries.

### **6. Frontend Development**
- [ ] Create responsive layouts with ShadCN components.
- [ ] Design a stunning photo gallery page.
- [ ] Implement user profile and settings pages.
- [ ] Add "favorite photos" functionality.

### **7. State Management**
- [ ] Integrate React Query for data fetching and caching.
- [ ] Optimize state management for seamless user interactions.

### **8. Performance Optimization**
- [ ] Optimize images with Next.js `next/image`.
- [ ] Add lazy loading for images and components.
- [ ] Implement SEO best practices and accessibility improvements.

### **9. Testing**
- [ ] Write unit tests for key components.
- [ ] Test API endpoints using automated testing tools.
- [ ] Perform usability and cross-browser testing.

### **10. Deployment**
- [ ] Set up a production environment (e.g., Vercel).
- [ ] Deploy the application.
- [ ] Configure CI/CD for automatic deployments.

---

## Deliverables

1. A fully functional photography website with authentication.
2. A user-friendly photo management system.
3. A visually appealing and accessible UI.
4. Comprehensive documentation for developers and users.

---

## Timeline

| Milestone                  | Estimated Completion |
|----------------------------|----------------------|
| Project Setup              | Week 1              |
| ShadCN & Tailwind Setup    | Week 2              |
| Backend Integration        | Week 3              |
| User Authentication        | Week 4              |
| Photo Management System    | Week 5              |
| Frontend Development       | Week 6              |
| State Management & Testing | Week 7              |
| Deployment                 | Week 8              |

---

## Tech Stack

- **Framework:** Next.js 15  
- **Authentication:** Auth.js v5  
- **Backend:** Hono.js  
- **State Management:** React Query  
- **Styling:** Tailwind CSS, ShadCN  
- **Deployment:** Vercel  

---

## Init user

确保你的 .env 文件中包含以下内容:

```.env
USERNAME=YourUserName
USER_EMAIL=YourEmail@example.com
USER_PASSWORD=YourSecurePassword
```

然后,运行 `bun run db:seed` 命令来初始化用户数据。
