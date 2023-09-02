sup: 
	live-server public -q &
	sass --watch -q scss/source.scss:public/styles/css/main.css &

