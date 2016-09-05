# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-09-07 12:28
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('feedback', '0007_auto_20160906_1134'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='remark',
            name='rating',
        ),
        migrations.AddField(
            model_name='remark',
            name='rating',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='rating', to='feedback.Rating'),
        ),
    ]
