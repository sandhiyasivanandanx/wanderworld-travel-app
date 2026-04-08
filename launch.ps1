# WanderWorld Launch Script (PowerShell)

Write-Host "🌍 Starting WanderWorld Setup..." -ForegroundColor Cyan

# 1. Backend Setup
Write-Host "`n📁 Setting up Backend..." -ForegroundColor Yellow
cd backend
if (!(Test-Path "venv")) {
    python -m venv venv
}
.\venv\Scripts\activate
pip install -r requirements.txt
Write-Host "✅ Backend dependencies installed." -ForegroundColor Green

# 2. Database Seeding
Write-Host "`n🌱 Seeding Database..." -ForegroundColor Yellow
python seed_data.py
Write-Host "✅ Database seeded with 10 countries and 100 places." -ForegroundColor Green

# 3. Start Servers
Write-Host "`n🚀 Launching Servers..." -ForegroundColor Cyan
Write-Host "Backend: http://localhost:8000"
Write-Host "Frontend: http://localhost:5173"

# Run Backend in background
Start-Process powershell -ArgumentList "-NoExit -Command `".\venv\Scripts\activate; uvicorn main:app --reload --port 8000`""

# Run Frontend
cd ../frontend
npm run dev
