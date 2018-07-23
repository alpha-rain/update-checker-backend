call tsc
REM for /R .\src %%f in (*.json) do copy %%f .\dist
call xcopy .\src\*.json .\dist /sy