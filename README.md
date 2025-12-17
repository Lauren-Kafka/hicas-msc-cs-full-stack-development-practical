# HICAS MSc CS FSD - Practical Programs CLI

A single CLI tool to easily download and run practical programs for the Full Stack Development course.

## 📦 Installation

You don't need to install it! Just use `npx`.

## 🚀 Usage

### 1. List Available Programs

See all available programs (currently only `program1`):

```bash
npx hicas-msc-cs-fsd list
```

### 2. Download a Program

To download a specific program (e.g., `program1`):

```bash
npx hicas-msc-cs-fsd program1
```

This will:
- Clone **only** the `program1` branch.
- Create a folder named `program1` in your current directory.

### 3. Run a Program

To start a downloaded program:

```bash
npx hicas-msc-cs-fsd run program1
```

This will:
- Automatically install dependencies (`npm install`) for both Client and Server.
- Start both the Frontend and Backend servers simultaneously.

## 🛠️ Features

- **Single Branch Cloning**: Saves space by downloading only the specific program you need.
- **Auto-Setup**: Handles `npm install` for you.
- **One-Command Run**: No need for multiple terminals.
- **Cross-Platform**: Works on Windows, macOS, and Linux.

## 📝 License

ISC
