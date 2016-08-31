from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils.translation import ugettext as _

from feedbag.base.models import FeedBagBaseModel
from feedbag.user.models import User


class Rating(FeedBagBaseModel):
    """
    A Rating is used to to add a ‘feeling’ to a Remark. Like Sad, happy, could
    be better or "I have no idea what to say about this". It can be accompanied
    by an image, which is normally a emoji to confer the feeling.
    """
    name = models.CharField(
        max_length=255,
    )
    # TODO: FEED-29: Add pillow, so that we can use ImageFields
    # image = models.ImageField(
    #     _('image'),
    #     blank=True,
    # )
    description = models.TextField(
        blank=True,
    )

    def __str__(self):
        return self.name


class Remark(FeedBagBaseModel):
    """
    A Feedback is not complete without one or more Remarks.

    A Feedback can link to a rating to confer an emotion.
    """
    rating = models.ManyToManyField(
        'Rating',
        blank=True,
    )
    content = models.TextField(_('content'))

    def __str__(self):
        return '{}: {}'.format(self.rating, self.content)


class FeedbackBase(FeedBagBaseModel):
    INCOMPLETE, COMPLETE = range(2)

    STATUS_CHOICES = (
        (INCOMPLETE, _('Incomplete')),
        (COMPLETE, _('Complete')),
    )

    date = models.DateTimeField()
    recipient = models.ForeignKey(
        User,
        related_name='received_feedback',
    )
    sender = models.ForeignKey(
        User,
        related_name='sent_feedback',
    )
    status = models.IntegerField(
        default=INCOMPLETE,
        choices=STATUS_CHOICES,
    )
    how_recognizable = models.IntegerField(
        blank=True,
        validators=[
            MinValueValidator(0),
            MaxValueValidator(10),
        ]
    )
    how_valuable = models.IntegerField(
        blank=True,
        validators=[
            MinValueValidator(0),
            MaxValueValidator(10),
        ]
    )
    actionable = models.BooleanField()
    actionable_content = models.TextField(blank=True)


