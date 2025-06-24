# SpendTrack

**SpendTrack** is a modern, responsive personal finance management web app built with **Next.js**. It allows users to create budgets, track monthly expenses, visualize spending habits with charts, and manage finances easily — all within the browser using localStorage (no backend required).

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [Known Issues](#known-issues)
- [License](#license)
- [Contact](#contact)

---

## Installation

1. **Clone the repository**
git clone https://github.com/Rajat22UEE/spendtrack.git
cd spendtrack

text

2. **Install dependencies**
npm install

text

3. **Run the development server**
npm run dev

text

4. **Open your browser and go to** [http://localhost:3000](http://localhost:3000)

---

## Usage

- Click **"Get Started"** on the homepage to navigate to the dashboard.
- From the dashboard, you can:
- View total budget and expense summary.
- Navigate to the **Budgets** page to create and manage budgets.
- Add expenses under each budget.
- Use the chart to visualize your spending.
- Switch months to view past or future planning.
- All data is stored in localStorage, so no login or backend is needed.

---

## Project Structure

app/
├── layout.jsx # App-wide layout
├── page.jsx # Home page
├── dashboard/ # Dashboard page
├── budgets/ # Budget listing and management
├── budget/[id]/ # Detailed budget + expenses
components/
├── Navbar.jsx
├── Sidebar.jsx
├── BudgetCard.jsx
├── ExpenseCard.jsx
├── ExpenseTable.jsx
├── Chart.jsx
├── Modals/ # Reusable popup modals
public/
├── dashboard.png
├── budget.png
├── expense.png
├── expense-tracker.png
styles/
├── globals.css

text

---

## Configuration

- Customize theme colors in `globals.css` or component Tailwind classes.
- Budget and expense logic is all client-side — stored in `localStorage`.
- **To reset data:** open dev tools → Application tab → Clear localStorage.

---

## Technologies Used

- [Next.js 14 (App Router)](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [AOS (Animate on Scroll)](https://michalsnik.github.io/aos/)
- Browser **localStorage** (for state persistence)

---

## Contributing

Contributions are welcome! To contribute:

1. **Fork** this repo
2. **Create a new branch:**
git checkout -b feature/your-feature-name

text
3. **Commit changes:**
git commit -m "Add some feature"

text
4. **Push your branch:**
git push origin feature/your-feature-name

text
5. **Submit a Pull Request**

---

## Known Issues

- All data is stored client-side using localStorage. This limits use across devices.
- No user authentication (planned for future).
- No dark mode toggle (though design is dark-themed by default).

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

👤 **Rajat Debnath**  
📧 [rajatnath6909@gmail.com](mailto:rajatnath6909@gmail.com)  
[🔗 LinkedIn](https://www.linkedin.com/in/rajat-debnath/)  
[💻 GitHub](https://github.com/Rajat22UEE)

---