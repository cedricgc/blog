# See link to make local webserver accesible in WSL2
# https://superuser.com/questions/1527835/windows-10-wsl-curl-cant-access-localhost-with-error-failed-to-connect-to-loca
dev:
	hugo serve --buildDrafts --bind 0.0.0.0 --port 1313 --watch
