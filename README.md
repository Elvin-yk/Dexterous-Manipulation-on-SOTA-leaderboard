# Dexterous Manipulation SOTA Leaderboard

A static Next.js site that mirrors the VLA SOTA leaderboard layout, powered by the Excel data in
`assets/raw/Dexterous Manipulation SOTA Leaderboard.xlsx`.

## Local development

```bash
npm install
npm run build:data
npm run dev
```

Open http://localhost:3000

## Build for GitHub Pages

Project repo base path:
```bash
export NEXT_PUBLIC_BASE_PATH=/Dexterous-Manipulation-on-SOTA-leaderboard
npm run build
```

For organization/user site (no basePath):
```bash
export NEXT_PUBLIC_BASE_PATH=
npm run build
```

The static output is written to `out/`.

## Update data

Edit the Excel file and re-run:
```bash
npm run build:data
```

## Contact placeholders

Replace the contact email and QR code in `components/ContactSection.tsx`.
