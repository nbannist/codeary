from BaseHandler import BaseHandler
from TemplateRenderer import TemplateRenderer

class TestHandler(BaseHandler, TemplateRenderer):
	"""
		TestHandler
	"""
	def get(self, *args):
		variables = {'title':'test.html'}
		self.write(self.render_template('test.html', variables))
