#import <React/RCTLinkingManager.h> // #SETTING #DEEP_LINKING #IAMPORT iOS 실시간 계좌이체 결제 시 앱 리다이렉트를 위해 필요
// #import <RNFBDynamicLinksAppDelegateInterceptor.h>

#import <RNAppsFlyer.h> // AppsFlyer Deep linking, Open URI-scheme for iOS 9 이상
#import <Firebase.h>
#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <AdSupport/AdSupport.h>
#import <React/RCTAppSetupUtils.h>
#import <AppsFlyerLib/AppsFlyerLib.h>
#import <UserNotifications/UserNotifications.h>
#import <AppTrackingTransparency/AppTrackingTransparency.h>

#if RCT_NEW_ARCH_ENABLED
#import <React/CoreModulesPlugins.h>
#import <React/RCTCxxBridgeDelegate.h>
#import <React/RCTFabricSurfaceHostingProxyRootView.h>
#import <React/RCTSurfacePresenter.h>
#import <React/RCTSurfacePresenterBridgeAdapter.h>
#import <ReactCommon/RCTTurboModuleManager.h>

#import <react/config/ReactNativeConfig.h>
#import <RNKakaoLogins.h>
#import <NaverThirdPartyLogin/NaverThirdPartyLoginConnection.h>
#import <FirebaseMessaging.h> // Firebase Messaging 추가
#import <CodePush/CodePush.h> // CodePush 추가

static NSString *const kRNConcurrentRoot = @"concurrentRoot";
@interface AppDelegate () <RCTCxxBridgeDelegate, RCTTurboModuleManagerDelegate> {
  RCTTurboModuleManager *_turboModuleManager;
  RCTSurfacePresenterBridgeAdapter *_bridgeAdapter;
  std::shared_ptr<const facebook::react::ReactNativeConfig> _reactNativeConfig;
  facebook::react::ContextContainer::Shared _contextContainer;
}
@end
#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{/** APPSFLYER INIT **/
  [AppsFlyerLib shared].appsFlyerDevKey = @"testtest";
  [AppsFlyerLib shared].appleAppID = @"testtest";
  /* Uncomment the following line to see AppsFlyer debug logs */
  [AppsFlyerLib shared].isDebug = true;
  [[AppsFlyerLib shared] waitForATTUserAuthorizationWithTimeoutInterval:60];
  [AppsFlyerLib shared].customerUserID = @"testtest";


  [FIRApp configure];
  RCTAppSetupPrepareApp(application);

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];

#if RCT_NEW_ARCH_ENABLED
  _contextContainer = std::make_shared<facebook::react::ContextContainer const>();
  _reactNativeConfig = std::make_shared<facebook::react::EmptyReactNativeConfig const>();
  _contextContainer->insert("ReactNativeConfig", _reactNativeConfig);
  _bridgeAdapter = [[RCTSurfacePresenterBridgeAdapter alloc] initWithBridge:bridge contextContainer:_contextContainer];
  bridge.surfacePresenter = _bridgeAdapter.surfacePresenter;
#endif

  NSDictionary *initProps = [self prepareInitialProps];
  UIView *rootView = RCTAppSetupDefaultRootView(bridge, @"PoppinProject", initProps);

  if (@available(iOS 13.0, *)) {
    rootView.backgroundColor = [UIColor systemBackgroundColor];
  } else {
    rootView.backgroundColor = [UIColor whiteColor];
  }

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];


  return YES;
}

- (void)didBecomeActiveNotification {
    // start is usually called here:
     [[AppsFlyerLib shared] start];
    if (@available(iOS 14, *)) {
      [ATTrackingManager requestTrackingAuthorizationWithCompletionHandler:^(ATTrackingManagerAuthorizationStatus status) {
        NSLog(@"Status: %lu", (unsigned long)status);
      }];
    }
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
    // Your custom logic of retrieving CUID
    NSString *customUserId = [[NSUserDefaults standardUserDefaults] stringForKey:@"customerUserId"];
    if (customUserId != nil && ![customUserId  isEqual: @""]) {
        // Set CUID in AppsFlyer SDK for this session
        [AppsFlyerLib shared].customerUserID = customUserId;
        // Start
        [[AppsFlyerLib shared] start];
    }
}

//appsFly conversion
-(void)onConversionDataSuccess:(NSDictionary*) installData {
    // Business logic for Non-organic install scenario is invoked
    id status = [installData objectForKey:@"af_status"];
    if([status isEqualToString:@"Non-organic"]) {
        id sourceID = [installData objectForKey:@"media_source"];
        id campaign = [installData objectForKey:@"campaign"];
        NSLog(@"This is a Non-organic install. Media source: %@  Campaign: %@",sourceID,campaign);
    }

    else if([status isEqualToString:@"Organic"]) {
        // Business logic for Organic install scenario is invoked
        NSLog(@"This is an Organic install.");
    }
}

//appsFly conversion
-(void)onConversionDataFail:(NSError *) error {
    NSLog(@"%@",error);
}

/// This method controls whether the `concurrentRoot`feature of React18 is turned on or off.
///
/// @see: https://reactjs.org/blog/2022/03/29/react-v18.html
/// @note: This requires to be rendering on Fabric (i.e. on the New Architecture).
/// @return: `true` if the `concurrentRoot` feture is enabled. Otherwise, it returns `false`.
- (BOOL)concurrentRootEnabled
{
  // Switch this bool to turn on and off the concurrent root
  return true;
}

- (NSDictionary *)prepareInitialProps
{
  NSMutableDictionary *initProps = [NSMutableDictionary new];

#ifdef RCT_NEW_ARCH_ENABLED
  initProps[kRNConcurrentRoot] = @([self concurrentRootEnabled]);
#endif

  return initProps;
}


// - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
//   [FIRApp configure]; // Firebase 초기화
//   self.moduleName = @"PoppinProject";
//   // You can add your custom initial props in the dictionary below.
//   // They will be passed down to the ViewController used by React Native.
//   self.initialProps = @{};
//
//   UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
//   center.delegate = self;
//
//   // 푸시 알림 권한 요청
//   UNAuthorizationOptions authOptions = UNAuthorizationOptionAlert | UNAuthorizationOptionSound | UNAuthorizationOptionBadge;
//   [center requestAuthorizationWithOptions:authOptions completionHandler:^(BOOL granted, NSError * _Nullable error) {
//     // Handle error if needed
//   }];
//
//   [application registerForRemoteNotifications];
//
//   // Firebase 초기화 완료 후 토큰 가져오기
//   [[FIRMessaging messaging] tokenWithCompletion:^(NSString *token, NSError *error) {
//     if (error != nil) {
//       NSLog(@"Error fetching FCM registration token: %@", error);
//     } else {
//       NSLog(@"FCM registration token: %@", token);
//       // 필요한 경우 서버에 토큰을 저장하거나 추가 작업을 수행합니다.
//     }
//   }];
//
//   return YES;
// }

- (void)messaging:(FIRMessaging *)messaging didReceiveRegistrationToken:(NSString *)fcmToken {
  NSLog(@"FCM 토큰: %@", fcmToken);
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler {
  completionHandler(UNNotificationPresentationOptionSound | UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionBadge);
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

#if RCT_NEW_ARCH_ENABLED

#pragma mark - RCTCxxBridgeDelegate

- (std::unique_ptr<facebook::react::JSExecutorFactory>)jsExecutorFactoryForBridge:(RCTBridge *)bridge
{
  _turboModuleManager = [[RCTTurboModuleManager alloc] initWithBridge:bridge
                                                             delegate:self
                                                            jsInvoker:bridge.jsCallInvoker];
  return RCTAppSetupDefaultJsExecutorFactory(bridge, _turboModuleManager);
}

#pragma mark RCTTurboModuleManagerDelegate

- (Class)getModuleClassFromName:(const char *)name
{
  return RCTCoreModulesClassProvider(name);
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
                                                      jsInvoker:(std::shared_ptr<facebook::react::CallInvoker>)jsInvoker
{
  return nullptr;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
                                                     initParams:
                                                         (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return nullptr;
}

- (id<RCTTurboModule>)getModuleInstanceFromClass:(Class)moduleClass
{
  return RCTAppSetupDefaultModuleFromClass(moduleClass);
}

// - (NSURL *)getBundleURL {
// #if DEBUG
//   return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
// #else
//   return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
// #endif
// }

- (BOOL)application:(UIApplication *)application
 openURL:(NSURL *)url
 options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)
 options {
  // Naver 로그인 처리
  if ([url.scheme isEqualToString:@"navertest"]) {
    return [[NaverThirdPartyLoginConnection getSharedInstance] application:application openURL:url options:options];
  }

  // Kakao 로그인 처리
  if ([RNKakaoLogins isKakaoTalkLoginUrl:url]) {
    return [RNKakaoLogins handleOpenUrl:url];
  }

  // React Native LinkingManager 처리
  return [RCTLinkingManager application:application openURL:url options:options];
}

- (BOOL)application:(UIApplication *)application
   openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation
{
  // AppsFlyer 딥 링크 처리
  [[AppsFlyerLib shared] handleOpenUrl:url sourceApplication:sourceApplication annotation:annotation];

  // 기존의 다른 딥 링크 처리
  return [RCTLinkingManager application:application openURL:url sourceApplication:sourceApplication annotation:annotation];
}


- (BOOL)application:(UIApplication *)application
 continueUserActivity:(NSUserActivity *)userActivity
  restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler
{
  // AppsFlyer 딥 링크 처리
  [[AppsFlyerAttribution shared] continueUserActivity:userActivity restorationHandler:restorationHandler];

  // 기존의 다른 Universal Links 처리
  return [RCTLinkingManager application:application continueUserActivity:userActivity restorationHandler:restorationHandler];
}

#endif

@end
