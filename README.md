ai-estate-dubai/                  ← Root folder (GitHub repo)
├── frontend/                     ← Next.js app (landing + chatbot widget + agent dashboard)
│   ├── app/
│   │   ├── layout.js
│   │   ├── page.js             ← Landing page (aiestatedubai.com)
│   │   ├── dashboard/
│   │   └── api/
│   ├── components/
│   │   ├── ChatWidget.js
│   │   └── ChatBubble.js
│   ├── public/
│   ├── styles/
│   │   └── globals.css
│   ├── next.config.mjs
│   ├── tailwind.config.js
│   ├── postcss.config.mjs
│   └── package.json
│
├── backend/                      ← Express API server
│   ├── src/
│   │   ├── models/
│   │   │   ├── Agent.js
│   │   │   ├── Lead.js
│   │   │   └── Availability.js
│   │   ├── routes/
│   │   │   ├── agentRoutes.js
│   │   │   └── leadRoutes.js
│   │   ├── controllers/
│   │   ├── config/
│   │   │   └── db.js
│   │   └── index.js            ← Main server file
│   ├── .env
│   └── package.json
│
├── n8n-workflows/                ← We'll export/import JSON workflows later
│
├── docs/
│   └── schema.md
│
├── .gitignore
├── README.md
└── package.json                  ← Root (optional for monorepo tools)