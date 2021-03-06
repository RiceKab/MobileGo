/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["assets/css/mobilego.css","33c2db77ddcae0e75195809b922a132b"],["assets/js/game.js","2b58d81a835ba8e4f90a6b09b7a3f9fc"],["assets/js/index.js","a81b941529bc79ef3c53207a47f8bdd1"],["assets/lib/jq/jquery-2.1.4.js","107fbe9555bfc88ec5cab524c790fe34"],["assets/lib/jq/jquery-2.1.4.min.js","f9c7afd05729f10f55b689f36bb20172"],["assets/lib/jq/jquery-2.2.4.js","30907cfce66ebfcca66785ed6fad9fa5"],["assets/lib/jq/jquery-2.2.4.min.js","710458dd559c957714ac4a8e95357eb5"],["assets/lib/jqmobile/images/ajax-loader.gif","8fd7e719b06cd3f701c791adb62bd7a6"],["assets/lib/jqmobile/images/icons-png/action-black.png","9a19edc87343cefa0ea5fbfc38c45b92"],["assets/lib/jqmobile/images/icons-png/action-white.png","13d2742979c0abdff486ffc0c2765efb"],["assets/lib/jqmobile/images/icons-png/alert-black.png","09364128a6be0cc59f1fc6e9fade366f"],["assets/lib/jqmobile/images/icons-png/alert-white.png","86373cf5fcb815be2adc0c06a87eb6f1"],["assets/lib/jqmobile/images/icons-png/arrow-d-black.png","f85e79a0dcf3d65491e6bb99b40c0fda"],["assets/lib/jqmobile/images/icons-png/arrow-d-l-black.png","27790e799f740daee527b1ca3c9971f9"],["assets/lib/jqmobile/images/icons-png/arrow-d-l-white.png","14b3bcde3ed10d0be18d5fcc90fe8ce0"],["assets/lib/jqmobile/images/icons-png/arrow-d-r-black.png","5bad1e7e859eb120f4d136af29084460"],["assets/lib/jqmobile/images/icons-png/arrow-d-r-white.png","fec8ef05dd2b57134a284515eb5ecabf"],["assets/lib/jqmobile/images/icons-png/arrow-d-white.png","a7ed65414584a456e4608c2bc3d85065"],["assets/lib/jqmobile/images/icons-png/arrow-l-black.png","ee7f9b8e2abb96a61fe8d4cf11ca7697"],["assets/lib/jqmobile/images/icons-png/arrow-l-white.png","434675e67d80715862db88c75a7df577"],["assets/lib/jqmobile/images/icons-png/arrow-r-black.png","d96c7bba4b98ec14e62790584b139a61"],["assets/lib/jqmobile/images/icons-png/arrow-r-white.png","34350abeb7bd36e979c0aa4d6e038d2d"],["assets/lib/jqmobile/images/icons-png/arrow-u-black.png","5e086bd389bca6a7793a8741a6c6fad3"],["assets/lib/jqmobile/images/icons-png/arrow-u-l-black.png","9891529976aef3fa1c23308dbbbe0485"],["assets/lib/jqmobile/images/icons-png/arrow-u-l-white.png","eb17742486f621a31bfb1aaabdc30d5c"],["assets/lib/jqmobile/images/icons-png/arrow-u-r-black.png","25267137bba768f6f2b595398c6a2b92"],["assets/lib/jqmobile/images/icons-png/arrow-u-r-white.png","ce2d1de04f61355443949d6061f4ea37"],["assets/lib/jqmobile/images/icons-png/arrow-u-white.png","9f6cd65e48648b4823e236b0da1e54b0"],["assets/lib/jqmobile/images/icons-png/audio-black.png","d3cfac47faf40513c646c1f16b087e88"],["assets/lib/jqmobile/images/icons-png/audio-white.png","7c90c384a65cbfef572bbdd02b9d8edb"],["assets/lib/jqmobile/images/icons-png/back-black.png","0759505d2298fdee60b52b5126dfcfc6"],["assets/lib/jqmobile/images/icons-png/back-white.png","e78ad3c61a492b120a7ba0a789d4b2e0"],["assets/lib/jqmobile/images/icons-png/bars-black.png","d638db196907b36c3e0bfefb8a698cc8"],["assets/lib/jqmobile/images/icons-png/bars-white.png","f4d15b9a0fdcf961fe8d749703b20f20"],["assets/lib/jqmobile/images/icons-png/bullets-black.png","63e8e96e2deb4d60b69a68d6d9765df8"],["assets/lib/jqmobile/images/icons-png/bullets-white.png","b74986306e8ee76bd1f2a4293d56c3c4"],["assets/lib/jqmobile/images/icons-png/calendar-black.png","9116cef9549b26ddc4d9e96bec5dfd41"],["assets/lib/jqmobile/images/icons-png/calendar-white.png","215a42df136361f8b54b056a0ca6ae15"],["assets/lib/jqmobile/images/icons-png/camera-black.png","434dcb1c736b2da8247a1e59372bc64b"],["assets/lib/jqmobile/images/icons-png/camera-white.png","054a64f6a2886570ed734a26a804a66a"],["assets/lib/jqmobile/images/icons-png/carat-d-black.png","9708c21592cabb6f7fe4272e6daa7853"],["assets/lib/jqmobile/images/icons-png/carat-d-white.png","52f8e9ceafe00b0360bce803f5236a0c"],["assets/lib/jqmobile/images/icons-png/carat-l-black.png","01df9e30c853da8996684cd08c3a7917"],["assets/lib/jqmobile/images/icons-png/carat-l-white.png","32a1036e056d5a5831f6e8d40d4d1faf"],["assets/lib/jqmobile/images/icons-png/carat-r-black.png","01945aeb9182966e0e02cd0cd2f74abd"],["assets/lib/jqmobile/images/icons-png/carat-r-white.png","41c4ab4735f66dd007c2689a87695863"],["assets/lib/jqmobile/images/icons-png/carat-u-black.png","76904bfc235fd12caacfc2858f8e1eef"],["assets/lib/jqmobile/images/icons-png/carat-u-white.png","3bde6d2e6ab2936a25b69767de4ac7c3"],["assets/lib/jqmobile/images/icons-png/check-black.png","358363d39df6c2d2e0afbad366b14231"],["assets/lib/jqmobile/images/icons-png/check-white.png","0bc57ed512131d2e4b507055552f7277"],["assets/lib/jqmobile/images/icons-png/clock-black.png","c92ab62b3c0ca2ca1ae11bcc940c20a6"],["assets/lib/jqmobile/images/icons-png/clock-white.png","44cffb967f09ddf5fb8d13380745f273"],["assets/lib/jqmobile/images/icons-png/cloud-black.png","c0c7bf5a98f76f252d14f1af232a0ee1"],["assets/lib/jqmobile/images/icons-png/cloud-white.png","c71b429d726c0b8c94fc6dd33f885574"],["assets/lib/jqmobile/images/icons-png/comment-black.png","81a45d4b2b64e4321667542b75eb6754"],["assets/lib/jqmobile/images/icons-png/comment-white.png","0917e96ac998c0d191d7b81d880927a9"],["assets/lib/jqmobile/images/icons-png/delete-black.png","fb456b3f7f0b805ac7be21d97b443f9a"],["assets/lib/jqmobile/images/icons-png/delete-white.png","478fa064c1e2234032e7a3de1884f4ed"],["assets/lib/jqmobile/images/icons-png/edit-black.png","3bed8f0eeea77c23adcce4870c391286"],["assets/lib/jqmobile/images/icons-png/edit-white.png","a41a9a4e6b71ae9829dd8fa24e695be9"],["assets/lib/jqmobile/images/icons-png/eye-black.png","03ce5e4016e1f8ab8d7b02a72d45e600"],["assets/lib/jqmobile/images/icons-png/eye-white.png","0bf7b7e9cb0aee2da885a86629744cf2"],["assets/lib/jqmobile/images/icons-png/forbidden-black.png","fcf54d3cda520f292d34592d4ae6d9ae"],["assets/lib/jqmobile/images/icons-png/forbidden-white.png","d124846cb27f0a6e07764e114895e335"],["assets/lib/jqmobile/images/icons-png/forward-black.png","54bf8c0856e1a1b2b18fbf8161d8dadf"],["assets/lib/jqmobile/images/icons-png/forward-white.png","486c47d6f12f7872c04a16a28f7ae6c3"],["assets/lib/jqmobile/images/icons-png/gear-black.png","957fed4d5d46498e93cb74af8384f4b2"],["assets/lib/jqmobile/images/icons-png/gear-white.png","592af245bec551ffa61392b9e363c8ee"],["assets/lib/jqmobile/images/icons-png/grid-black.png","536fe23332253922017d3145f06258a6"],["assets/lib/jqmobile/images/icons-png/grid-white.png","ab90c7666595f04b9374518ece4fd0e2"],["assets/lib/jqmobile/images/icons-png/heart-black.png","7e2aaea1b42b5d462a7d098d5814433a"],["assets/lib/jqmobile/images/icons-png/heart-white.png","86b007f62248a968255c50b3d5c0e696"],["assets/lib/jqmobile/images/icons-png/home-black.png","3ef58401159dce7cdb4ca66bd1e1c475"],["assets/lib/jqmobile/images/icons-png/home-white.png","1c80eb5b00855d8494116db68af3242c"],["assets/lib/jqmobile/images/icons-png/info-black.png","ecc9460bc8b0a3de72a6638c8fc39d36"],["assets/lib/jqmobile/images/icons-png/info-white.png","a776b029342f4ef75889d2b9853a0e59"],["assets/lib/jqmobile/images/icons-png/location-black.png","173cf9e0989ea6f0bb6254a1fc0334ab"],["assets/lib/jqmobile/images/icons-png/location-white.png","359f3b2435bb7ea11c9b62f46d712b2f"],["assets/lib/jqmobile/images/icons-png/lock-black.png","28a57a211fa4c6a69055a91cd3e2b688"],["assets/lib/jqmobile/images/icons-png/lock-white.png","827adbd30b32a8089a39bd5a40d956ca"],["assets/lib/jqmobile/images/icons-png/mail-black.png","13106c83b8c7a9e78e5d0fbcf275f027"],["assets/lib/jqmobile/images/icons-png/mail-white.png","006089860dcf971fe6f65ec3ad289e3a"],["assets/lib/jqmobile/images/icons-png/minus-black.png","92cc19063926bda68541c1c6213e0637"],["assets/lib/jqmobile/images/icons-png/minus-white.png","9e2ff829356531c31e954eb48d69b1c5"],["assets/lib/jqmobile/images/icons-png/navigation-black.png","f36cc2c09123d935278e9fdbe1722769"],["assets/lib/jqmobile/images/icons-png/navigation-white.png","59bdad3cbad70b98a5580f59f4b0f89d"],["assets/lib/jqmobile/images/icons-png/phone-black.png","c78bd6ae6d2074f201518d5e504120d9"],["assets/lib/jqmobile/images/icons-png/phone-white.png","3f351a2cf1b17acf767294695eb9a825"],["assets/lib/jqmobile/images/icons-png/plus-black.png","96410e386e61459b3bf045ae72449b72"],["assets/lib/jqmobile/images/icons-png/plus-white.png","d8256afa69d9ed42bdbeb1232acddc0e"],["assets/lib/jqmobile/images/icons-png/power-black.png","d9a9cd79c18b61953483b15e78b7b6b6"],["assets/lib/jqmobile/images/icons-png/power-white.png","4e785618f27780944e6d8a13fee251b0"],["assets/lib/jqmobile/images/icons-png/recycle-black.png","04ae75ab4410ec64093da3b298fef31e"],["assets/lib/jqmobile/images/icons-png/recycle-white.png","8a46b6ed030cee2db774928b81d1e6e3"],["assets/lib/jqmobile/images/icons-png/refresh-black.png","1da2deb97177b5676c80be327ddc82e3"],["assets/lib/jqmobile/images/icons-png/refresh-white.png","705e7dd6e46b24381e9d123be4721787"],["assets/lib/jqmobile/images/icons-png/search-black.png","8fdc32864a50e0359972f7caaa6a4fac"],["assets/lib/jqmobile/images/icons-png/search-white.png","615d54abf8ffe2159c6418996e73b86f"],["assets/lib/jqmobile/images/icons-png/shop-black.png","34776eb5710390641a48b2ef933b42d8"],["assets/lib/jqmobile/images/icons-png/shop-white.png","bed77b8b0aa66b98bb2c53d5ace2d736"],["assets/lib/jqmobile/images/icons-png/star-black.png","741986dbcdfb3f8e4b86a58a5de62b4e"],["assets/lib/jqmobile/images/icons-png/star-white.png","f62c7807aed9d236a22b8672290f845d"],["assets/lib/jqmobile/images/icons-png/tag-black.png","d5fc58dc0ecabd4e37cb41e2a8c6f871"],["assets/lib/jqmobile/images/icons-png/tag-white.png","63d500360386f0352234ea160a235650"],["assets/lib/jqmobile/images/icons-png/user-black.png","72109232660715674c269a748b6d3b94"],["assets/lib/jqmobile/images/icons-png/user-white.png","291b0ebdb48850f539026ccd24ade8ff"],["assets/lib/jqmobile/images/icons-png/video-black.png","3e9650ab48d52565ff42b9f67e1ea617"],["assets/lib/jqmobile/images/icons-png/video-white.png","d180c9f44b809cd008ea4c32a4450bd2"],["assets/lib/jqmobile/images/icons-svg/action-black.svg","5a5688bbe6ba36f89b24559e0719cdad"],["assets/lib/jqmobile/images/icons-svg/action-white.svg","36e686b7aa8973fe6e0ea90d73e8dc78"],["assets/lib/jqmobile/images/icons-svg/alert-black.svg","9e57696de39d738b3b313c132a0d097b"],["assets/lib/jqmobile/images/icons-svg/alert-white.svg","6e6ad65d69115277fddcedd632b2903b"],["assets/lib/jqmobile/images/icons-svg/arrow-d-black.svg","bd3a7e7281094d02cbd4c821a1cfaa98"],["assets/lib/jqmobile/images/icons-svg/arrow-d-l-black.svg","489a6d5275c62bec64714e6bbb692260"],["assets/lib/jqmobile/images/icons-svg/arrow-d-l-white.svg","531ce18f32188c832ea2fe618ee97f44"],["assets/lib/jqmobile/images/icons-svg/arrow-d-r-black.svg","be3c35837bbf33039c721f33f3a2d535"],["assets/lib/jqmobile/images/icons-svg/arrow-d-r-white.svg","5da7d680be5c2310c83252216317bc42"],["assets/lib/jqmobile/images/icons-svg/arrow-d-white.svg","c1bb0a62c6ef6738c82ea2af3f2d2d43"],["assets/lib/jqmobile/images/icons-svg/arrow-l-black.svg","4dda46c8994ac2cb46923cb88e7761b4"],["assets/lib/jqmobile/images/icons-svg/arrow-l-white.svg","7c9ef3ceadd34eef82f83abbc5177c60"],["assets/lib/jqmobile/images/icons-svg/arrow-r-black.svg","e19416db24b3d91a7faaee67dc0de844"],["assets/lib/jqmobile/images/icons-svg/arrow-r-white.svg","b691d6aac82ac4bfea3ef6bdd8140084"],["assets/lib/jqmobile/images/icons-svg/arrow-u-black.svg","cde641c307ba6fd715d56badce174b32"],["assets/lib/jqmobile/images/icons-svg/arrow-u-l-black.svg","7cbe947e73a04870fc3c4533abff6e32"],["assets/lib/jqmobile/images/icons-svg/arrow-u-l-white.svg","c7d25395f88a5a2b5d342008fd658fe1"],["assets/lib/jqmobile/images/icons-svg/arrow-u-r-black.svg","44a7c831bbf14254eb276c63cf4a47e1"],["assets/lib/jqmobile/images/icons-svg/arrow-u-r-white.svg","e1f6d74564b95b1d4656b98f0d5ee7b3"],["assets/lib/jqmobile/images/icons-svg/arrow-u-white.svg","f8850666d1f3bb8f355940c00f681f3d"],["assets/lib/jqmobile/images/icons-svg/audio-black.svg","10349b9967c6eee2e56700c3cefbec92"],["assets/lib/jqmobile/images/icons-svg/audio-white.svg","cd6a30e244e6de8aa702d1eaa58d347b"],["assets/lib/jqmobile/images/icons-svg/back-black.svg","d26076db1c2e9f39f9bd4ed703a49338"],["assets/lib/jqmobile/images/icons-svg/back-white.svg","a511d3c2c036d32b5adc6c1c34621f76"],["assets/lib/jqmobile/images/icons-svg/bars-black.svg","67ef750a8580a8bc189d01b9b259aa6e"],["assets/lib/jqmobile/images/icons-svg/bars-white.svg","473ebd28e68e9d51bdf13c9f320023d6"],["assets/lib/jqmobile/images/icons-svg/bullets-black.svg","4b6f15107c38d22650d729f333afcab9"],["assets/lib/jqmobile/images/icons-svg/bullets-white.svg","c64fc0a3cba4472bf6447d10b1c36c17"],["assets/lib/jqmobile/images/icons-svg/calendar-black.svg","e10cd3224aa172c45e5db083758ee1fd"],["assets/lib/jqmobile/images/icons-svg/calendar-white.svg","aa51c37e13cf18fd7106bbe42138615a"],["assets/lib/jqmobile/images/icons-svg/camera-black.svg","031f0af0d15c4190c3bc98d94069cef2"],["assets/lib/jqmobile/images/icons-svg/camera-white.svg","53a904ba4db3c6b6ebf175333f0bb2d0"],["assets/lib/jqmobile/images/icons-svg/carat-d-black.svg","f0e6dceb400ac38a532305d9251448c8"],["assets/lib/jqmobile/images/icons-svg/carat-d-white.svg","88020f21585a91ff6579920497f0db3b"],["assets/lib/jqmobile/images/icons-svg/carat-l-black.svg","77483156d0c3a9885c14b70011fd9df9"],["assets/lib/jqmobile/images/icons-svg/carat-l-white.svg","bd336f30fba15c1cb1cf6118b6da1c40"],["assets/lib/jqmobile/images/icons-svg/carat-r-black.svg","6d32af198fe4b781a83d1d102cfe312a"],["assets/lib/jqmobile/images/icons-svg/carat-r-white.svg","d4aac883ce778c61a00b0ca4e72ba9fd"],["assets/lib/jqmobile/images/icons-svg/carat-u-black.svg","ed521f7e6b8f30c5a771f590dd21e329"],["assets/lib/jqmobile/images/icons-svg/carat-u-white.svg","c1fac294218756f17f3b456675e506b1"],["assets/lib/jqmobile/images/icons-svg/check-black.svg","33aabffe67c177449aa785fe26edbe8c"],["assets/lib/jqmobile/images/icons-svg/check-white.svg","eb0f33b9566777076acf99efaacd2cd4"],["assets/lib/jqmobile/images/icons-svg/clock-black.svg","44f685a09bab46873149b1c885b49363"],["assets/lib/jqmobile/images/icons-svg/clock-white.svg","ed7753ddd50657b05a9d1d166885cc8f"],["assets/lib/jqmobile/images/icons-svg/cloud-black.svg","b1c1ee9a1bce6268a8258e7a68bb36fd"],["assets/lib/jqmobile/images/icons-svg/cloud-white.svg","0a8047eb12acc2e9ee464024cb6b9634"],["assets/lib/jqmobile/images/icons-svg/comment-black.svg","daa4774350779cb2bf17f7b7638e8e4b"],["assets/lib/jqmobile/images/icons-svg/comment-white.svg","1675e6d75dca516be6dd89a2dc68830f"],["assets/lib/jqmobile/images/icons-svg/delete-black.svg","1b1b9b6449b8e6be282e6e473c5b7d15"],["assets/lib/jqmobile/images/icons-svg/delete-white.svg","58eadfa6074f6f14f68e3f9c4731e092"],["assets/lib/jqmobile/images/icons-svg/edit-black.svg","8f5055e0bfd413e0d3cb5e5114995a25"],["assets/lib/jqmobile/images/icons-svg/edit-white.svg","5150f21a395c354a5832548342a0adcc"],["assets/lib/jqmobile/images/icons-svg/eye-black.svg","8ebc32de5b68073f99c73feaf8c8ac9f"],["assets/lib/jqmobile/images/icons-svg/eye-white.svg","ca84f891156fa7926dc028ace21e6d28"],["assets/lib/jqmobile/images/icons-svg/forbidden-black.svg","b2b651ed6b3aa7c25ec249fd8eaabafc"],["assets/lib/jqmobile/images/icons-svg/forbidden-white.svg","1a08f42d8ae20ef475f71cca673876e5"],["assets/lib/jqmobile/images/icons-svg/forward-black.svg","97ffb49d27a2809515873da9cdf63f07"],["assets/lib/jqmobile/images/icons-svg/forward-white.svg","e4975564fcae0478bfa76a84ec8ec63a"],["assets/lib/jqmobile/images/icons-svg/gear-black.svg","d8eed40a928f2c2e1f99badcc7b9198f"],["assets/lib/jqmobile/images/icons-svg/gear-white.svg","47ed786d97524951706ca57b36df12f3"],["assets/lib/jqmobile/images/icons-svg/grid-black.svg","0263f7a5c0334c9255442a7b3773cd2b"],["assets/lib/jqmobile/images/icons-svg/grid-white.svg","4ccf7d3dab0992cbbf28f0f94b525e13"],["assets/lib/jqmobile/images/icons-svg/heart-black.svg","12bd7fd11832ca8a2e26749995798553"],["assets/lib/jqmobile/images/icons-svg/heart-white.svg","fe8399ab4fd7825af7f2c4d27cba3cef"],["assets/lib/jqmobile/images/icons-svg/home-black.svg","167ea8d5d5662ed6ab93f2ca5376d497"],["assets/lib/jqmobile/images/icons-svg/home-white.svg","d6efd100390f45e1c690b2f26a9a0c1e"],["assets/lib/jqmobile/images/icons-svg/info-black.svg","b3691adf47661e2d57dbe29560d7754e"],["assets/lib/jqmobile/images/icons-svg/info-white.svg","2479403aa870d5f67567016ab26edafe"],["assets/lib/jqmobile/images/icons-svg/location-black.svg","364bbb9c9eff8ec06daa10faa84b8076"],["assets/lib/jqmobile/images/icons-svg/location-white.svg","743d42ab8ee766cbac8e9a6e3da3e80b"],["assets/lib/jqmobile/images/icons-svg/lock-black.svg","ff37f8d54c5be816d00c616bbbecf0a5"],["assets/lib/jqmobile/images/icons-svg/lock-white.svg","4e986044a119cd97869e30d06b4623cd"],["assets/lib/jqmobile/images/icons-svg/mail-black.svg","49dc22acedd2f7ecfb7c5825957de3e8"],["assets/lib/jqmobile/images/icons-svg/mail-white.svg","39088d9fc83f7aaae6192ea18db5c8eb"],["assets/lib/jqmobile/images/icons-svg/minus-black.svg","7131336fc8358c8e69e184d040878877"],["assets/lib/jqmobile/images/icons-svg/minus-white.svg","d72e72677a3d062070c3a9cfb072deb3"],["assets/lib/jqmobile/images/icons-svg/navigation-black.svg","32a94f007f73239203f3aac6fb748410"],["assets/lib/jqmobile/images/icons-svg/navigation-white.svg","8a4a1565deecb77f3709d5640bcaad44"],["assets/lib/jqmobile/images/icons-svg/phone-black.svg","979733d91adda0c37f8cec9b1c62cca9"],["assets/lib/jqmobile/images/icons-svg/phone-white.svg","29c06a4a2a55dc0491e31c2e73dfa284"],["assets/lib/jqmobile/images/icons-svg/plus-black.svg","c9d630cc4a49e99be2b92309a801a5b4"],["assets/lib/jqmobile/images/icons-svg/plus-white.svg","a19f4fda04c3a4e8f9e5243cbcd593e6"],["assets/lib/jqmobile/images/icons-svg/power-black.svg","06e0751f569ac6a7787dbb5b622f4654"],["assets/lib/jqmobile/images/icons-svg/power-white.svg","6c238705f0aa9196e00a93c47bdf9d4e"],["assets/lib/jqmobile/images/icons-svg/recycle-black.svg","3ec3107b0816b9e502d50af709b78d78"],["assets/lib/jqmobile/images/icons-svg/recycle-white.svg","591c1ca6e21caac5a0c0443735266dbd"],["assets/lib/jqmobile/images/icons-svg/refresh-black.svg","56d392544e3e616a6f3488e9dc0a8c0d"],["assets/lib/jqmobile/images/icons-svg/refresh-white.svg","6106fcfa8136fdfc4c338ef1c9e856c5"],["assets/lib/jqmobile/images/icons-svg/search-black.svg","cda31811a85dcdcb19d3a68274f9fd35"],["assets/lib/jqmobile/images/icons-svg/search-white.svg","993a53fd8e6031ebdce45b1269f40fce"],["assets/lib/jqmobile/images/icons-svg/shop-black.svg","69dc14f3bf256e6f9d1757eeb9c5aeff"],["assets/lib/jqmobile/images/icons-svg/shop-white.svg","7a465f4e573290e3b870cb7a12e85350"],["assets/lib/jqmobile/images/icons-svg/star-black.svg","202a54052acad53b9bd5eabadc321ad6"],["assets/lib/jqmobile/images/icons-svg/star-white.svg","35efc780ced495291d8aeeef8a4aad02"],["assets/lib/jqmobile/images/icons-svg/tag-black.svg","f872a36a9b98f08dcb23985d0e7c38af"],["assets/lib/jqmobile/images/icons-svg/tag-white.svg","cba09bc19aea0b4e88ee916ce4e2618f"],["assets/lib/jqmobile/images/icons-svg/user-black.svg","a251af29c94a6a54ca7faa52b5e7f72a"],["assets/lib/jqmobile/images/icons-svg/user-white.svg","f6a37c1fb4d7ac7ba1395fa676c06e35"],["assets/lib/jqmobile/images/icons-svg/video-black.svg","b3f2cbdfec1d67529ad6358522323707"],["assets/lib/jqmobile/images/icons-svg/video-white.svg","3b522754d2366cfb287aaee120a34401"],["assets/lib/jqmobile/jquery.mobile-1.4.5.css","ee60512bcfea7f5f7bb643135b9ae8bf"],["assets/lib/jqmobile/jquery.mobile-1.4.5.js","575579e04486e282c3e0d3af34ebd620"],["assets/lib/jqmobile/jquery.mobile-1.4.5.min.css","7401b5fc1a5d5553c5942d2c068b5876"],["assets/lib/jqmobile/jquery.mobile-1.4.5.min.js","3fa0a5aceb477d5ae30e1bedb8fa3a45"],["assets/lib/jqmobile/jquery.mobile-1.4.5.min.map","23968af605a5881dbb08d87ae1276b52"],["assets/lib/jqmobile/jquery.mobile.external-png-1.4.5.css","79f3c4236b534afd619c12ec8157966f"],["assets/lib/jqmobile/jquery.mobile.external-png-1.4.5.min.css","405eafe2a024326c7888a173d9a71bfd"],["assets/lib/jqmobile/jquery.mobile.icons-1.4.5.css","adfef264c294547415258e09dc15d6fa"],["assets/lib/jqmobile/jquery.mobile.icons-1.4.5.min.css","8e307815950cb722aaeb412b582880af"],["assets/lib/jqmobile/jquery.mobile.inline-png-1.4.5.css","90bbdd3957b379a261a2bc52d13db914"],["assets/lib/jqmobile/jquery.mobile.inline-png-1.4.5.min.css","23c9216d8cf7d331dc640b6ea4b1cd64"],["assets/lib/jqmobile/jquery.mobile.inline-svg-1.4.5.css","32208aa35fa08e575e0171c887c40c6c"],["assets/lib/jqmobile/jquery.mobile.inline-svg-1.4.5.min.css","6f73c1cec8748501fc5c7854d213dba2"],["assets/lib/jqmobile/jquery.mobile.structure-1.4.5.css","97725910a1c296aa8a11443526221b2c"],["assets/lib/jqmobile/jquery.mobile.structure-1.4.5.min.css","56de21d671cf32d024a3b98c6fdb03bc"],["assets/lib/jqmobile/jquery.mobile.theme-1.4.5.css","18e9a36b275c710b6c1744ab1d54b527"],["assets/lib/jqmobile/jquery.mobile.theme-1.4.5.min.css","1def8b6c92023b97251d943b28c7090d"],["assets/lib/localforage.js","e00cd5cbe85dc0d82e56dc8dbe38a650"],["assets/lib/localforage.min.js","89a5527eb47ec2da5006b355010c4690"],["assets/lib/socket.io.js","b72b90d6087db2c4d9a2a5810c93108b"],["assets/lib/sw-toolbox.js","9dfff5d444d8984ea7c106b9f78f8884"],["assets/lib/sw-toolbox.js.map","ddac38b51c28fdc819adb2495eb6a3ff"],["assets/lib/wgo/black_128.png","20953580616dfa46e6f6a0d105ec0c78"],["assets/lib/wgo/black_64.png","ec49f0c10e79235b2645d03a096d6456"],["assets/lib/wgo/stones/black00_128.png","ac2dfd6d7fa56b5aa1c5410503a4d38b"],["assets/lib/wgo/stones/black01_128.png","8d2d6917aaeded6a86f708a9f692e5f4"],["assets/lib/wgo/stones/black02_128.png","fe23b954a710a35e66d52b06ef54a05b"],["assets/lib/wgo/stones/black03_128.png","23f12ad8420fdfe2306a5441829ae8fd"],["assets/lib/wgo/stones/white00_128.png","f6a0c76e40a1986e71336ba9419fafd9"],["assets/lib/wgo/stones/white01_128.png","41f8a5893365c2362c0b604a72dbf90a"],["assets/lib/wgo/stones/white02_128.png","de41c7f07fc62f48736be65e70317939"],["assets/lib/wgo/stones/white03_128.png","bc53c8c3cde2c35acd164e0c307a6d5a"],["assets/lib/wgo/stones/white04_128.png","7086d373c5e1530ee9f4b1708136636b"],["assets/lib/wgo/stones/white05_128.png","3510b4a99e048c1514445fb94fac3210"],["assets/lib/wgo/stones/white06_128.png","7278b46ade9058bc22604951f1a9f7e5"],["assets/lib/wgo/stones/white07_128.png","fe8ffce8fe113bb816859f156e20f709"],["assets/lib/wgo/stones/white08_128.png","67092dc8622c45fd615b22972defe27f"],["assets/lib/wgo/stones/white09_128.png","cf9e9c422c017b79651142380048bc32"],["assets/lib/wgo/stones/white10_128.png","95c0a15801576359ea8548b5fd8683f7"],["assets/lib/wgo/wgo.js","db874a9c48eb365c3e3f4c65f4d912b4"],["assets/lib/wgo/wgo.min.js","b7ccdaec1403c5b1bbe29f97b3e44915"],["assets/lib/wgo/wgo.player.css","9e85284bda718212ae565e58132ad68e"],["assets/lib/wgo/white_128.png","286cc94c10e91155fbc0c73c690fda8a"],["assets/lib/wgo/white_64.png","522ea1c34c1579b4debe9a5a53c00930"],["assets/lib/wgo/wood1.jpg","f90d6585ad6a75dc2ea6dccb2329f95a"],["assets/lib/wgo/wood_1024.jpg","c49f31b7c6dfa723ec9577467495c01d"],["assets/lib/wgo/wood_512.jpg","ca3c96a9560e8da28e2835bc59c940f0"],["assets/res/icons/apple-touch-icon.png","0cd4b1dcf0e30ae81de9fb4f95184a45"],["assets/res/icons/favicon-16x16.png","5309f25f980cd033fe5c5c288626ed90"],["assets/res/icons/favicon-32x32.png","67aa63f4bf52a870d0a3ec4c47c2d2bc"],["assets/res/icons/icon-128x128.png","861af32eb6929fe1e38f8e26cf5eb98b"],["assets/res/icons/icon-144x144.png","93a1cfc6a3d8e537ebee260bab0ff37e"],["assets/res/icons/icon-152x152.png","af2dca564b05e5b612def00990f86454"],["assets/res/icons/icon-192x192.png","d800229dbd4ad647e8c095e05e78237b"],["assets/res/icons/icon-384x384.png","0eddf5a31c257d1711e72021c33dc536"],["assets/res/icons/icon-512x512.png","466936a2454b2c3c978a8ebba70fd9f1"],["assets/res/icons/icon-72x72.png","f7be3e20068035f6f4db401df43bb784"],["assets/res/icons/icon-96x96.png","dfe4a41a887d471220ea5d846b1cb273"],["assets/res/icons/learn.png","2451d029c30fe0ac97c32a46378899a0"],["assets/res/icons/learn.svg","96f027b0b13dd9ac55fa8615aebc77f5"],["assets/res/icons/mstile-150x150.png","54add3c6d06a75b99ab185c87d64d125"],["assets/res/icons/safari-pinned-tab.svg","c5ff87e656f1813b0185023067355c2a"],["browserconfig.xml","b6f77a6a81bd95b398b2506a47acfdcf"],["favicon.ico","2469d4e961bacb891a49f79a6512bbac"],["manifest.json","7d59097a3d7b4fb352fecae9cda7ca2b"],["mobilego-sw.js","0dfcc2aa199e61368880fa36e95a753a"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







