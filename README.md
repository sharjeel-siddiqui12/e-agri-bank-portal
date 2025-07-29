yarn dev

# E-Agri Bank Portal

>A modern, responsive banking portal for agricultural loan management, built with Next.js, React, and Tailwind CSS.


## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Development](#setup--development)
- [UI Components](#ui-components)
- [Demo Data](#demo-data)
- [Custom Styling](#custom-styling)
- [How to Use](#how-to-use)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

The E-Agri Bank Portal is a full-featured web application designed to streamline the management of agricultural loan applications and approvals. It provides a clean, modern UI for both applicants and bank staff, with demo data and reusable components for rapid prototyping and extension.

---

## Features
- Responsive, mobile-first design
- Loan Applications and Loan Approvals dashboards
- Search, filter, sort, and paginate applicant data
- Status indicators and colored pills for loan and KYC status
- Custom dropdowns, tables, and buttons
- Lucide icons for consistent, scalable iconography
- Demo data generation for development/testing
- Modular, reusable React components

---

## Tech Stack
- [Next.js](https://nextjs.org/) (App Router, SSR, API routes)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/) (utility-first styling)
- [Lucide Icons](https://lucide.dev/) (icon library)
- [Geist Font](https://vercel.com/font)
- [clsx](https://github.com/lukeed/clsx) and [tailwind-merge](https://github.com/dcastil/tailwind-merge) (utility class merging)

---

## Project Structure

```
e-agri-bank-portal/
├── public/
│   ├── logo.svg
│   └── avatars/
├── src/
│   ├── app/
│   │   ├── globals.css         # Global styles (Tailwind, custom theme)
│   │   ├── layout.js           # Root layout, font setup
│   │   ├── page.jsx            # Home page
│   │   ├── login/
│   │   │   ├── page.jsx        # Login form
│   │   │   └── page.module.css # Login styles
│   │   ├── loan-applications/
│   │   │   ├── page.jsx        # Loan Applications dashboard
│   │   │   └── page.module.css # Styles for applications
│   │   ├── loan-approvals/
│   │   │   ├── page.jsx        # Loan Approvals dashboard
│   │   │   └── page.module.css # Styles for approvals
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button-loan.jsx # Custom button component
│   │   │   ├── button-submit.jsx # Submit button
│   │   │   ├── dropdown-menu.jsx # Custom dropdown
│   │   │   ├── input.jsx        # Input field
│   │   │   ├── sort-arrows.jsx  # Sort arrow SVG
│   │   │   └── table.jsx        # Table components
│   ├── lib/
│   │   ├── demoData.js         # Demo data generators & status list
│   │   └── utils.js            # Utility functions (class merging)
│   └── ...
├── package.json
├── README.md
└── ...
```

---

## Setup & Development

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Open the app:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## UI Components

- **Button**: `/src/components/ui/button-loan.jsx` and `/src/components/ui/button-submit.jsx`
- **Dropdown**: `/src/components/ui/dropdown-menu.jsx` (custom, accessible)
- **Input**: `/src/components/ui/input.jsx`
- **Table**: `/src/components/ui/table.jsx` (modular table, header, row, cell)
- **Sort Arrows**: `/src/components/ui/sort-arrows.jsx` (SVG sort indicators)
- **Lucide Icons**: Used throughout for avatars, actions, and status

---

## Demo Data

Demo data is generated in `/src/lib/demoData.js`:
- `createLoanApplicationsDemoData()` – 120 rows, 10 names, for loan applications
- `createLoanApprovalsDemoData()` – 12 rows, 3 names, for loan approvals
- `loanStatusList` – shared status list for dropdowns, pills, etc.

All demo data uses Lucide's `<User />` icon for avatars.

---

## Custom Styling

- **Tailwind CSS**: Utility classes for layout, spacing, color, and responsiveness
- **CSS Modules**: Scoped styles for each page/component (e.g. `page.module.css`)
- **Theme Variables**: Custom properties in `globals.css` for easy theming
- **Responsive Design**: Mobile-first, with breakpoints for all devices

---

## How to Use

### Navigation
- **Home**: `/` – Welcome page with navigation links
- **Login**: `/login` – Login form
- **Loan Applications**: `/loan-applications` – View, search, filter, and sort applications
- **Loan Approvals**: `/loan-approvals` – View and manage approvals

### Customization
- Update demo data in `/src/lib/demoData.js`
- Add new UI components in `/src/components/ui/`
- Adjust styles in the relevant `page.module.css` files

---

## Contributing

Pull requests and issues are welcome! Please open an issue for bugs or feature requests, and submit PRs for improvements.

---

## License

This project is licensed under the MIT License.
