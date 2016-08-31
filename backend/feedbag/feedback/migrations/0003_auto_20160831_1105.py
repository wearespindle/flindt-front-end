# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-08-31 09:05
from __future__ import unicode_literals

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('feedback', '0002_remark'),
    ]

    operations = [
        migrations.CreateModel(
            name='FeedbackBase',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField()),
                ('status', models.IntegerField(choices=[(0, 'Incomplete'), (1, 'Complete')], default=0)),
                ('how_recognizable', models.IntegerField(blank=True, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(10)])),
                ('how_valuable', models.IntegerField(blank=True, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(10)])),
                ('actionable', models.BooleanField()),
                ('actionable_content', models.TextField(blank=True)),
                ('recipient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='received_feedback', to=settings.AUTH_USER_MODEL)),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sent_feedback', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AlterField(
            model_name='rating',
            name='description',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='rating',
            name='name',
            field=models.CharField(max_length=255),
        ),
    ]
