from rest_framework import routers

# This way of import views, does not feel good.
from feedbag.feedback import views as feedback_views
from feedbag.role import views as role_views
from feedbag.user import views as user_views


router = routers.DefaultRouter()
router.register(r'users', user_views.UserViewSet)
router.register(r'extrauserinfos', user_views.ExtraUserInfoViewSet)
router.register(r'extrauserinfocategories',
                user_views.ExtraUserInfoCategoryViewSet)
router.register(r'extrauserinfocategories',
                user_views.ExtraUserInfoCategoryViewSet)

router.register(r'ratings', feedback_views.RatingViewSet)
router.register(r'remarks', feedback_views.RemarkViewSet)
router.register(r'feedbacks', feedback_views.FeedbackViewSet)
router.register(r'questions', feedback_views.QuestionViewSet)

router.register(r'roles', role_views.RoleViewSet)
