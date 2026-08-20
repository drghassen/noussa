@echo off
setlocal

cd /d "%~dp0"

echo Cleaning LaTeX generated files...
del /q main.aux main.toc main.lof main.lot main.out main.log main.fls main.fdb_latexmk main.maf main.mtc main.mtc0 main.mtc1 main.mtc2 main.mtc3 main.mtc4 main.mtc5 main.mtc6 main.synctex.gz 2>nul
del /q main_build.aux main_build.toc main_build.lof main_build.lot main_build.out main_build.log main_build.fls main_build.fdb_latexmk main_build.maf main_build.mtc main_build.mtc0 main_build.mtc1 main_build.mtc2 main_build.mtc3 main_build.mtc4 main_build.mtc5 main_build.mtc6 main_build.synctex.gz 2>nul

if exist main.pdf (
    del /q main.pdf 2>nul
)

if exist main.pdf (
    echo.
    echo WARNING: main.pdf is still open or locked.
    echo The script will compile to main_build.pdf and open a new preview copy instead.
    echo.
)

echo.
echo First pdflatex pass...
pdflatex -interaction=nonstopmode -file-line-error -jobname=main_build main.tex
if errorlevel 1 (
    echo.
    echo ERROR: first pdflatex pass failed.
    pause
    exit /b 1
)

echo.
echo Second pdflatex pass...
pdflatex -interaction=nonstopmode -file-line-error -jobname=main_build main.tex
if errorlevel 1 (
    echo.
    echo ERROR: second pdflatex pass failed.
    pause
    exit /b 1
)

echo.
echo Third pdflatex pass...
pdflatex -interaction=nonstopmode -file-line-error -jobname=main_build main.tex
if errorlevel 1 (
    echo.
    echo ERROR: third pdflatex pass failed.
    pause
    exit /b 1
)

if not exist preview mkdir preview
for /f %%I in ('powershell -NoProfile -Command "Get-Date -Format yyyyMMdd_HHmmss"') do set "STAMP=%%I"
set "PREVIEW_PDF=%CD%\preview\main_%STAMP%.pdf"

copy /y main_build.pdf "%PREVIEW_PDF%" >nul

if not exist main.pdf (
    copy /y main_build.pdf main.pdf >nul 2>nul
) else (
    copy /y main_build.pdf main.pdf >nul 2>nul
)

echo.
echo Opening %PREVIEW_PDF%...
start "" "%PREVIEW_PDF%"

endlocal
