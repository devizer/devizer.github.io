@set FMT=yyyy-MM-dd HH-mm-ss&& for /f "delims=;" %%i in ('powershell -command "[System.DateTime]::Now.ToString($ENV:FMT)"') DO set datetime=%%i
echo export const BuildDate = "%datetime%" > src\BuildDate.js
@rd /q /s build 
call yarn build
if errorlevel 1 goto :error
rd /q /s ..\static
xcopy /s /e /y /q /r build ..
if errorlevel 1 goto :error
echo DONE! Both Build and XCOPY successfully completed.
goto :exit

:error
echo ABORT. BUILD or XCOPY Failed
exit 1

:exit

