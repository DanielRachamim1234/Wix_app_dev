# Wix Discount App

This app allows store owners to apply a percentage discount to the most expensive product in their Wix store that does not yet have a discount. Built with the Wix CLI and Wix SDK.

## Features

- ✅ Detects the most expensive non-discounted product  
- ✅ Lets users apply a custom percentage discount  
- ✅ Fully integrated with Wix Dashboard and Stores APIs  
- ✅ Clean interface accessible from a custom dashboard page  
- ✅ Built with React, TypeScript, and the Wix Design System

## Getting Started

1. **Clone this repository:**

      git clone https://github.com/DanielRachamim1234/wix_app_dev.git

      cd discount-app

3. **Install dependencies:**
  npm install

4. **Start the Wix development environment:**
   npm run dev

Then follow the terminal instructions to open your dashboard pages or plugin.


## Why `node_modules` is excluded

You’ll notice that the `node_modules/` directory is not included in this repository. That’s intentional:

- It contains hundreds of megabytes of auto-installed packages.
- All dependencies are already listed in `package.json` and `package-lock.json`.
- Anyone cloning the repository can run `npm install` to restore the necessary modules.

This follows standard practice and keeps the repository clean.

## License

This project is for educational purposes and is not licensed for production deployment.
