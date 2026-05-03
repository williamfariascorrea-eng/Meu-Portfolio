@echo off
cd /d "%~dp0"

echo ============================================
echo   Configurando Git e subindo para GitHub
echo ============================================

echo.
echo [1/6] Verificando Git...
git --version >nul 2>&1
if errorlevel 1 (
    echo ERRO: Git nao encontrado. Instale o Git em: https://git-scm.com
    pause
    exit /b 1
)

echo [2/6] Inicializando repositorio...
git init

echo [3/6] Configurando usuario...
git config user.name "William Correa"
git config user.email "williamfariascorrea@gmail.com"

echo [4/6] Adicionando arquivos...
git add .

echo [5/6] Criando commit...
git commit -m "Portfólio premium completo"

echo [6/6] Verificando remoto...
git remote -v | findstr origin >nul
if errorlevel 1 (
    echo Adicionando remote...
    git remote add origin https://github.com/williamfariascorrea-eng/Meu-Portfolio.git
)

echo.
echo ============================================
echo   Enviando para o GitHub...
echo ============================================
git push -u origin main

echo.
echo Feito! Verifique seu repositorio no GitHub.
pause