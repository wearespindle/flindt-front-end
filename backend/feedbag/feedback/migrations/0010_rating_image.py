# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-09 08:01
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0009_auto_20160914_1047'),
    ]

    operations = [
        migrations.AddField(
            model_name='rating',
            name='image',
            field=models.ImageField(blank=True, upload_to=b'ratings', verbose_name='image'),
        ),
    ]