# =================================================
# Codeary - "Code" - "ary"
# -------------------------------------------------
import os
import functools
import os.path
import re
import tornado.web 	# Tornado Stuff
import tornado.ioloop
import unicodedata	# 
import logging
from codeary.handlers import BaseHandler, TemplateRenderer, TestHandler, FallenBetweenTheCracksHandler
from project_root import app_root, app_views


app_settings = {
	'default':{
		'base_domain': 'codeary.local|codeary.heroku.com', 
		'templates': app_views,
		'xsrf_cookies': False,
		'page_title': u'The default page title.',
		#'static_pages': static_pages_settings,
		'static_path': os.path.join(app_root, 'codeary/static'), # for tornado static files use static_url(), this also helps with caching.
		'scripts_path': os.path.join(app_root, 'codeary/static/scripts'), # for tornado static files use static_url(), this also helps with caching.
		'images_path': os.path.join(app_root, 'codeary/static/images'), # for tornado static files use static_url(), this also helps with caching.
		'styles_path': os.path.join(app_root, 'codeary/static/styles'), # for tornado static files use static_url(), this also helps with caching.
		#'errors': error_page_settings,
		#'portfolio_api_url': 'http://webapp-prototypes.appspot.com/api/v1/ajax/view/projects/list/?f=json&c=5&p=1&callback=?',
	}
}

app_handlers = [
	#static handlers
	(r"(/static/scripts/(([^/.]+)(.js)))", tornado.web.StaticFileHandler, dict(path=app_settings['default']['scripts_path'])),
	(r"(/static/images/(([^/.]+)(.jpg|.jpeg|.gif|.png)))", tornado.web.StaticFileHandler, dict(path=app_settings['default']['images_path'])),
	(r"(/static/styles/(([^/.]+)(.css|.less)))", tornado.web.StaticFileHandler, dict(path=app_settings['default']['styles_path'])),

	# User Pages
	(r"(/user/(.*))", UserHandler),

	# Blog
	(r"(/blog/(.*))", BlogHandler),

	# Marketing Pages
	(r"(/(home|about))", MarketingHandler),

	# Test
	(r"/", TestHandler),

	# Last Resort
	(r"(/(.*))", FallenBetweenTheCracksHandler), #TODO: Change this lata.
]


#
# BaseHandler
#	TemplateHandler - 
#		
#		StaticHandler
#	APIHandler






# MAIN METHODS
# TODO: add profiling method

def main():
	real_main()
	# randomly profile

def real_main():
	application = tornado.web.Application(app_handlers, **app_settings['default'])
	
	logging.debug(app_root)

	application.listen(8080)
	tornado.ioloop.IOLoop.instance().start()

# The typical "main" code 
if __name__ == "__main__":
	main()


# +++++++++++++++++++++++++++++++++++++++++++++++++
# Handlers: 
# User Pages
# 	Profile: /user/nbannist/profile
# 	Others?: /user/nbannist/...
# 
# Search: 
# main search page
# 	/search 
# generic "search the whole site" search
#	/search?q=query
# search in only these areas ('a' variable)
#   /search?q=query&a=areas
# 
# Tags: 
# Shows all tags
# 	/tags
#  
# 
# 
# Documenation
#   /documentation/language/javascript
# 
# 
# 
# 
# 
# +++++++++++++++++++++++++++++++++++++++++++++++++

# =================================================
# Creating an app locally for Heroku

# mkdir <project folder> 				# create folder for project
# virtualenv venv --distribute 			# create virtual environment
# source venv/bin/activate 				# activate environment
# INSTALL THE dependencies
# pip install tornado 					
# pip install pygments					
# --pip install distutils--- 			# skip distutils 
# pip install markdown					
# pip install textile					
# pip install jinja2					

# CREATE app.py 						# create this file

# pip freeze > requirements.txt 		# Declare Dependencies with Pip : http://www.pip-installer.org/en/latest/requirements.html

# CREATE Procfile 
# Procfile > web: python app.py
 
# Create .gitignore file - exclude venv files
# venv
# *.pyc

# create git repo
# git init 								# init git repo
# git add . 							# add everything that's new or different
# git commit -m "message"				# commit changes with a message.

# foreman start 						# start the app




# Running an already created app

# cd Repositories/github.com/codeiary/
# source venv/bin/activate
# foreman start






