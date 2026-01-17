# Timer

A web-based timer application built with React and Vite. This timer counts UP and is designed for community boards, toastmaster speeches, and other timing needs.

## Features

- Simple countdown/count-up timer
- Clean, modern interface using Bootstrap
- DSEG digital font for authentic timer display
- Responsive design

## For Developers

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn package manager

### Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/mimiflynn/timer.git
   cd timer
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   npm start
   ```

   The app will be available at `http://localhost:5173`

4. **Build for production**

   ```bash
   npm run build
   ```

   The production-ready files will be in the `dist` directory.

5. **Preview the production build**

   ```bash
   npm run preview
   ```

6. **Run tests**

   ```bash
   npm test
   ```

7. **Lint the code**
   ```bash
   npm run lint
   ```

### Project Structure

```
timer/
├── public/          # Static assets
├── src/
│   ├── components/  # React components
│   ├── lib/         # Utility functions
│   ├── styles/      # CSS files
│   ├── App.jsx      # Main app component
│   └── main.jsx     # Entry point
├── vite.config.js   # Vite configuration
└── package.json     # Project dependencies
```

### Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Bootstrap 5** - CSS framework
- **Jest** - Testing framework
- **DSEG Font** - Digital display font

### Contributing

Feel free to fork this project and make pull requests. Contributions are welcome!

## Credits

Font: [DSEG](https://github.com/keshikan/DSEG)

Original project: [Toastmaster Timer](https://github.com/guyellis/toastmaster-timer) by Guy Ellis

## License

See [LICENSE](LICENSE) file for details.
