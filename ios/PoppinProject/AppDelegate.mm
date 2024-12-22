//#import <React/RCTLinkingManager.h> // #SETTING #DEEP_LINKING #IAMPORT iOS 실시간 계좌이체 결제 시 앱 리다이렉트를 위해 필요
#import <RNCKakaoUser/RNCKakaoUserUtil.h> // 새로운 @react-native-kakao/user에 필요
// #import <RNFBDynamicLinksAppDelegateInterceptor.h>

#import <NaverThirdPartyLogin/NaverThirdPartyLoginConnection.h> // 네이버 로그인

//#import <RNAppsFlyer.h> // AppsFlyer Deep linking, Open URI-scheme for iOS 9 이상
#import <Firebase.h>
#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <AdSupport/AdSupport.h>
//#import <AppsFlyerLib/AppsFlyerLib.h>
//#import <AppTrackingTransparency/AppTrackingTransparency.h>
#import <UserNotifications/UserNotifications.h>



@implementation AppDelegate
// Start the AppsFlyer SDK
//- (void)sendLaunch:(UIApplication *)application {
//   [[AppsFlyerLib shared] start];
//}


// #SETTING #DEEP_LINKING #IAMPORT iOS 실시간 계좌이체 결제 시 앱 리다이렉트를 위해 필요
//- (BOOL)application:(UIApplication *)application
//   openURL:(NSURL *)url
//   options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
//{
//  // 카카오톡에서 전달된 URL scheme면 이 앱에서 핸들링하는 로직입니다.
//  if([RNCKakaoUserUtil isKakaoTalkLoginUrl:url]) {
//    return [RNCKakaoUserUtil handleOpenUrl:url];
//  }
//
//  // AppsFlyer 딥 링크 처리
//  [[AppsFlyerAttribution shared] handleOpenUrl:url options:options];
//
//   // #SETTING
//   return [RCTLinkingManager application:application openURL:url options:options] || [super application:application openURL:url options:options];
//}

// Open URI-scheme for iOS 8 and below
//- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString*)sourceApplication annotation:(id)annotation {
//  [[AppsFlyerAttribution shared] handleOpenUrl:url sourceApplication:sourceApplication annotation:annotation];
//  return YES;
//}
// Open Universal Links
//- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray * _Nullable)) restorationHandler {
//    [[AppsFlyerAttribution shared] continueUserActivity:userActivity restorationHandler:restorationHandler];
//
//
//    return YES;
//}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
    return [[NaverThirdPartyLoginConnection getSharedInstance] application:application openURL:url options:options];
}


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
/** APPSFLYER INIT **/
//  [AppsFlyerLib shared].appsFlyerDevKey = @"testtest";
//  [AppsFlyerLib shared].appleAppID = @"testtest";
//  /* Uncomment the following line to see AppsFlyer debug logs */
//  [AppsFlyerLib shared].isDebug = true;
//  [[AppsFlyerLib shared] waitForATTUserAuthorizationWithTimeoutInterval:60];
//  [AppsFlyerLib shared].customerUserID = @"testtest";

     [FIRApp configure];

     self.moduleName = @"PoppinProject";
      // You can add your custom initial props in the dictionary below.
      // They will be passed down to the ViewController used by React Native.
      self.initialProps = @{};

//       // Start AppsFlyer
//       [[AppsFlyerLib shared] start];

      // Request Tracking Authorization (iOS 14 and above)
//      if (@available(iOS 14, *)) {
//          [ATTrackingManager requestTrackingAuthorizationWithCompletionHandler:^(ATTrackingManagerAuthorizationStatus status) {
//              NSLog(@"Status: %lu", (unsigned long)status);
//          }];
//      }

      return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

//// AppsFlyer conversion
//- (void)applicationDidBecomeActive:(UIApplication *)application {
//    // Your custom logic of retrieving CUID
//    NSString *customUserId = [[NSUserDefaults standardUserDefaults] stringForKey:@"customerUserId"];
//    if (customUserId != nil && ![customUserId isEqualToString:@""]) {
//        // Set CUID in AppsFlyer SDK for this session
//        [AppsFlyerLib shared].customerUserID = customUserId;
//        // Start
//        [[AppsFlyerLib shared] start];
//    }
//}
//
////appsFly conversion
//-(void)onConversionDataSuccess:(NSDictionary*) installData {
//    // Business logic for Non-organic install scenario is invoked
//    id status = [installData objectForKey:@"af_status"];
//    if([status isEqualToString:@"Non-organic"]) {
//        id sourceID = [installData objectForKey:@"media_source"];
//        id campaign = [installData objectForKey:@"campaign"];
//        NSLog(@"This is a Non-organic install. Media source: %@  Campaign: %@",sourceID,campaign);
//    }
//
//    else if([status isEqualToString:@"Organic"]) {
//        // Business logic for Organic install scenario is invoked
//        NSLog(@"This is an Organic install.");
//    }
//}

//// AppsFlyer conversion
//- (void)onConversionDataFail:(NSError *)error {
//    NSLog(@"%@", error);
//}


// - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
// {
//   /** APPSFLYER INIT **/
//   [AppsFlyerLib shared].appsFlyerDevKey = @"trYFVCQL4CSnwYeifCJNxa";
//   [AppsFlyerLib shared].appleAppID = @"1640390682";
//   /* Uncomment the following line to see AppsFlyer debug logs */
//   [AppsFlyerLib shared].isDebug = true;
//   [[AppsFlyerLib shared] waitForATTUserAuthorizationWithTimeoutInterval:60];
//   [AppsFlyerLib shared].customerUserID = @"my user id";
//
//   [FIRApp configure];
//
//   self.moduleName = @"PoppinProject";
//   // You can add your custom initial props in the dictionary below.
//   // They will be passed down to the ViewController used by React Native.
//   self.initialProps = @{};
//
//     //appsFly conversion
//     - (void)didBecomeActiveNotification {
//         // start is usually called here:
//          [[AppsFlyerLib shared] start];
//         if (@available(iOS 14, *)) {
//           [ATTrackingManager requestTrackingAuthorizationWithCompletionHandler:^(ATTrackingManagerAuthorizationStatus status) {
//             NSLog(@"Status: %lu", (unsigned long)status);
//           }];
//         }
//     }
//
//     //appsFly conversion
//     - (void)applicationDidBecomeActive:(UIApplication *)application {
//         // Your custom logic of retrieving CUID
//         NSString *customUserId = [[NSUserDefaults standardUserDefaults] stringForKey:@"customerUserId"];
//         if (customUserId != nil && ![customUserId  isEqual: @""]) {
//             // Set CUID in AppsFlyer SDK for this session
//             [AppsFlyerLib shared].customerUserID = customUserId;
//             // Start
//             [[AppsFlyerLib shared] start];
//         }
//     }
//
//     //appsFly conversion
//     -(void)onConversionDataSuccess:(NSDictionary*) installData {
//         // Business logic for Non-organic install scenario is invoked
//         id status = [installData objectForKey:@"af_status"];
//         if([status isEqualToString:@"Non-organic"]) {
//             id sourceID = [installData objectForKey:@"media_source"];
//             id campaign = [installData objectForKey:@"campaign"];
//             NSLog(@"This is a Non-organic install. Media source: %@  Campaign: %@",sourceID,campaign);
//         }
//
//         else if([status isEqualToString:@"Organic"]) {
//             // Business logic for Organic install scenario is invoked
//             NSLog(@"This is an Organic install.");
//         }
//     }
//
//     //appsFly conversion
//     -(void)onConversionDataFail:(NSError *) error {
//         NSLog(@"%@",error);
//     }
//
// return [super application:application didFinishLaunchingWithOptions:launchOptions];
// }

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}



// - (BOOL)application:(UIApplication *)app
//- (BOOL)application:(UIApplication *)application
// continueUserActivity:(NSUserActivity *)userActivity
//   restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler
//{
//  // AppsFlyer 딥 링크 처리
//  [[AppsFlyerAttribution shared] continueUserActivity:userActivity restorationHandler:restorationHandler];
//
//  // 기존의 다른 Universal Links 처리
//  return [RCTLinkingManager application:application continueUserActivity:userActivity restorationHandler:restorationHandler];
//}
//      openURL:(NSURL *)url
//      options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
//  if([RNKakaoLogins isKakaoTalkLoginUrl:url]) {
//     return [RNKakaoLogins handleOpenUrl: url];
//  }
//  return NO;
// }

// - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
// {
//   [RNFBDynamicLinksAppDelegateInterceptor sharedInstance]; // Firebase deeplink
//   [FIRApp configure];
//   ...
// }




// ...

// - (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
//   sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
// {
//   return [RCTLinkingManager application:application openURL:url
//                       sourceApplication:sourceApplication annotation:annotation];
// }

// // iOS 버전 9 이하의 경우
// - (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity
//  restorationHandler:(void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
// {
//   return [RCTLinkingManager
//             application:application
//             continueUserActivity:userActivity
//             restorationHandler:restorationHandler
//          ];
// }

// /*
//   Target > Signing&Capabilities 에서
//   Assicoated Domains을 등록했을 경우 (Universal Link)
// */
// - (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity
//  restorationHandler:(void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
// {
//   return [RCTLinkingManager
//             application:application
//             continueUserActivity:userActivity
//             restorationHandler:restorationHandler
//          ];
// }

@end
