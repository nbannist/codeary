from BaseHandler import BaseHandler
from TemplateRenderer import TemplateRenderer

class FallenBetweenTheCracksHandler(BaseHandler, TemplateRenderer):
	"""
		Last resort URL handler.
	"""
	def get(self, full_url, part):
		self.write("You have fallen between the cracks.")