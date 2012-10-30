import os
import tornado
from jinja2 import Environment, FileSystemLoader, TemplateNotFound # JINJA2

from project_root import app_root, app_views

from BaseHandler import BaseHandler

class TemplateRenderer:
	"""
		TemplateHandler class

	"""
	#TODO: variable to collect css includes.
	css_includes = () # list of css files

	def render_template(self, template_name, variables):
		template_dirs = []
		template_dirs.append(app_views) 

		env = Environment(loader = FileSystemLoader(template_dirs))

		try:
			template = env.get_template(template_name)
		except TemplateNotFound:
			raise TemplateNotFound(template_name)
		content = template.render(variables)
		return content 




