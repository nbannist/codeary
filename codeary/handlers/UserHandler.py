from BaseHandler import BaseHandler
from TemplateRenderer import TemplateRenderer

class UserHandler(BaseHandler, TemplateRenderer):
	"""
		UserHandler
	"""
	def get(self, *args):
		variables = {'title':'test.html'}
		self.write(self.render_template('test.html', variables))
