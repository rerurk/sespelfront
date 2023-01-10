  ECHO ON
  cd /d "%~dp0
  set deployPath=..\deploy
  echo %deployPath%
  set backPath=..\sespelback\cmd\
    echo %backPath%
  xcopy "./build" %deployPath%\public\ /s /e /h
  xcopy "./build" %backPath%\public\ /s /e /h
g