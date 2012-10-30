from BaseHandler import BaseHandler
from TemplateRenderer import TemplateRenderer

class BlogHandler(BaseHandler, TemplateRenderer):
	"""
		BlogHandler
	"""
	def get(self, *args):
		variables = {'title':'blog.html'}
		self.write(self.render_template('test.html', variables))
