# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-04-11 13:08
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0010_rating_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='feedback',
            name='status',
            field=models.IntegerField(choices=[(0, 'Incomplete'), (1, 'Complete'), (2, 'Skipped')], default=0),
        ),
    ]