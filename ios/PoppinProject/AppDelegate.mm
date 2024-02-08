#import "AppDelegate.h"
#import "RNSplashScreen.h"
#import <React/RCTBundleURLProvider.h>
#import <RNKakaoLogins.h>
#import <NaverThirdPartyLogin/NaverThirdPartyLoginConnection.h>
#import <UserNotifications/UserNotifications.h> // Firebase 추가🚨
#import <RNCPushNotificationIOS.h> // Firebase 추가🚨
#import <Firebase.h> // Firebase 추가🚨

@implementation AppDelegate
// Required for the register event.
 - (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
 {
  [RNCPushNotificationIOS didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
 }
 // Required for the notification event. You must call the completion handler after handling the remote notification.
 - (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
 fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
 {
   [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
 }
 // Required for the registrationError event.
 - (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
 {
  [RNCPushNotificationIOS didFailToRegisterForRemoteNotificationsWithError:error];
 }
 // Required for localNotification event
 - (void)userNotificationCenter:(UNUserNotificationCenter *)center
 didReceiveNotificationResponse:(UNNotificationResponse *)response
          withCompletionHandler:(void (^)(void))completionHandler
 {
   [RNCPushNotificationIOS didReceiveNotificationResponse:response];
 }
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure]; // Firebase 추가🚨
  self.moduleName = @"PoppinProject";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
   self.initialProps = @{};

    [super application:application didFinishLaunchingWithOptions:launchOptions];
    [RNSplashScreen show];  // RN RNSplashScreen 할때 추가
      // Define UNUserNotificationCenter // Firebase 추가🚨
      UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
      center.delegate = self;

      return YES; // 수정
 }

 //Called when a notification is delivered to a foreground app.
  -(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:
  (UNNotification *)notification withCompletionHandler:(void (^)
  (UNNotificationPresentationOptions options))completionHandler
  {
    completionHandler(UNNotificationPresentationOptionSound |
  UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionBadge);
  }

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self getBundleURL];
}

- (NSURL *)getBundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
  // Naver 로그인 처리
  if ([url.scheme isEqualToString:@"navertest"]) {
    return [[NaverThirdPartyLoginConnection getSharedInstance] application:app openURL:url options:options];
  }

  // Kakao 로그인 처리
  if ([RNKakaoLogins isKakaoTalkLoginUrl:url]) {
    return [RNKakaoLogins handleOpenUrl:url];
  }

  return NO;
}

@end
