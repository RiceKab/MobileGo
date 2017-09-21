Heroku's init has to be in the git root, so use this command to push the node
project properly instead of the whole git repo:

	git subtree push --prefix MobileGoNode heroku master
	
===
	
If this repo is freshly cloned you have to generate the heroku remotes:

	heroku git:remote -a mobilegohowest