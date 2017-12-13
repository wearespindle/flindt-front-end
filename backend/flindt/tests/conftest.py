import os
import django
from django.conf import settings

# Designate which settings to use in an environment variable.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'flindt.settings')


def pytest_configure():
    """
    If there are any specific settings for *all* tests,
    they can be set here.
    """
    settings.DEBUG = False
    django.setup()
