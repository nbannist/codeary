# =================================================
# Codeiary - "Code" - "ee" - "airy"
# -------------------------------------------------
# A place where programmers can exchange knowledge about:
# Programming languages (Javascript, Python, etc.),
# Programming concepts (closures),
# APIs (Google Maps),
# Algorithms (bubble sort w/Big O Notation),
# Design patterns (Factory Pattern)
# Frameworks (Flask)
# Dialects (Stackless Python)
# Libraries (jQuery)
# -------------------------------------------------
# Should make it easy to compare different versions of an algorithm (bubble-sort)
# Should make it easy to navigate documentation of a language, framework, library, or API
# Should make it easy to find sorting algorithms
# Should make it easy to a definitive (or close) answer to how to implement a closure in Javascript, 
# or the Factory Pattern in Java
# -------------------------------------------------
# How is it different from Stack Overflow?
# ----------------------------------------
# Stack Overflow is for people who don't know what 
# they are looking for and need to ask a question.
# 
# Codeiary is for people who know what they are 
# looking for but need more information on the 
# topic or just need clarification
# > "How can the Bubble Sort algorithm be implemented in Javascript"
# Algorithms > Tags > Javascript + Bubble Sort 
# Search > "Bubble Sort Algorithm Javascript"
# 
# > "Do I need String.substr() or String.substring() method?"
# Documentation > Javascript > String > Methods > substring()
# Documentation > Javascript > String > Methods > substr()
# 
# 
# 
# 
# 
# =================================================

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
# Creating and running an app locally for Heroku

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











